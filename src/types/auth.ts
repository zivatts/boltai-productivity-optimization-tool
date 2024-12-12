export interface User {
  id: string;
  email: string;
  name: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  syncFrequency: number;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresAt: number;
}