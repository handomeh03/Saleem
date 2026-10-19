import api from "@/config/axoisConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateSchedulePayload {
    start_date: string;
    end_date: string;
}

interface CreateScheduleParams {
    doctorId: number;
    payload: CreateSchedulePayload;
}

export function useCreateDoctorSchedule() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async ({ doctorId, payload }: CreateScheduleParams) => {
            const res = await api.post(`doctor/Create-Schedule/${doctorId}`, payload);
            return res.data;
        },
        onSuccess: () => {
            toast.success('Doctor schedule created successfully!');
            queryClient.invalidateQueries({ queryKey: ['schedules'] });
            router.push('/admin-dashboard/doctors');
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Failed to create schedule';
            toast.error(Array.isArray(message) ? message[0] : message);
        },
    });
}