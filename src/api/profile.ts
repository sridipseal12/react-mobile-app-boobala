import apiClient from './client';

export interface ProfileData {
    userId: number;
    name: string;
    phone: string;
    centreName: string;
    tvamId: string;
    role: string;
}

export const profileService = {
    /**
     * Get user profile by ID
     */
    async getProfile(userId: number): Promise<ProfileData> {
        const response = await apiClient.get<ProfileData>(`/profile/${userId}`);
        return response.data;
    },
};

export default profileService;
