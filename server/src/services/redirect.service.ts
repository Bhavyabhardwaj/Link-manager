import prisma from "../config/db";
import { deviceUtil, ipUtil } from "../utils";
import { redirectValidation } from "../validation";
import { linkClickService } from ".";
import { LinkType } from "../generated/prisma";
import {
    RedirectResult,
    LinkInfoResult,
    LinkStatsResult,
    LinkLookupParams
} from "../types";

export const findLinkBySlug = async (slug: string, params?: LinkLookupParams) => {
    return await prisma.link.findUnique({
        where: {
            slug,
            type: LinkType.SHORT, // Only short links have slugs
            active: params?.includeInactive ? undefined : true
        },
    });
};

export const processLinkRedirect = async (
    slug: string,
    userAgent: string,
    ip: string,
    referrer?: string
): Promise<RedirectResult> => {
    try {
        // Find the short link
        const link = await findLinkBySlug(slug);

        if (!link) {
            return {
                success: false,
                error: "Link not found",
                message: "The short link you're looking for doesn't exist or has been deleted."
            };
        }

        // Check if link has expired
        if (link.expiresAt && new Date() > link.expiresAt) {
            return {
                success: false,
                error: "Link expired",
                message: "This short link has expired."
            };
        }

        // Check click limit
        if (link.clickLimit && link.clickCount >= link.clickLimit) {
            return {
                success: false,
                error: "Click limit reached",
                message: "This short link has reached its click limit."
            };
        }

        // Track the click asynchronously (don't wait for it to complete)
        trackLinkClick(link.id, userAgent, ip, referrer).catch(error => {
            console.error("Failed to track click:", error);
            // Don't fail the redirect if tracking fails
        });

        return {
            success: true,
            message: "Redirecting to the original URL...",
            redirectUrl: link.url
        };

    } catch (error) {
        console.error("Error in processLinkRedirect:", error);
        return {
            success: false,
            error: "Internal server error",
            message: "Something went wrong while processing the redirect."
        };
    }
};

export const getLinkInformation = async (slug: string): Promise<LinkInfoResult> => {
    try {
        const link = await prisma.link.findUnique({
            where: {
                slug,
                type: LinkType.SHORT,
                active: true
            },
            select: {
                id: true,
                url: true,
                slug: true,
                title: true,
                description: true,
                createdAt: true,
                expiresAt: true,
                clickLimit: true,
                clickCount: true,
                _count: {
                    select: {
                        linkClicks: true,
                    }
                }
            }
        });

        if (!link) {
            return {
                success: false,
                error: "Link not found",
                message: "The short link you're looking for doesn't exist or has been deleted."
            };
        }

        return {
            success: true,
            data: {
                ...link,
                slug: link.slug!,
                shortUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/${link.slug}`,
                clickCount: link._count.linkClicks,
                description: link.description || "",
            }
        };

    } catch (error) {
        console.error("Error in getLinkInformation:", error);
        return {
            success: false,
            error: "Internal server error",
            message: "Something went wrong while retrieving link information."
        };
    }
};

export const getLinkAnalytics = async (
    slug: string,
    query?: redirectValidation.AnalyticsQueryInput
): Promise<LinkStatsResult | null> => {
    try {
        const link = await findLinkBySlug(slug);
        if (!link) return null;

        // Calculate time range based on timeframe
        const now = new Date();
        let startDate: Date;

        switch (query?.timeframe) {
            case '1h':
                startDate = new Date(now.getTime() - 60 * 60 * 1000);
                break;
            case '24h':
                startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                break;
            case '7d':
                startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case '30d':
                startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                break;
            default:
                startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        }

        const [totalClicks, uniqueClicksResult, recentClicks] = await Promise.all([
            prisma.linkClick.count({
                where: {
                    linkId: link.id,
                    createdAt: { gte: startDate }
                }
            }),
            prisma.linkClick.groupBy({
                by: ['ipAddress'],
                where: {
                    linkId: link.id,
                    createdAt: { gte: startDate }
                }
            }),
            prisma.linkClick.findMany({
                where: {
                    linkId: link.id,
                    createdAt: { gte: startDate }
                },
                orderBy: { createdAt: 'desc' },
                take: query?.limit || 10,
                skip: query?.offset || 0,
                select: {
                    country: true,
                    device: true,
                    browser: true,
                    os: true,
                    createdAt: true
                }
            })
        ]);

        const uniqueClicks = uniqueClicksResult.length;

        return {
            link: {
                id: link.id,
                title: link.title,
                url: link.url,
                slug: link.slug!
            },
            stats: {
                totalClicks,
                uniqueClicks,
                recentClicks
            }
        };

    } catch (error) {
        console.error("Error getting link analytics:", error);
        return null;
    }
};

// Private function to track clicks
const trackLinkClick = async (
    linkId: string,
    userAgent: string,
    ip: string,
    referrer?: string
): Promise<void> => {
    try {
        const [ipInfo, deviceInfo] = await Promise.all([
            ipUtil.getIpInfo(ip),
            Promise.resolve(deviceUtil.extractDeviceInfo(userAgent))
        ]);

        await linkClickService.logLinkClick({
            linkId,
            ipAddress: ip,
            userAgent,
            referrer: referrer || "",
            country: ipInfo.country || "Unknown",
            city: ipInfo.city || "Unknown",
            agent: deviceInfo.browser || "Unknown",
            device: deviceInfo.deviceType || "Unknown",
            os: deviceInfo.os || "Unknown",
            browser: deviceInfo.browser || "Unknown",
        });

        // Update click count
        await prisma.link.update({
            where: { id: linkId },
            data: { clickCount: { increment: 1 } }
        });

    } catch (error) {
        console.error("Error tracking link click:", error);
        throw error;
    }
};