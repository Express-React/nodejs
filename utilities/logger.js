const winston = require('winston');
const logDir = 'logs';
const fs = require('fs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
 }
const now = new Date();

class Logger {
  constructor(appliName) {
    this.appliName = appliName || 'nodejs';

    this.logFormat = winston.format.printf(info => {
      const formattedDate = info.timestamp.replace('T', ' ').replace('Z', '');
      const message = `${formattedDate}|${this.appliName}|${info.level}|${
        info.message
      };`;
      
      return message
    });

    this.winston = winston.createLogger({
      level: global.loglevel || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        this.logFormat
      ),
      transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
      ]
    });
  }
}

const logger = new Logger();

module.exports = logger;
