import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Storage keys
const TOKEN_KEY = 'accessToken';
const USER_KEY = 'usuario';

// Helper functions for token management
export const getToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setToken = (token: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.warn('Could not save token to localStorage', e);
  }
};

export const removeToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.warn('Could not remove token from localStorage', e);
  }
};

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setStoredUser = (user: unknown): void => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.warn('Could not save user to localStorage', e);
  }
};

export const removeStoredUser = (): void => {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    console.warn('Could not remove user from localStorage', e);
  }
};

// Clear all auth data
export const clearAuthData = (): void => {
  removeToken();
  removeStoredUser();
};

// Callback for logout action (will be set by AuthContext)
let onUnauthorized: (() => void) | null = null;

export const setOnUnauthorized = (callback: () => void): void => {
  onUnauthorized = callback;
};

// Request interceptor - add Authorization header
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const requestUrl = (error.config as any)?.url || '';
    const token = getToken();

    if (status === 401) {
      // Do not redirect on login failures or when not authenticated
      const isAuthLogin = /\/auth\/login/i.test(requestUrl);
      const hasToken = !!token;

      if (hasToken && !isAuthLogin) {
        // Token expired or invalid for authenticated requests
        clearAuthData();
        if (onUnauthorized) {
          onUnauthorized();
        } else {
          window.location.href = '/login';
        }
      }
      // For login failures or unauthenticated requests, just propagate the error
    }
    return Promise.reject(error);
  }
);

export default apiClient;
