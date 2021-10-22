import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { PBC } from "./constants/constants.js";

const commands = [
  {
    name: PBC.PIKA_BOT_S1,
    description: "Pika Bot is Here!!!",
  },
];

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
