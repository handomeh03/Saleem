import api from "@/config/axoisConfig";
import { useQuery } from "@tanstack/react-query";

export interface Doctor {
    id: number;
    name: string;
    email: string;
    phone: string;
    isActive: boolean;
    createdAt: string;
    role: {
        roleName: string;
    };
    doctor: {
        specialization: string;
    };
}

export interface DoctorsResponse {
    data: Doctor[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

interface UseGetDoctorsProps {
    page: number;
    searchQuery: string;
    limit?: number;
}

export function useGetDoctors({ page, searchQuery, limit = 10 }: UseGetDoctorsProps) {
    return useQuery<DoctorsResponse>({
        queryKey: ['admin-doctors', page, searchQuery],
        queryFn: async () => {
            try {
                const res = await api.get('doctor/Get-Doctors', {
                    params: {
                        page,
                        limit,
                        ...(searchQuery.trim() ? { search: searchQuery.trim() } : {}),
                    },
                }); 
                return res.data;
            } catch (err) {
                console.error("API Error Details:", err);
                throw err;
            }
        },
    });
}