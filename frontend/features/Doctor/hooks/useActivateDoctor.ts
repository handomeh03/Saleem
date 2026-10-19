import api from "@/config/axoisConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useActivateDoctor() {
    const queryClient = useQueryClient();
    
    const toggleActiveMutation = useMutation({
        mutationFn: async ({ doctorId }: { doctorId: number }) => {
            const res = await api.patch(`doctor/Delete-doctor/${doctorId}`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Doctor status updated successfully");
            queryClient.invalidateQueries({ queryKey: ['admin-doctors'] });
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || "Failed to update doctor status";
            toast.error(message);
        }
    });

    
    return toggleActiveMutation;
}