import { Request } from 'express';

// Extend Express Request interface for authenticated requests
export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    username: string;
    email?: string;
  };
}

// User data structure for JWT payload
export interface JWTUserPayload {
  id: string;
  username: string;
  email?: string;
}

// JWT token payload structure
export interface JWTPayload {
  data: JWTUserPayload;
  iat?: number;
  exp?: number;
}

// Cookie session configuration
export interface CookieConfig {
  name: string;
  keys: string[];
  maxAge?: number;
  httpOnly?: boolean;
  secure?: boolean;
}
