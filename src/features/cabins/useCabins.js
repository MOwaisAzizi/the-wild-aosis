import { useQuery } from "@tanstack/react-query"
import { gitCabins } from "../../services/apiCabins"

export function useCabins(){
    const {isLoading,data:cabinData} =  useQuery({
        ////key to store data for this name to catch 
          queryKey:['cabins'],
          queryFn:gitCabins
        })
        return {cabinData,isLoading}
}