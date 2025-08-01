export interface RedirectResult {
    success: boolean;
    message: string;
    error?: string;
    redirectUrl?: string;
    requiresPassword?: boolean;
}

export interface LinkInfoResult {
    success: boolean;
    message?: string;
    error?: string;
    data?: linkInfoData;
}

export interface linkInfoData {
    id: string;
    url: string;
    slug: string;
    title: string;
    description?: string;
    createdAt: Date;
    shortUrl: string;
    qrCode?: string;
    clickCount: number;
    isExpired?: boolean;
    isClickLimitReached?: boolean;
    isAccessible?: boolean;
    remainingClicks?: number | null;
    daysUntilExpiration?: number | null;
}

export interface LinkStatsResult {
    link: {
        id: string;
        url: string;
        title: string;
        slug: string;
    };
    stats: {
        totalClicks: number;
        uniqueClicks: number;
        recentClicks: RecentClickData[];
    };
}

export interface RecentClickData {
    country: string | null;
    device: string | null;
    os: string | null;
    createdAt: Date;
}

export interface LinkLookupParams {
    slug: string;
    includeInactive?: boolean;
}

export interface RedirectTrackingParams {
    linkId: string;
    userAgent?: string;
    ip: string;
    referrer?: string;
}