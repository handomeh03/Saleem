import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "../types/loginType";
import api from "@/config/axoisConfig";
import { toast } from "sonner";

import { useAuth } from "@/store/context/userContext";
import { useRouter } from 'next/navigation';

export function useLogin() {
    const router = useRouter();
  const { setUser } = useAuth(); 
   
  
    const mutation = useMutation({
        mutationFn: async (loginData: LoginFormData) => {
            const response = await api.post("auth/login",loginData);
            return response.data;
        },
        onSuccess: async (data) => {
            if (data.accessToken) {
                 localStorage.setItem("accessToken", data.accessToken);
                }
            try {
                const meResponse = await api.get("auth/me");
                setUser(meResponse.data);
                toast.success(data.message);
                
            } catch (error) {
               
                console.error("Failed to fetch user profile after login:", error);
            }

             const redirectPath = data?.role=="admin"?"/admin-dashboard/doctors":"/DoctorDashboard/doctor-recourds";
             router.push(redirectPath);
            
        },
        onError: (error: any) => {
            const errorMessage =
                error.response?.data?.message;
            toast.error(errorMessage);
        },

    })
    return {login:mutation.mutate,isPending:mutation.isPending,isError:mutation.isError,error:mutation.error};
}