const Discord = require('discord.js');
const Logger = require('../Utils/Logger/logger.js').Logger;
const authToken = require('../auth.json').token;

// Initialize Discord Bot
const discordBot = new Discord.Client();

// On Discord Bot Startup/Ready
discordBot.on('ready', (event) => Logger(event, discordBot));

// Read incoming channel messages
discordBot.on('message', messages => {

    // If the author is bot return
    if (messages.author.bot) { return; }

    // Listening to messages that start with underscore `_`
    if (messages.content.substring(0, 1) === '_') {
        var args = messages.content.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd.toLowerCase()) {

            // PikaBot Commands
            case 'pikabot':
            case 'pb':
                send('Hello, World!');
                break;

            case 'pikabotstatus':
            case 'pbs':
                send('PikaBot status: online!');
                break;

            case 'goodbot':
            case 'gb':
                send('Thanks! Pika Pika!');
                break;

            // Hololive Reference
            case 'pp':
                send('Pain Peko');
                break;

            case 'pd':
                send('Pikachu どこ?');
                break;

            case 'pi':
                send('Pikachu いない?');
                break;

            case 'kymk':
                send(`${messages.content.replace('_kymk', '').trim()} 今日もかわいい!`);
                break;

            case 'otsu':
                send(`おつ${messages.content.replace('_otsu', '').trim()}!`);
                break;


            case 'panic':
                send(':haachama_panic:');
                break;

            // User Commands
            case 'showuser':
            case 'suser':
            case 'su':
                send(messages.author.username);
                break;

            case 'showuserid':
            case 'showuid':
            case 'suid':
                send(messages.author.id);
                break;

            case 'showchannelid':
            case 'showcid':
            case 'scid':
                send(messages.channel.id);
                break;

            case 'repeat':
                send(messages.content.replace('_repeat', '').trim());
                break;
            case 'r':
                send(messages.content.replace('_r', '').trim());
                break;

            // Creator Info
            case 'showcreator':
            case 'showc':
            case 'sc':
                send("```Pikachu11 is a bot created by Wenz11\n~Still Work In Progress Though...```");
                break;

        } // End of Case Statement
    }

    // Send message to Channel
    function send(message) {
        messages.channel.send(message);
    }
});

discordBot.login(authToken);
