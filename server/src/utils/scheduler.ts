import cron from 'node-cron';
import { linkService } from '../services';
import Logger from './logger';

/**
 * Scheduled tasks for link management
 */

// Clean up expired links every day at midnight
export const scheduleExpiredLinkCleanup = () => {
    cron.schedule('0 0 * * *', async () => {
        try {
            Logger.info('Starting expired link cleanup task');
            const result = await linkService.cleanupExpiredLinks();
            Logger.info(`Cleaned up ${result.count} expired links`);
        } catch (error) {
            Logger.error('Error during expired link cleanup', error);
        }
    });
};

// Send expiration warnings 3 days before links expire
export const scheduleExpirationWarnings = () => {
    cron.schedule('0 9 * * *', async () => {
        try {
            Logger.info('Checking for links expiring soon');
            // Implementation for sending warnings would go here
            // This could send emails to users about links expiring in 3 days
            Logger.info('Expiration warnings processed');
        } catch (error) {
            Logger.error('Error during expiration warning task', error);
        }
    });
};

// Weekly summary of link status
export const scheduleLinkSummary = () => {
    cron.schedule('0 9 * * 1', async () => {
        try {
            Logger.info('Generating weekly link summary');
            // Implementation for weekly summaries would go here
            Logger.info('Weekly link summary generated');
        } catch (error) {
            Logger.error('Error during weekly summary task', error);
        }
    });
};

// Clean up links that have reached their click limit
export const scheduleClickLimitCleanup = () => {
    cron.schedule('0 1 * * *', async () => {
        try {
            Logger.info('Starting click limit cleanup task');
            const result = await linkService.cleanupClickLimitReachedLinks();
            Logger.info(`Deactivated ${result.count} links that reached click limit`);
        } catch (error) {
            Logger.error('Error during click limit cleanup', error);
        }
    });
};

// Initialize all scheduled tasks
export const initializeScheduledTasks = () => {
    Logger.info('Initializing scheduled tasks');
    scheduleExpiredLinkCleanup();
    scheduleExpirationWarnings();
    scheduleLinkSummary();
    scheduleClickLimitCleanup();
    Logger.info('All scheduled tasks initialized');
};
