// API Response Types
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  error?: string;
}

// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  bio?: string;
  image?: string;
  theme?: string;
  createdAt: string;
  updatedAt: string;
}

// Link Types
export interface BioLink {
  id: string;
  title: string;
  url: string;
  description?: string;
  icon?: string;
  order: number;
  active: boolean;
  clickCount: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShortLink {
  id: string;
  title: string;
  url: string;
  slug: string;
  shortUrl: string;
  description?: string;
  active: boolean;
  clickCount: number;
  expiresAt?: string;
  clickLimit?: number;
  password?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type Link = BioLink | ShortLink;

// Link Creation Types
export interface CreateBioLinkRequest {
  title: string;
  url: string;
  description?: string;
  icon?: string;
  order?: number;
}

export interface CreateShortLinkRequest {
  title: string;
  url: string;
  description?: string;
  slug?: string;
  customSlug?: boolean;
  expiresAt?: string;
  clickLimit?: number;
  password?: string;
}

export interface UpdateLinkRequest {
  title?: string;
  url?: string;
  description?: string;
  icon?: string;
  order?: number;
  active?: boolean;
}

// Auth Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Analytics Types
export interface LinkClick {
  id: string;
  linkId: string;
  clickedAt: string;
  ipAddress?: string;
  userAgent?: string;
  country?: string;
  city?: string;
  device?: string;
  browser?: string;
  referrer?: string;
}

export interface LinkAnalytics {
  link: ShortLink | BioLink;
  stats: {
    totalClicks: number;
    uniqueClicks: number;
    recentClicks: LinkClick[];
    clicksByDate: { date: string; clicks: number }[];
    clicksByCountry: { country: string; clicks: number }[];
    clicksByDevice: { device: string; clicks: number }[];
    clicksByBrowser: { browser: string; clicks: number }[];
  };
}

export interface PublicAnalytics {
  totalClicks: number;
  uniqueClicks: number;
  recentClicks: LinkClick[];
}

// Public Profile Types
export interface PublicProfile {
  id: string;
  username: string;
  name?: string;
  bio?: string;
  image?: string;
  theme?: string;
  links: BioLink[];
}

// Link Status Types
export interface LinkStatus {
  id: string;
  active: boolean;
  expired: boolean;
  clickLimitReached: boolean;
  passwordProtected: boolean;
  expiresAt?: string;
  clickLimit?: number;
  clickCount: number;
}

// Password Verification Types
export interface VerifyPasswordRequest {
  password: string;
}

export interface VerifyPasswordResponse {
  valid: boolean;
}

// Reorder Links Types
export interface ReorderLinksRequest {
  linkIds: string[];
}

// QR Code Types
export interface QRCodeResponse {
  qrCode: string; // Base64 encoded image
}

// Link Info Types
export interface LinkInfo {
  id: string;
  title: string;
  url: string;
  slug: string;
  shortUrl: string;
  clickCount: number;
  expiresAt?: string;
  createdAt: string;
}

// Theme Types
export type Theme = 'light' | 'dark' | 'gradient' | 'minimal';

// Dashboard Stats Types
export interface DashboardStats {
  totalLinks: number;
  totalClicks: number;
  activeLinks: number;
  expiredLinks: number;
  recentActivity: LinkClick[];
}
