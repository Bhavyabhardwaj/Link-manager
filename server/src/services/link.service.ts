import { linkValidation } from "../validation";
import prisma from "../config/db";
import { slugUtil } from "../utils";
import { BadRequestError } from "../errors";
import { QRCodeGenerator } from '../utils/qrCode';
import { LinkType } from "../generated/prisma";

export const createBioLink = async (userId: string, linkData: linkValidation.BioLinkInput) => {
    const maxOrder = await prisma.link.findFirst({
        where: { userId, type: LinkType.BIO },
        orderBy: { order: 'desc' },
        select: { order: true }
    })

    const nextOrder = (maxOrder?.order ?? 0) + 1;

    return await prisma.link.create({
        data: {
            ...linkData,
            userId,
            type: LinkType.BIO,
            order: linkData.order ?? nextOrder,
            slug: null // bio links do not use slugs
        }
    });
}

export const createShortLink = async (userId: string, linkData: linkValidation.ShortLinkInput) => {
    let slug = linkData.slug;
    if (!slug) {
        slug = await slugUtil.generateUniqueSlug();
    } else {
        const exists = await prisma.link.findFirst({ where: { slug } });
        if (exists) {
            throw new BadRequestError("Slug already exists");
        }
    }

    const shortUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/${slug}`;

    return await prisma.link.create({
        data: {
            ...linkData,
            userId,
            type: LinkType.SHORT,
            slug,
            order: null   // don't need order
        }
    })
};

export const getBioLinks = async(userId: string) => {
    return await prisma.link.findMany({
        where: {
            userId,
            type: LinkType.BIO,
            active: true
        },
        orderBy: {
            order: 'asc'
        },
        include: {
            _count: {
                select: { linkClicks: true }
            }
        }
    });
}

export const getShortLinks = async(userId: string) => {
    return await prisma.link.findMany({
        where: {
            userId,
            type: LinkType.SHORT,
            active: true
        },
        orderBy: { createdAt: 'desc'},
        include: {
            _count: {
                select: { linkClicks: true }
        }
    }});
}

// Fetches a single active link by its ID and user ID
export const getLinkById = async (linkId: string, userId: string) => {
    const link = await prisma.link.findUnique({
        where: {
            id: linkId,
            userId,
            active: true
        }
    });
    return link;
}
// Updates an active link by its ID and user ID
export const updateLink = async (linkId: string, userId: string, updateData: Partial<linkValidation.LinkUpdateInput>) => {
    const updatedLink = await prisma.link.update({
        where: {
            id: linkId,
            userId,
        },
        data: updateData
    });
    return updatedLink;
}

// Soft-deletes a link by setting its active flag to false
export const deleteLink = async (linkId: string, userId: string) => {
    const deletedLink = await prisma.link.update({
        where: {
            id: linkId,
            userId,
            active: true
        },
        data: {
            active: false
        }
    });
    return deletedLink;
}

// Reorders links for a user based on the provided order of link IDs
export const reorderLinks = async (userId: string, linkIds: string[]) => {
    const links = await prisma.link.findMany({
        where: {
            userId,
            id: {
                in: linkIds
            },
            active: true
        },
        orderBy: {
            order: 'asc'
        }
    });

    const updatedLinks = await Promise.all(links.map((link, index) => {
        return prisma.link.update({
            where: {
                id: link.id
            },
            data: {
                order: index
            }
        });
    }));

    return updatedLinks;
}

export const generateQrCode = async (linkId: string, userId: string) => {
    const link = await prisma.link.findUnique({
        where: {
            id: linkId,
            userId,
            active: true
        }
    });

    if (!link) {
        throw new BadRequestError("Link not found");
    }

    // Generate QR code URL using a library like qrcode
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(link.url)}&size=200x200`;

    // Update the link with the QR code URL
    const updatedLink = await prisma.link.update({
        where: { id: link.id },
        data: { qrCode: qrCodeUrl }
    });

    return updatedLink;
}

// Add to link creation
export const generateQRCode = async (url: string): Promise<string> => {
    const qr = require('qrcode');
    return await qr.toDataURL(url);
};

export const regenerateQRCode = async (linkId: string, options?: any) => {
    const link = await prisma.link.findUnique({ where: { id: linkId } });
    if (!link) throw new Error('Link not found');

    const shortUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/${link.slug}`;
    const qrCode = await QRCodeGenerator.generateForLink(shortUrl, options);

    return await prisma.link.update({
        where: { id: linkId },
        data: { qrCode }
    });
};