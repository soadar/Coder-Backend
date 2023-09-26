import winston from "winston";
const { format } = winston;
const { combine, printf, timestamp, colorize, label, json } = format;

const logger = new winston.Container();

const logLevels = {
    levels: {
        debug: 5,
        http: 4,
        info: 3,
        warning: 2,
        error: 1,
        fatal: 0,
    },
    colors: {
        debug: 'gray',
        http: 'magenta',
        info: 'blue',
        warning: 'yellow',
        error: 'black blueBG',
        fatal: 'black redBG'
    }
};

winston.addColors(logLevels.colors);

const consoleFormat = combine(
    timestamp({
        format: 'MM-DD-YYYY (HH:mm:ss)',
    }),
    colorize(),
    printf(info => `${info.timestamp} (${info.level}) : ${info.message}`)
);

const fileFormat = combine(
    timestamp({
        format: 'MM-DD-YYYY (HH:mm:ss)',
    }),
    printf(info => `${info.timestamp} (${info.level}) : ${info.message}`)
);

logger.add('dev', {
    levels: logLevels.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: consoleFormat,
        }),
        new winston.transports.File({
            filename: './src/logs/errors.log',
            level: 'debug',
            format: fileFormat,
        }),
    ]
});

logger.add('prod', {
    levels: logLevels.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: consoleFormat,
        }),
        new winston.transports.File({
            filename: './src/logs/errors.log',
            level: 'info',
            format: fileFormat,
        }),
    ]
});

if (process.env.MODE === 'prod') var log = logger.get('prod');
else var log = logger.get('dev');

log.info(process.env.MODE);

export default log;