import apiClient from './client';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface UserData {
    userId: number;
    username: string;
    name: string;
    phone: string;
    role: string;
    tvamId: string;
    centreName: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    user?: UserData;
}

export const authService = {
    /**
     * Login with username and password
     */
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
        return response.data;
    },

    /**
     * Store user data in localStorage after successful login
     */
    setCurrentUser(user: UserData): void {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('userId', user.userId.toString());
    },

    /**
     * Get current logged in user from localStorage
     */
    getCurrentUser(): UserData | null {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    },

    /**
     * Get current user ID
     */
    getCurrentUserId(): number | null {
        const userId = localStorage.getItem('userId');
        return userId ? parseInt(userId, 10) : null;
    },

    /**
     * Logout - clear stored user data
     */
    logout(): void {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userId');
    },

    /**
     * Check if user is logged in
     */
    isLoggedIn(): boolean {
        return !!localStorage.getItem('currentUser');
    },

    /**
     * Send OTP to phone number
     */
    async sendOtp(phone: string): Promise<{ success: boolean; message: string }> {
        const response = await apiClient.post<{ success: boolean; message: string }>('/auth/send-otp', { phone });
        return response.data;
    },

    /**
     * Verify OTP and login
     */
    async verifyOtp(phone: string, otp: string): Promise<LoginResponse> {
        const response = await apiClient.post<LoginResponse>('/auth/verify-otp', { phone, otp });
        return response.data;
    },
};

export default authService;
