// Simple logger for better production practices
class Logger {
    static info(message: string, data?: any) {
        if (process.env.NODE_ENV !== 'production') {
            console.log(`[INFO] ${message}`, data || '');
        }
    }

    static error(message: string, error?: any) {
        console.error(`[ERROR] ${message}`, error || '');
    }

    static warn(message: string, data?: any) {
        console.warn(`[WARN] ${message}`, data || '');
    }
}

export default Logger;
