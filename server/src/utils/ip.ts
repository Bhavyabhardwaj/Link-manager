import axios from 'axios';
import { IpInfo } from '../types';
import { IP_INFO_TOKEN } from '../config/ipInfoConfig';

export async function getIpInfo(ipAddress: string): Promise<IpInfo> {
    try {
        // Handle localhost and private IP addresses
        if (!ipAddress || 
            ipAddress === '127.0.0.1' || 
            ipAddress === '::1' || 
            ipAddress.startsWith('192.168.') || 
            ipAddress.startsWith('10.') || 
            ipAddress.startsWith('172.') ||
            ipAddress === 'unknown') {
            
            // For development/localhost, return mock data or try to get public IP
            try {
                // Try to get public IP first
                const publicIpResponse = await axios.get('https://api.ipify.org?format=json', { timeout: 2000 });
                const publicIp = (publicIpResponse.data as { ip: string }).ip;
                
                if (IP_INFO_TOKEN) {
                    const { data } = await axios.get(
                        `https://ipinfo.io/${publicIp}/json?token=${IP_INFO_TOKEN}`,
                        { timeout: 3000 }
                    ) as { data: IpInfo };
                    
                    return {
                        ip: publicIp,
                        country: data.country ?? 'Unknown',
                        city: data.city ?? 'Unknown',
                    };
                }
            } catch (error) {
                console.log('Could not get public IP info, using localhost data');
            }
            
            // Return localhost data for development
            return { 
                ip: ipAddress, 
                country: 'Local', 
                city: 'Localhost' 
            };
        }

        // For real IP addresses
        if (!IP_INFO_TOKEN) {
            console.warn('IP_INFO_TOKEN not set, using fallback');
            // Try without token first (limited requests)
            try {
                const { data } = await axios.get(
                    `https://ipinfo.io/${ipAddress}/json`,
                    { timeout: 3000 }
                ) as { data: IpInfo };
                
                return {
                    ip: data.ip ?? ipAddress,
                    country: data.country ?? 'Unknown',
                    city: data.city ?? 'Unknown',
                };
            } catch (error) {
                // Fallback to a free service
                try {
                    const { data } = await axios.get(
                        `http://ip-api.com/json/${ipAddress}?fields=country,city,query`,
                        { timeout: 3000 }
                    );
                    
                    const locationData = data as { query?: string; country?: string; city?: string };
                    
                    return {
                        ip: locationData.query ?? ipAddress,
                        country: locationData.country ?? 'Unknown',
                        city: locationData.city ?? 'Unknown',
                    };
                } catch (fallbackError) {
                    return { ip: ipAddress, country: 'Unknown', city: 'Unknown' };
                }
            }
        }

        // Use IP_INFO_TOKEN if available
        const { data } = await axios.get(
            `https://ipinfo.io/${ipAddress}/json?token=${IP_INFO_TOKEN}`,
            { timeout: 3000 }
        ) as { data: IpInfo };
        
        return {
            ip: data.ip ?? ipAddress,
            country: data.country ?? 'Unknown',
            city: data.city ?? 'Unknown',
        };
        
    } catch (error) {
        console.error('Error getting IP info:', error);
        return { ip: ipAddress ?? 'Unknown', country: 'Unknown', city: 'Unknown' };
    }
}