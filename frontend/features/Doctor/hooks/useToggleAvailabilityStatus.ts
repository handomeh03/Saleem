import api from "@/config/axoisConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ToggleStatusParams {
    availabilityId: number;
    currentStatus: boolean;
}

export function useToggleAvailabilityStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ availabilityId, currentStatus }: ToggleStatusParams) => {
            const res = await api.patch(`doctor/Schedule/edit-dailyAvaibilty/${availabilityId}`, {
                status: !currentStatus,
            });
            return res.data;
        },
        onSuccess: () => {
            toast.success('Availability status updated successfully');
           
            queryClient.invalidateQueries({ queryKey: ['schedules'] }); 
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Failed to update status';
            toast.error(message);
        },
    });
}