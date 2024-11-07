import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSetings(){
    const {data:settings,isLoading,error} = useQuery({
     queryKey : ['setiings'],
     queryFn: getSettings
    })
    return {settings,isLoading,error}
}