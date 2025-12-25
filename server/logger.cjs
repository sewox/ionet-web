const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Ensure logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Define log format - JSON for Docker compatibility
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
);

// Console format - more readable for development
const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        let msg = `${timestamp} [${level}]: ${message}`;
        if (Object.keys(meta).length > 0) {
            msg += ` ${JSON.stringify(meta)}`;
        }
        return msg;
    })
);

// Create the logger
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    transports: [
        // Error log - only errors
        new winston.transports.File({
            filename: path.join(logsDir, 'error.log'),
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5
        }),
        // Combined log - all levels
        new winston.transports.File({
            filename: path.join(logsDir, 'combined.log'),
            maxsize: 5242880, // 5MB
            maxFiles: 5
        })
    ]
});

// Add console transport in development or if explicitly enabled
if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_CONSOLE_LOGS === 'true') {
    logger.add(new winston.transports.Console({
        format: consoleFormat
    }));
}

// Helper methods for common logging patterns
logger.logRequest = (req, statusCode) => {
    logger.info('HTTP Request', {
        method: req.method,
        url: req.url,
        ip: req.ip || req.connection?.remoteAddress,
        statusCode: statusCode,
        userAgent: req.get('user-agent')
    });
};

logger.logError = (error, context = {}) => {
    logger.error(error.message, {
        stack: error.stack,
        ...context
    });
};

logger.logDbOperation = (operation, details = {}) => {
    logger.info('Database Operation', {
        operation,
        ...details
    });
};

module.exports = logger;
