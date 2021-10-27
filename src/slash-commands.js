import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { GetWhitelistPikaBotCommands } from "./database/firebase/pika-bot-commands/pika-bot-commands.js";

// Get PikaBotCommands from Firebase database
const commands = await GetWhitelistPikaBotCommands();

const rest = new REST({ version: "9" }).setToken(process.env.AUTH_TOKEN);

const guildIds = [
  process.env.GUILD_ID_RSF_FLOBBIES,
  process.env.GUILD_ID_KNOCK_KNOCK,
];

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    // Guild Commands - instant update for development purpose
    for (const guildId of guildIds) {
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
        {
          body: commands,
        }
      );
    }

    // Global Guild Commands - cached for one hour
    // await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
    //   body: commands,
    // });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
