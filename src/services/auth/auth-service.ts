import { User, AuthResponse } from '@/types/auth';

export class AuthService {
  private readonly API_URL = '/api/auth';
  private user: User | null = null;

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      this.user = data.user;
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${this.API_URL}/logout`, { method: 'POST' });
      this.user = null;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.user) {
      return this.user;
    }

    try {
      const response = await fetch(`${this.API_URL}/me`);
      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      this.user = data.user;
      return this.user;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }
}