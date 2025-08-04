import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type {
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthResponse,
  User,
} from '../types';

class AuthService {
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

    // Add response interceptor to handle auth errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response: AxiosResponse<ApiResponse<AuthResponse>> = await this.api.post(
      '/api/auth/signin',
      credentials
    );
    
    if (response.data.status === 'success' && response.data.data) {
      localStorage.setItem('authToken', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'Login failed');
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response: AxiosResponse<ApiResponse<AuthResponse>> = await this.api.post(
      '/api/auth/signup',
      userData
    );
    
    if (response.data.status === 'success' && response.data.data) {
      localStorage.setItem('authToken', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'Registration failed');
  }

  async forgotPassword(email: ForgotPasswordRequest): Promise<void> {
    const response: AxiosResponse<ApiResponse> = await this.api.post(
      '/api/auth/forgot-password',
      email
    );
    
    if (response.data.status !== 'success') {
      throw new Error(response.data.message || 'Failed to send reset email');
    }
  }

  async resetPassword(resetData: ResetPasswordRequest): Promise<void> {
    const response: AxiosResponse<ApiResponse> = await this.api.post(
      '/api/auth/reset-password',
      resetData
    );
    
    if (response.data.status !== 'success') {
      throw new Error(response.data.message || 'Failed to reset password');
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // OAuth methods
  loginWithGitHub(): void {
    window.location.href = `${this.api.defaults.baseURL}/api/oauth/github`;
  }

  loginWithGoogle(): void {
    window.location.href = `${this.api.defaults.baseURL}/api/oauth/google`;
  }
}

// Create and export a singleton instance
const authService = new AuthService(import.meta.env.VITE_API_URL || 'http://localhost:3000');
export default authService;
