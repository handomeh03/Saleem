import api from "@/config/axoisConfig";
import { useQuery } from "@tanstack/react-query";

export interface DailyAvailability {
    id: number;
    scheduleId: number;
    date: string;
    start_time: string;
    end_time: string;
    status: boolean;
}

export interface DoctorSchedule {
    id: number;
    doctorId: number;
    start_date: string;
    end_date: string;
    daily_availability: DailyAvailability[];
    doctor: {
        specialization: string;
        bio: string;
        userId: number;
        user: {
            name: string;
            email: string;
        };
    };
}

export interface SchedulesResponse {
    data: DoctorSchedule[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

interface UseGetSchedulesProps {
    page: number;
    searchQuery: string;
    limit?: number;
}

export function useGetSchedules({ page, searchQuery, limit = 5 }: UseGetSchedulesProps) {
    return useQuery<SchedulesResponse>({
        queryKey: ['schedules', page, searchQuery],
        queryFn: async () => {
            const res = await api.get('doctor/GetAllSchedule', { 
                params: {
                    page,
                    limit,
                    ...(searchQuery.trim() ? { search: searchQuery.trim() } : {}),
                },
            });
            return res.data;
        },
         staleTime: 60000,
        placeholderData: (previousData) => previousData,
    });
}