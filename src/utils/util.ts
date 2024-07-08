
import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'src/logger/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'src/logger/combined.log' })
  ]
});




