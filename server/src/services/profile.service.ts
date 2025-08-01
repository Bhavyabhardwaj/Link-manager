import prisma from "../config/db";
import { profileValidation } from "../validation";
import { NotFoundError } from "../errors";
import { LinkType } from "../generated/prisma";

// Get public bio page
export const getUserBioPage = async (username: string) => {
    const user = await prisma.user.findUnique({
        where: { username },
        select: {
            id: true,
            username: true,
            name: true,
            bio: true,
            image: true,
            theme: true,
            isPublic: true,
            links: {
                where: { 
                    type: LinkType.BIO, 
                    active: true 
                },
                orderBy: { order: 'asc' },
                select: {
                    id: true,
                    title: true,
                    url: true,
                    description: true,
                    icon: true,
                    order: true,
                    _count: {
                        select: { linkClicks: true }
                    }
                }
            }
        }
    });

    if (!user || !user.isPublic) {
        throw new NotFoundError("Profile not found or private");
    }

    // return user with click counts
    return {
        ...user, // spread user properties
        links: user.links.map(link => ({
            ...link,
            clickCount: link._count.linkClicks
        }))
    };
};

// Track bio link click
export const trackBioLinkClick = async (linkId: string, trackingData: any) => {
    const link = await prisma.link.findUnique({
        where: { 
            id: linkId, 
            type: LinkType.BIO,
            active: true 
        }
    });

    if (!link) {
        throw new NotFoundError("Link not found");
    }

    // Track click
    await prisma.linkClick.create({
        data: {
            linkId,
            userId: link.userId,
            ...trackingData
        }
    });

    // Update click count
    await prisma.link.update({
        where: { id: linkId },
        data: { clickCount: { increment: 1 } }
    });

    return { redirectUrl: link.url };
};