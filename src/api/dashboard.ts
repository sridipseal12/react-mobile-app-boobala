import apiClient from './client';

export interface DashboardStats {
    totalPatients: number;
    totalDoctors: number;
    totalAppointments: number;
    todayAppointments: number;
}

export interface Appointment {
    appointmentId: number;
    patientName: string;
    doctorName: string;
    appointmentDateTime: string;
    status: string;
    reason: string;
}

export interface Patient {
    patientId: number;
    name: string;
    phone: string;
    age: number;
    gender: string;
    address: string;
}

export interface Doctor {
    doctorId: number;
    name: string;
    specialization: string;
    phone: string;
    isAvailable: boolean;
}

export const dashboardService = {
    /**
     * Get dashboard statistics
     */
    async getStats(): Promise<DashboardStats> {
        const response = await apiClient.get<DashboardStats>('/dashboard/stats');
        return response.data;
    },

    /**
     * Get all appointments
     */
    async getAppointments(): Promise<Appointment[]> {
        const response = await apiClient.get<Appointment[]>('/appointments');
        return response.data;
    },

    /**
     * Get all patients
     */
    async getPatients(): Promise<Patient[]> {
        const response = await apiClient.get<Patient[]>('/patients');
        return response.data;
    },

    /**
     * Get all doctors
     */
    async getDoctors(): Promise<Doctor[]> {
        const response = await apiClient.get<Doctor[]>('/doctors');
        return response.data;
    },
};

export default dashboardService;
