import { UAParser } from 'ua-parser-js';
import { DeviceInfo } from '../types';

export const extractDeviceInfo = (userAgent?: string): DeviceInfo => {
    if (!userAgent || userAgent === 'unknown') {
        return {
            userAgent: userAgent || 'Unknown',
            browser: 'Unknown',
            deviceType: 'desktop',
            os: 'Unknown',
        };
    }

    try {
        const parser = new UAParser(userAgent);
        const result = parser.getResult();

        // Better device type detection
        let deviceType = 'desktop';
        if (result.device.type) {
            deviceType = result.device.type;
        } else if (result.device.vendor || result.device.model) {
            deviceType = 'mobile';
        } else if (userAgent.toLowerCase().includes('mobile')) {
            deviceType = 'mobile';
        } else if (userAgent.toLowerCase().includes('tablet')) {
            deviceType = 'tablet';
        }

        // Better browser detection
        let browser = result.browser.name || 'Unknown';
        if (browser !== 'Unknown' && result.browser.version) {
            browser = `${browser} ${result.browser.version.split('.')[0]}`;
        }

        // Better OS detection
        let os = result.os.name || 'Unknown';
        if (os !== 'Unknown' && result.os.version) {
            os = `${os} ${result.os.version}`;
        }

        return {
            userAgent,
            browser,
            deviceType,
            os,
        };
    } catch (error) {
        console.error('Error parsing user agent:', error);
        return {
            userAgent: userAgent || 'Unknown',
            browser: 'Unknown',
            deviceType: 'desktop',
            os: 'Unknown',
        };
    }
}