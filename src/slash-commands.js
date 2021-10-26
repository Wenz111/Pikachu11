import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { GetWhitelistPikaBotCommands } from "./database/firebase/pika-bot-commands/pika-bot-commands.js";

// Get PikaBotCommands from Firebase database
const commands = await GetWhitelistPikaBotCommands();

const rest = new REST({ version: "9" }).setToken(process.env.AUTH_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
