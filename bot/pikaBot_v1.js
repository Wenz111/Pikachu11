const Discord = require('discord.js');
var logger = require('winston');
var auth = require('../auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
const bot = new Discord.Client();
const token = auth.token;
// var bot = new Discord.Client({
//   token: auth.token,
//   autorun: true
// });
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.username + ' - (' + bot.user.id + ')');
});

// When a message is send
// function(user, userID, channelID, message, evt)
bot.on('message', messages => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (messages.author.bot) {
        return;
    }

    if (messages.content.substring(0, 1) == '!') {
        var args = messages.content.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {

            // !test
            case 'test':
                messages.channel.send('Hello, World!');
                break;

            // !goodbot
            case 'goodbot':
                botSendMessage('Thanks! Pika Pika!');
                break;

            // Calculator (Addition, Subtraction, Multiplication and Division)
            // !add2value
            case 'add2value':
                addTwoValue(messages);
                break;

            // !addUp
            case 'add':
                toAdd(messages);
                break;

            // !minus
            case 'minus':
                toMinus(messages);
                break;

            // !multiply
            case 'multiply':
                toMultiply(messages);
                break;

            // !divide
            case 'divide':
                toDivide(messages);
                break;

            // Show case
            // user, userID, channelID, message, evt
            // !showUser
            case 'showUser':
                botSendMessage(messages.author.username);
                break;

            // !showUserID
            case 'showUserID':
                botSendMessage(messages.author.id);
                break;

            // !showChannelID
            case 'showChannelID':
                botSendMessage(messages.channel.id);
                break;

            // !showMessage
            case 'showMessage':
                botSendMessage(messages.content.replace('!showMessage', '').trim());
                break;

            // !showCreator
            case 'showCreator':
                let creator = "```Pikachu11 is a bot created by Wenz11\n~Still Work In Progress Though...```";
                botSendMessage(creator);
                break;

            // !showPikaBotCommand
            case 'showPikaBotCommand':
                listofPikaBotCommand();
                break;

        } // End of Case Statement

        function botSendMessage(message) {
            messages.channel.send(message);
        }

        function addTwoValue(message) {
            var additionValue = message.content.replace('!add2value', '').trim().split(/[ ,]+/);
            var value1 = parseInt(additionValue[0]);
            var value2 = parseInt(additionValue[1]);
            var totalValue = value1 + value2;

            var value1Text = "value 1";
            var value2Text = "value 2";
            var invalidNumberTextBuilder = "";
            var invalidValueTextBuilder = "";

            // Get array length = array.length;
            // Automate addition - use for each loop etc

            if (isNaN(value1) || isNaN(value2)) {

                if (isNaN(value1)) {
                    // Get Value 1
                    invalidNumberTextBuilder = additionValue[0];

                    // Value 1 is not a number
                    invalidValueTextBuilder = value1Text;
                }

                if (isNaN(value2)) {
                    // Get Value 2
                    invalidNumberTextBuilder = additionValue[1];

                    // Value 2 is not a number
                    invalidValueTextBuilder = value2Text;
                }

                if (isNaN(value1) && isNaN(value2)) {
                    // Get Value 1 and Value 2
                    invalidNumberTextBuilder = additionValue[0] + ' and ' + additionValue[1];

                    // Value 1 and Value 2 is not a number
                    invalidValueTextBuilder = value1Text + ' and ' + value2Text;
                }

                invalidNumberTextBuilder += ' is not a number, kindly enter a valid number for '
                    + invalidValueTextBuilder + '.';

                botSendMessage(invalidNumberTextBuilder + " <@" + messages.author.id + ">" + '.');
            } else {
                botSendMessage('The addition of ' + value1 + ' and ' + value2 +
                    ' is __**' + totalValue + '**__. ' + "<@" + messages.author.id + ">" + '.');
            }
        }

        function toAdd(message) {
            let showValue = message.content.replace('!add', '').trim().split(/[ ,]+/);

            // Addition Function
            let totalSum = 0;
            let validValueStringBuilder = "";
            let invalidValueBuilder = [];
            let invalidValueStringBuilder = "";
            let count = 0;
            showValue.forEach(itemValue => {
                count++;

                // Convert itemValue to Integer
                itemValueToInt = parseInt(itemValue);
                // Calculate total sum
                totalSum += itemValueToInt;

                // Get each item value string - if it is a number
                // Build a string
                // The addition of xx, yy, zz and bb is totalSum
                if (isNaN(itemValueToInt) == false) {
                    if (showValue.length == 1) {
                        validValueStringBuilder = `${itemValueToInt}`;
                    } else {
                        if (count == showValue.length - 1) {
                            validValueStringBuilder += `${itemValueToInt} `;
                        } else if (count < showValue.length) {
                            validValueStringBuilder += `${itemValueToInt}, `;
                        } else {
                            validValueStringBuilder += `and ${itemValueToInt}`;
                        }
                    }
                }

                // Find value which is not a number
                // Ivalid value: value a and value b etc
                if (isNaN(itemValueToInt)) {
                    if (showValue.length == 1) {
                        invalidValueBuilder = itemValue;
                    } else {
                        if (count == showValue.length) {
                            invalidValueBuilder += `${itemValue} `;
                        } else {
                            invalidValueBuilder += `${itemValue}, `;
                        }
                    }
                }
            });

            if (invalidValueBuilder.length != 0) {
                let invalidValue = invalidValueBuilder.trim().split(/[ ,]+/);

                let countInvalid = 0;
                invalidValue.forEach(invalidItemValue => {
                    countInvalid++;

                    if (invalidValue.length == 1) {
                        invalidValueStringBuilder = `value ${invalidItemValue}`;
                    } else {
                        if (countInvalid == invalidValue.length - 1) {
                            invalidValueStringBuilder += `value ${invalidItemValue} `;
                        } else if (countInvalid < invalidValue.length) {
                            invalidValueStringBuilder += `value ${invalidItemValue}, `;
                        } else {
                            invalidValueStringBuilder += `and value ${invalidItemValue}`;
                        }
                    }
                });
            }

            botSendMessage(
                isNaN(totalSum) == false
                    ? `The addition of ${validValueStringBuilder} is __**${totalSum}**__. <@${messages.author.id}>.`
                    : `${invalidValueStringBuilder} is __**not a number**__, kindly enter a valid number. <@${messages.author.id}>.`);
        }

        function toMinus(message) {
            let showValue = message.content.replace('!minus', '').trim().split(/[ ,]+/);

            // Subtraction Function
            let total = 0;
            let validValueStringBuilder = "";
            let invalidValueBuilder = [];
            let invalidValueStringBuilder = "";
            let count = 0;
            showValue.forEach(itemValue => {
                count++;

                // Convert itemValue to Integer
                itemValueToInt = parseInt(itemValue);
                // Calculate total subtraction
                if (count == 1) {
                    total += itemValueToInt;
                } else {
                    total -= itemValueToInt;
                }

                // Get each item value string - if it is a number
                // Build a string
                // The addition of xx, yy, zz and bb is totalSum
                if (isNaN(itemValueToInt) == false) {
                    if (showValue.length == 1) {
                        validValueStringBuilder = `${itemValueToInt}`;
                    } else {
                        if (count == showValue.length - 1) {
                            validValueStringBuilder += `${itemValueToInt} `;
                        } else if (count < showValue.length) {
                            validValueStringBuilder += `${itemValueToInt}, `;
                        } else {
                            validValueStringBuilder += `and ${itemValueToInt}`;
                        }
                    }
                }

                // Find value which is not a number
                // Ivalid value: value a and value b etc
                if (isNaN(itemValueToInt)) {
                    if (showValue.length == 1) {
                        invalidValueBuilder = itemValue;
                    } else {
                        if (count == showValue.length) {
                            invalidValueBuilder += `${itemValue} `;
                        } else {
                            invalidValueBuilder += `${itemValue}, `;
                        }
                    }
                }
            });

            if (invalidValueBuilder.length != 0) {
                let invalidValue = invalidValueBuilder.trim().split(/[ ,]+/);

                let countInvalid = 0;
                invalidValue.forEach(invalidItemValue => {
                    countInvalid++;

                    if (invalidValue.length == 1) {
                        invalidValueStringBuilder = `value ${invalidItemValue}`;
                    } else {
                        if (countInvalid == invalidValue.length - 1) {
                            invalidValueStringBuilder += `value ${invalidItemValue} `;
                        } else if (countInvalid < invalidValue.length) {
                            invalidValueStringBuilder += `value ${invalidItemValue}, `;
                        } else {
                            invalidValueStringBuilder += `and value ${invalidItemValue}`;
                        }
                    }
                });
            }

            botSendMessage(
                isNaN(total) == false
                    ? `The subtraction of ${validValueStringBuilder} is __**${total}**__. <@${messages.author.id}>.`
                    : `${invalidValueStringBuilder} is __**not a number**__, kindly enter a valid number. <@${messages.author.id}>.`);
        }

        function toMultiply(message) {
            let showValue = message.content.replace('!multiply', '').trim().split(/[ ,]+/);

            // Multiplication Function
            let total = 0;
            let validValueStringBuilder = "";
            let invalidValueBuilder = [];
            let invalidValueStringBuilder = "";
            let count = 0;
            showValue.forEach(itemValue => {
                count++;

                // Convert itemValue to Integer
                itemValueToInt = parseInt(itemValue);
                // Calculate total multiplication
                if (count == 1) {
                    total += itemValueToInt;
                } else {
                    total *= itemValueToInt;
                }

                // Get each item value string - if it is a number
                // Build a string
                // The addition of xx, yy, zz and bb is totalSum
                if (isNaN(itemValueToInt) == false) {
                    if (showValue.length == 1) {
                        validValueStringBuilder = `${itemValueToInt}`;
                    } else {
                        if (count == showValue.length - 1) {
                            validValueStringBuilder += `${itemValueToInt} `;
                        } else if (count < showValue.length) {
                            validValueStringBuilder += `${itemValueToInt}, `;
                        } else {
                            validValueStringBuilder += `and ${itemValueToInt}`;
                        }
                    }
                }

                // Find value which is not a number
                // Ivalid value: value a and value b etc
                if (isNaN(itemValueToInt)) {
                    if (showValue.length == 1) {
                        invalidValueBuilder = itemValue;
                    } else {
                        if (count == showValue.length) {
                            invalidValueBuilder += `${itemValue} `;
                        } else {
                            invalidValueBuilder += `${itemValue}, `;
                        }
                    }
                }
            });

            if (invalidValueBuilder.length != 0) {
                let invalidValue = invalidValueBuilder.trim().split(/[ ,]+/);

                let countInvalid = 0;
                invalidValue.forEach(invalidItemValue => {
                    countInvalid++;

                    if (invalidValue.length == 1) {
                        invalidValueStringBuilder = `value ${invalidItemValue}`;
                    } else {
                        if (countInvalid == invalidValue.length - 1) {
                            invalidValueStringBuilder += `value ${invalidItemValue} `;
                        } else if (countInvalid < invalidValue.length) {
                            invalidValueStringBuilder += `value ${invalidItemValue}, `;
                        } else {
                            invalidValueStringBuilder += `and value ${invalidItemValue}`;
                        }
                    }
                });
            }

            botSendMessage(
                isNaN(total) == false
                    ? `The multiplication of ${validValueStringBuilder} is __**${total}**__. <@${messages.author.id}>.`
                    : `${invalidValueStringBuilder} is __**not a number**__, kindly enter a valid number. <@${messages.author.id}>.`);
        }

        function toDivide(message) {
            let showValue = message.content.replace('!divide', '').trim().split(/[ ,]+/);

            // Subtraction Function
            let total = 0;
            let validValueStringBuilder = "";
            let invalidValueBuilder = [];
            let invalidValueStringBuilder = "";
            let count = 0;
            showValue.forEach(itemValue => {
                count++;

                // Convert itemValue to Integer
                itemValueToInt = parseInt(itemValue);
                // Calculate total division
                if (count == 1) {
                    total += itemValueToInt;
                } else {
                    total /= itemValueToInt;
                }

                // Get each item value string - if it is a number
                // Build a string
                // The addition of xx, yy, zz and bb is totalSum
                if (isNaN(itemValueToInt) == false) {
                    if (showValue.length == 1) {
                        validValueStringBuilder = `${itemValueToInt}`;
                    } else {
                        if (count == showValue.length - 1) {
                            validValueStringBuilder += `${itemValueToInt} `;
                        } else if (count < showValue.length) {
                            validValueStringBuilder += `${itemValueToInt}, `;
                        } else {
                            validValueStringBuilder += `and ${itemValueToInt}`;
                        }
                    }
                }

                // Find value which is not a number
                // Ivalid value: value a and value b etc
                if (isNaN(itemValueToInt)) {
                    if (showValue.length == 1) {
                        invalidValueBuilder = itemValue;
                    } else {
                        if (count == showValue.length) {
                            invalidValueBuilder += `${itemValue} `;
                        } else {
                            invalidValueBuilder += `${itemValue}, `;
                        }
                    }
                }
            });

            if (invalidValueBuilder.length != 0) {
                let invalidValue = invalidValueBuilder.trim().split(/[ ,]+/);

                let countInvalid = 0;
                invalidValue.forEach(invalidItemValue => {
                    countInvalid++;

                    if (invalidValue.length == 1) {
                        invalidValueStringBuilder = `value ${invalidItemValue}`;
                    } else {
                        if (countInvalid == invalidValue.length - 1) {
                            invalidValueStringBuilder += `value ${invalidItemValue} `;
                        } else if (countInvalid < invalidValue.length) {
                            invalidValueStringBuilder += `value ${invalidItemValue}, `;
                        } else {
                            invalidValueStringBuilder += `and value ${invalidItemValue}`;
                        }
                    }
                });
            }

            botSendMessage(
                isNaN(total) == false
                    ? `The division of ${validValueStringBuilder} is __**${total}**__. <@${messages.author.id}>.`
                    : `${invalidValueStringBuilder} is __**not a number**__, kindly enter a valid number. <@${messages.author.id}>.`);
        }

        function listofPikaBotCommand() {
            let pikaCommandBuilder = "";
            // Pika Bot
            pikaCommandBuilder += "__**Below are the available command for Pika Bot**__";
            pikaCommandBuilder += "\n__**Pika Bot**__";
            pikaCommandBuilder += "\n`!test` - print `Hello, World!` \n-to check Pika Bot's online status.";
            pikaCommandBuilder += "\n\n`!goodbot` - print `Thanks! Pika Pika!` \n-to show appreciation to the Pika Bot.";

            // Pika Calculator
            pikaCommandBuilder += "\n\n__**Pika Calculator**__";
            // Addition of 2 values (add2value)
            pikaCommandBuilder += "\n`!add2value` - Add 2 integer values";
            pikaCommandBuilder += "\nUsage: `!add2value x y`, where x and y is an integer value separated by a space.";
            pikaCommandBuilder += "\nOutput: `The addition of x and y is z.`";
            // Add (add)
            pikaCommandBuilder += "\n\n`!add` - Add 2 or more integer values";
            pikaCommandBuilder += "\nUsage: `!add x y n`, where x, y and n is an integer value separated by a space, for n number of times.";
            pikaCommandBuilder += "\nOutput: `The addition of x, y and z is w.`";
            // Subtraction (minus)
            pikaCommandBuilder += "\n\n`!minus` - Subtract 2 or more integer values";
            pikaCommandBuilder += "\nUsage: `!minus x y n`, where x, y and n is an integer value separated by a space, for n number of times.";
            pikaCommandBuilder += "\nOutput: `The subtraction of x, y and z is w.`";
            // Multiplication (multiply)
            pikaCommandBuilder += "\n\n`!multiply` - Multiply 2 or more integer values";
            pikaCommandBuilder += "\nUsage: `!multiply x y n`, where x, y and n is an integer value separated by a space, for n number of times.";
            pikaCommandBuilder += "\nOutput: `The multiplication of x, y and z is w.`";
            // Division (divide)
            pikaCommandBuilder += "\n\n`!divide` - Divide 2 or more integer with or without decimal values";
            pikaCommandBuilder += "\nUsage: `!divide x y n`, where x, y and n is an integer with or without decimal value separated by a space, for n number of times.";
            pikaCommandBuilder += "\nOutput: `The division of x, y and z is w.`";

            // Pika Admin
            pikaCommandBuilder += "\n\n__**Pika Admin**__";
            // !showUser
            pikaCommandBuilder += "\n`!showUser` - print `current user's name`";
            pikaCommandBuilder += "\nUsage: `!showUser`";
            pikaCommandBuilder += "\nOutput: `current user's name`";
            // !showUserID
            pikaCommandBuilder += "\n\n`!showUserID` - print `current user's ID`";
            pikaCommandBuilder += "\nUsage: `!showUserID`";
            pikaCommandBuilder += "\nOutput: `current user's ID`";
            // !showChannelID
            pikaCommandBuilder += "\n\n`!showChannelID` - print `current channel ID`";
            pikaCommandBuilder += "\nUsage: `!showChannelID`";
            pikaCommandBuilder += "\nOutput: `current channel ID`";
            // !showMessage
            pikaCommandBuilder += "\n\n`!showMessage` - print `current sent message`, without `!showMessage`";
            pikaCommandBuilder += "\nUsage: `!showMessage This is a message.`";
            pikaCommandBuilder += "\nOutput: `This is a message.`";

            // Pika Easter Egg
            pikaCommandBuilder += "\n\n__**Pika Easter Egg**__";
            pikaCommandBuilder += "\nUsage: `!showCreator`";

            botSendMessage(pikaCommandBuilder);
        }

    }
});

bot.login(token);
