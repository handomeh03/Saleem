import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateDoctorFormValues } from "../Types/createDoctorType";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import api from "@/config/axoisConfig";

export function useCreateDoctor(){
        const queryClient = useQueryClient();
        const router = useRouter();
     const mutation = useMutation({
        mutationFn: async (data: CreateDoctorFormValues) => {
            
            const res = await api.post('auth/create-doctor', data);
            return res.data;
        },
        onSuccess: () => {
            toast.success('Doctor created successfully!');
            
            queryClient.invalidateQueries({ queryKey: ['admin-doctors'] });
            
            router.push('/admin-dashboard/doctors');
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Failed to create doctor';
            toast.error(Array.isArray(message) ? message[0] : message);
        },
    });

    return {createDoctor:mutation.mutate,isPending:mutation.isPending}
}