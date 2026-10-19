import api from "@/config/axoisConfig";
import { useQuery } from "@tanstack/react-query";

export interface DoctorRecord {
    id: number;
    doctorId: number;
    patient_code: string;
    date: string;
    from_time: string;
    to_time: string;
    status: string;
    description: string;
    created_at: string;
    updatedAt: string;
    doctor: {
        specialization: string;
        bio: string;
        userId: number;
        user: {
            name: string;
        };
    };
}

export interface DoctorRecordsResponse {
    data: DoctorRecord[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

interface UseGetDoctorRecordsProps {
    page: number;
    searchQuery: string;
    limit?: number;
}

export function useGetDoctorRecords({ page, searchQuery, limit = 10 }: UseGetDoctorRecordsProps) {
    return useQuery<DoctorRecordsResponse>({
        queryKey: ['doctor-records', page, searchQuery],
        queryFn: async () => {
            try {
                const res = await api.get('doctor/Doctor-recourds', {
                    params: {
                        page,
                        limit,
                        ...(searchQuery.trim() ? { search: searchQuery.trim() } : {}),
                    },
                }); 
                return res.data;
            } catch (err) {
                
                throw err;
            }
        },
         staleTime: 60000,
        placeholderData: (previousData) => previousData,
    });
}