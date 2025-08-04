import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type {
  ApiResponse,
  PublicProfile,
  LinkInfo,
  PublicAnalytics,
} from '../types';

class PublicService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getPublicProfile(username: string): Promise<PublicProfile> {
    const response: AxiosResponse<ApiResponse<PublicProfile>> = await this.api.get(
      `/u/${username}`
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'Profile not found');
  }

  async getLinkInfo(slug: string): Promise<LinkInfo> {
    const response: AxiosResponse<ApiResponse<LinkInfo>> = await this.api.get(
      `/${slug}/info`
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'Link not found');
  }

  async getLinkAnalytics(
    slug: string,
    timeframe: '1h' | '24h' | '7d' | '30d' = '24h',
    limit: number = 10,
    offset: number = 0
  ): Promise<PublicAnalytics> {
    const params = new URLSearchParams({
      timeframe,
      limit: limit.toString(),
      offset: offset.toString(),
    });

    const response: AxiosResponse<ApiResponse<PublicAnalytics>> = await this.api.get(
      `/${slug}/analytics?${params}`
    );
    
    if (response.data.status === 'success' && response.data.data) {
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'Analytics not found');
  }

  // Helper method to redirect to short link
  redirectToLink(slug: string): void {
    window.open(`${this.api.defaults.baseURL}/${slug}`, '_blank');
  }

  // Helper method to copy link to clipboard
  async copyLinkToClipboard(slug: string): Promise<void> {
    const url = `${this.api.defaults.baseURL}/${slug}`;
    await navigator.clipboard.writeText(url);
  }
}

// Create and export a singleton instance
const publicService = new PublicService(import.meta.env.VITE_API_URL || 'http://localhost:3000');
export default publicService;
