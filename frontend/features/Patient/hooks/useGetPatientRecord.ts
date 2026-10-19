import api from "@/config/axoisConfig";
import { useQuery } from "@tanstack/react-query";

export interface PatientRecord {
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
        user: {
            name: string;
        };
    };
}

export function useGetPatientRecord(patientCode: string) {
    return useQuery<PatientRecord>({
        queryKey: ['patient-record', patientCode],
        queryFn: async () => {
            if (!patientCode.trim()) throw new Error('Code is required');
            
          
            const res = await api.get(`patient/patient-recourd/${patientCode.trim()}`);
            return res.data; 
        },
         staleTime: 60000,
        placeholderData: (previousData) => previousData,
        enabled: false, 
        retry: false,
    });
}