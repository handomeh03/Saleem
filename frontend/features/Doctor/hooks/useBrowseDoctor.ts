import api from "@/config/axoisConfig";
import { useQuery } from "@tanstack/react-query";

export function useBrowseDoctor({currentPage,searchQuery}:{currentPage:number,searchQuery:string}){
    const { data, isLoading, isFetching, isError } = useQuery({
        queryKey: ["doctor",currentPage,searchQuery],
        queryFn: async () => {
            const response = await api.get("patient/browse-doctors", {
                params: {
                    page: currentPage,
                    search: searchQuery,
                },
            });
            return response.data;
        },
        staleTime: 60000,
        placeholderData: (previousData) => previousData,
    });
    return {data,isLoading,isFetching,isError}
}