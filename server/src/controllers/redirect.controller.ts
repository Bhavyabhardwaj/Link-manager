import { NextFunction, Request, Response } from "express";
import { redirectService } from "../services";
import { redirectValidation } from "../validation";

export const redirectToOriginalUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;
        const userAgent = req.headers['user-agent'] || 'unknown';
        
        // Better IP address detection
        let ip = '';
        if (req.headers['x-forwarded-for']) {
            ip = (req.headers['x-forwarded-for'] as string).split(',')[0].trim();
        } else if (req.headers['x-real-ip']) {
            ip = req.headers['x-real-ip'] as string;
        } else if (req.connection?.remoteAddress) {
            ip = req.connection.remoteAddress;
        } else if (req.socket?.remoteAddress) {
            ip = req.socket.remoteAddress;
        } else if (req.ip) {
            ip = req.ip;
        } else {
            ip = '127.0.0.1'; // fallback for localhost
        }
        
        // Clean up IPv6 localhost
        if (ip === '::1') {
            ip = '127.0.0.1';
        }
        
        const referrer = req.headers.referer;

        // Handle empty or undefined slug
        if (!slug || slug.trim() === '') {
            res.status(404).json({
                status: "error",
                message: "Page not found",
            });
            return;
        }

        // Skip validation for common non-slug requests that browsers make
        const nonSlugPatterns = [
            'favicon.ico',
            'robots.txt',
            'sitemap.xml',
            'apple-touch-icon',
            'android-chrome',
            'manifest.json',
            'sw.js',
            'service-worker.js',
            '.well-known',
            'browserconfig.xml'
        ];

        if (nonSlugPatterns.some(pattern => slug.toLowerCase().includes(pattern))) {
            res.status(404).json({
                status: "error",
                message: "Resource not found",
            });
            return;
        }

        // Pre-validate slug format before Zod validation
        const slugPattern = /^[a-zA-Z0-9_-]+$/;
        if (!slugPattern.test(slug)) {
            res.status(404).json({
                status: "error",
                message: "Invalid link format",
            });
            return;
        }

        // Validate slug using Zod
        const { slug: validSlug } = redirectValidation.slugValidator.parse({ slug });

        // Get password from query parameter if provided
        const password = req.query.password as string;

        // Process redirect through service
        const result = await redirectService.processLinkRedirect(
            validSlug,
            userAgent,
            ip,
            referrer,
            password
        );

        if (!result.success) {
            // If password is required, return a specific response
            if (result.requiresPassword) {
                res.status(401).json({
                    status: "error",
                    message: result.message,
                    requiresPassword: true
                });
                return;
            }

            res.status(404).json({
                status: "error",
                message: result.message,
                error: result.error
            });
            return;
        }

        // Redirect to the original URL
        res.redirect(301, result.redirectUrl!);

    } catch (error) {
        console.error("Error in redirectToOriginalUrl controller:", error);
        next(error);
    }
};

export const getLinkInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;

        // Validate slug
        const { slug: validSlug } = redirectValidation.slugValidator.parse({ slug });

        // Get link information through service
        const result = await redirectService.getLinkInformation(validSlug);

        if (!result.success) {
            res.status(404).json({
                status: "error",
                message: result.message,
                error: result.error
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: "Link information retrieved successfully",
            data: result.data
        });

    } catch (error) {
        console.error("Error in getLinkInfo controller:", error);
        next(error);
    }
};

export const getLinkAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;
        const query = req.query;

        // Validate inputs
        const { slug: validSlug } = redirectValidation.slugValidator.parse({ slug });
        const validQuery = redirectValidation.analyticsQueryValidator.parse(query);

        // Get analytics through service
        const stats = await redirectService.getLinkAnalytics(validSlug, validQuery);

        if (!stats) {
            res.status(404).json({
                status: "error",
                message: "Link not found or no analytics available"
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: "Link analytics retrieved successfully",
            data: stats
        });

    } catch (error) {
        console.error("Error in getLinkAnalytics controller:", error);
        next(error);
    }
};