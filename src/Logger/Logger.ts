import { transports, format, createLogger } from "winston";

export class Log {
    private static logger = createLogger({
        transports: [
            new transports.File({
                filename: 'logs.log',
                format: format.combine(format.timestamp(), format.json())
            })
        ]
    });
    public static info(message: string, metadata?: any) {
        this.logger.info(message, { data: metadata });
    }
    public static error(message: string, metadata?: any) {
        this.logger.error(message, { data: metadata });
    }
}