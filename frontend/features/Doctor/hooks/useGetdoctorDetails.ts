import api from "@/config/axoisConfig";
import { useQuery } from "@tanstack/react-query";
interface UseDoctorDetailsProps {
    doctorId?: string; 
}
export function useGetdoctorDetails({doctorId}:UseDoctorDetailsProps){
    const { data: responseData, isLoading, isError } = useQuery({
        queryKey: ['doctor-details', doctorId],
        queryFn: async () => {
            const res = await api.get(`patient/doctor-detail/${doctorId}`);
            return res.data;
        },
        enabled: !!doctorId,
    });
    return {responseData,isLoading,isError};
}