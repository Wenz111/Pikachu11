import { Client } from "discord.js";
import { Logger } from "./utils/logger/logger.js";
import {
  MESSAGES_CONTENT_ESCAPE_COMMAND,
  PBC,
  HR,
  UC,
  CI,
} from "./constants/constants.js";
import { AUTH_TOKEN } from "./constants/auth-token.js";

// Initialize Discord Bot Client
const discordBot = new Client();

// On Discord Bot Startup/Ready
discordBot.on("ready", (event) => Logger(event, discordBot));

// Read incoming channel messages
discordBot.on("message", (messages) => {
  // If the author is bot return
  if (messages.author.bot) {
    return;
  }

  // Listening to messages that start with underscore `_`
  if (messages.content.substring(0, 1) === MESSAGES_CONTENT_ESCAPE_COMMAND) {
    var messagesContent = messages.content.substring(1).split(" ");

    // Log message content for development
    // console.log("Message Content:", messagesContent);

    var command = messagesContent[0];

    switch (command.toLowerCase()) {
      // PikaBot Commands
      case PBC.PIKA_BOT:
      case PBC.PIKA_BOT_S1:
        send("Hello, World!");
        break;

      case PBC.PIKA_BOT_STATUS:
      case PBC.PIKA_BOT_STATUS_S1:
        send("PikaBot status: online!");
        break;

      case PBC.GOOD_BOT:
      case PBC.GOOD_BOT_S1:
        send("Thanks! Pika Pika!");
        break;

      // Hololive Reference
      case HR.PAIN_PEKO:
        send("Pain Peko");
        break;

      case HR.PAIN_PEKO_EMOTE:
        send("<:pain_peko:832432160811909226>");
        break;

      case HR.PAIN_TAKO:
        send("Pain Tako");
        break;

      case HR.PIKACHU_DOKO:
        send("Pikachu どこ?");
        break;

      case HR.PIKACHU_INAI:
        send("Pikachu いない?");
        break;

      case HR.KYMK:
        send(
          `${messages.content
            .replace(`${MESSAGES_CONTENT_ESCAPE_COMMAND}${HR.KYMK}`, "")
            .trim()} 今日もかわいい!`
        );
        break;

      case HR.OTSU:
        send(
          `おつ${messages.content
            .replace(`${MESSAGES_CONTENT_ESCAPE_COMMAND}${HR.OTSU}`, "")
            .trim()}!`
        );
        break;

      case HR.HAACHAMA_PANIC_FULL:
        send("<:haachama_no:877447905840074762>");
        break;

      case HR.HAACHAMA_PANIC:
        send("<:haachama_panic:877450713272303637>");
        break;

      case HR.CAT_CRY_THUMBS_UP:
        send("<:catcryingwiththumbsup:795198191200501810>");
        break;

      // User Commands
      case UC.SHOW_USER:
      case UC.SHOW_USER_S1:
      case UC.SHOW_USER_S2:
        send(messages.author.username);
        break;

      case UC.SHOW_USER_ID:
      case UC.SHOW_USER_ID_S1:
      case UC.SHOW_USER_ID_S2:
        send(messages.author.id);
        break;

      case UC.SHOW_CHANNEL_ID:
      case UC.SHOW_CHANNEL_ID_S1:
      case UC.SHOW_CHANNEL_ID_S2:
        send(messages.channel.id);
        break;

      case UC.REPEAT:
        send(
          messages.content
            .replace(`${MESSAGES_CONTENT_ESCAPE_COMMAND}${UC.REPEAT}`, "")
            .trim()
        );
        break;

      case UC.REPEAT_S1:
        send(
          messages.content
            .replace(`${MESSAGES_CONTENT_ESCAPE_COMMAND}${UC.REPEAT_S1}`, "")
            .trim()
        );
        break;

      // Creator Info
      case CI.SHOW_CREATOR:
      case CI.SHOW_CREATOR_S1:
      case CI.SHOW_CREATOR_S2:
        send(
          "```Pikachu11 is a bot created by Wenz11\n~Still Work In Progress Though...```"
        );
        break;
    } // End of Case Statement
  }

  // Send message to Channel
  function send(message) {
    messages.channel.send(message);
  }
});

discordBot.login(AUTH_TOKEN);
