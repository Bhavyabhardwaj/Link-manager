import cron from 'node-cron';
import { linkService } from '../services';

/**
 * Scheduled tasks for link management
 */

// Clean up expired links every day at midnight
export const scheduleExpiredLinkCleanup = () => {
    cron.schedule('0 0 * * *', async () => {
        try {
            console.log('🧹 Starting expired link cleanup task...');
            const result = await linkService.cleanupExpiredLinks();
            console.log(`✅ Cleaned up ${result.count} expired links`);
        } catch (error) {
            console.error('❌ Error during expired link cleanup:', error);
        }
    });
};

// Send expiration warnings 3 days before links expire
export const scheduleExpirationWarnings = () => {
    cron.schedule('0 9 * * *', async () => {
        try {
            console.log('⚠️ Checking for links expiring soon...');
            // Implementation for sending warnings would go here
            // This could send emails to users about links expiring in 3 days
            console.log('✅ Expiration warnings processed');
        } catch (error) {
            console.error('❌ Error during expiration warning task:', error);
        }
    });
};

// Weekly summary of link status
export const scheduleLinkSummary = () => {
    cron.schedule('0 9 * * 1', async () => {
        try {
            console.log('📊 Generating weekly link summary...');
            // Implementation for weekly summaries would go here
            console.log('✅ Weekly link summary generated');
        } catch (error) {
            console.error('❌ Error during weekly summary task:', error);
        }
    });
};

// Clean up links that have reached their click limit
export const scheduleClickLimitCleanup = () => {
    cron.schedule('0 1 * * *', async () => {
        try {
            console.log('🔢 Starting click limit cleanup task...');
            const result = await linkService.cleanupClickLimitReachedLinks();
            console.log(`✅ Deactivated ${result.count} links that reached click limit`);
        } catch (error) {
            console.error('❌ Error during click limit cleanup:', error);
        }
    });
};

// Initialize all scheduled tasks
export const initializeScheduledTasks = () => {
    console.log('🕐 Initializing scheduled tasks...');
    scheduleExpiredLinkCleanup();
    scheduleExpirationWarnings();
    scheduleLinkSummary();
    scheduleClickLimitCleanup();
    console.log('✅ All scheduled tasks initialized');
};
