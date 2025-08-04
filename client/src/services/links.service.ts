import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type {
  ApiResponse,
  BioLink,
  ShortLink,
  CreateBioLinkRequest,
  CreateShortLinkRequest,
  UpdateLinkRequest,
  ReorderLinksRequest,
  LinkAnalytics,
  LinkStatus,
  VerifyPasswordRequest,
  VerifyPasswordResponse,
  QRCodeResponse,
} from '../types';

class LinksService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Bio Links
  async createBioLink(linkData: CreateBioLinkRequest): Promise<BioLink> {
    const response: AxiosResponse<ApiResponse<BioLink>> = await this.api.post(
      '/api/links/bio',
      linkData
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'Failed to create bio link');
  }

  async getBioLinks(): Promise<BioLink[]> {
    const response: AxiosResponse<ApiResponse<BioLink[]>> = await this.api.get('/api/links/bio');
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'Failed to fetch bio links');
  }

  // Short Links
  async createShortLink(linkData: CreateShortLinkRequest): Promise<ShortLink> {
    const response: AxiosResponse<ApiResponse<ShortLink>> = await this.api.post(
      '/api/links/short',
      linkData
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'Failed to create short link');
  }

  async getShortLinks(): Promise<ShortLink[]> {
    const response: AxiosResponse<ApiResponse<ShortLink[]>> = await this.api.get('/api/links/short');
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'Failed to fetch short links');
  }

  // Universal Link Operations
  async updateLink(linkId: string, updateData: UpdateLinkRequest): Promise<BioLink | ShortLink> {
    const response: AxiosResponse<ApiResponse<BioLink | ShortLink>> = await this.api.put(
      `/api/links/update-link/${linkId}`,
      updateData
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'Failed to update link');
  }

  async deleteLink(linkId: string): Promise<void> {
    const response: AxiosResponse<ApiResponse> = await this.api.delete(
      `/api/links/delete-link/${linkId}`
    );
    
    if (response.data.status !== 'success') {
      throw new Error(response.data.message || 'Failed to delete link');
    }
  }

  async reorderLinks(linkIds: string[]): Promise<void> {
    const response: AxiosResponse<ApiResponse> = await this.api.patch(
      '/api/links/reorder-links',
      { linkIds }
    );
    
    if (response.data.status !== 'success') {
      throw new Error(response.data.message || 'Failed to reorder links');
    }
  }

  // Advanced Features
  async generateQRCode(linkId: string): Promise<string> {
    const response: AxiosResponse<ApiResponse<QRCodeResponse>> = await this.api.get(
      `/api/links/generate-qr-code/${linkId}`
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data.qrCode;
    }
    
    throw new Error(response.data.message || 'Failed to generate QR code');
  }

  async extendLinkExpiration(linkId: string, expiresAt: string): Promise<void> {
    const response: AxiosResponse<ApiResponse> = await this.api.put(
      `/api/links/${linkId}/extend-expiration`,
      { expiresAt }
    );
    
    if (response.data.status !== 'success') {
      throw new Error(response.data.message || 'Failed to extend link expiration');
    }
  }

  async removeLinkExpiration(linkId: string): Promise<void> {
    const response: AxiosResponse<ApiResponse> = await this.api.put(
      `/api/links/${linkId}/remove-expiration`
    );
    
    if (response.data.status !== 'success') {
      throw new Error(response.data.message || 'Failed to remove link expiration');
    }
  }

  async getLinkStatus(linkId: string): Promise<LinkStatus> {
    const response: AxiosResponse<ApiResponse<LinkStatus>> = await this.api.get(
      `/api/links/${linkId}/status`
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'Failed to get link status');
  }

  async getExpiredLinks(): Promise<(BioLink | ShortLink)[]> {
    const response: AxiosResponse<ApiResponse<(BioLink | ShortLink)[]>> = await this.api.get(
      '/api/links/expired'
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'Failed to fetch expired links');
  }

  async cleanupExpiredLinks(): Promise<void> {
    const response: AxiosResponse<ApiResponse> = await this.api.post('/api/links/cleanup-expired');
    
    if (response.data.status !== 'success') {
      throw new Error(response.data.message || 'Failed to cleanup expired links');
    }
  }

  async verifyLinkPassword(linkId: string, password: string): Promise<boolean> {
    const response: AxiosResponse<ApiResponse<VerifyPasswordResponse>> = await this.api.post(
      `/api/links/${linkId}/verify-password`,
      { password }
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data.valid;
    }
    
    throw new Error(response.data.message || 'Failed to verify password');
  }

  // Analytics
  async getLinkAnalytics(linkId: string): Promise<LinkAnalytics> {
    const response: AxiosResponse<ApiResponse<LinkAnalytics>> = await this.api.get(
      `/api/links/${linkId}/analytics`
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'Failed to fetch link analytics');
  }
}

// Create and export a singleton instance
const linksService = new LinksService(import.meta.env.VITE_API_URL || 'http://localhost:3000');
export default linksService;
