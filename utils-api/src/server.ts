import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from 'fastify';
import { createLogger, format, transports } from 'winston';
import path from 'node:path';

const logTextFormat = format.printf(
    ({ level, message, timestamp, stack }) =>
        `${timestamp} ${level}: ${stack || message} `
);

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        logTextFormat
    ),
    transports: [
        new transports.File({
            filename: path.join(process.cwd(), 'logs', 'error.log'),
            level: 'error',
            handleExceptions: true,
            handleRejections: true,
        }),
        new transports.File({
            filename: path.join(process.cwd(), 'logs', 'combined.log'),
            handleExceptions: true,
            handleRejections: true,
        }),
        new transports.Console({
            format: format.combine(format.colorize(), logTextFormat),
        }),
    ],
});

const httpServer = fastify().withTypeProvider<TypeBoxTypeProvider>();

export default { httpServer, logger };