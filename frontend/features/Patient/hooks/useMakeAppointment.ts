import api from "@/config/axoisConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface AppointmentPayload {
    doctorId: number;
    from_time: string;
    to_time: string;
    description: string;
}

export function useMakeAppointment(doctorId:string) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (payload: AppointmentPayload) => {
            const res = await api.post("patient/create-appointment", payload);
            return res.data;
        },
        onSuccess: (data) => {
            
            queryClient.invalidateQueries({
                queryKey: ['doctor-details', doctorId]
            });

            toast.success("Successfully booked appointment");
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || "Failed to book appointment. Please try again.";
            toast.error(errorMessage);
        }
    });

    return { makeAppointment: mutation.mutate, isPending: mutation.isPending };
}