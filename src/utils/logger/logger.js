const InitLogger = () => {
  const logger = require("winston");

  // Configure logger settings
  logger.remove(logger.transports.Console);
  logger.add(new logger.transports.Console(), { colorize: true });
  logger.level = "debug";

  return logger;
};

module.exports = {
  Logger: function Logger(event, discordBot) {
    var logger = InitLogger();
    logger.info("---Connected---");
    logger.info(`Discord Bot Username: ${discordBot.user.username}`);
    logger.info(`Discord Bot Id: ${discordBot.user.id}`);
  },
};
