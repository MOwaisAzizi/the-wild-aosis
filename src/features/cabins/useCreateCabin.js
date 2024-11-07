import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEditCabin } from "../../services/apiCabins"
import toast from "react-hot-toast"

export function useCreateCabin(){
const queryClinet = useQueryClient()

    const {mutate:createCabin, isLoading:isCreating} = useMutation({
        mutationFn : createEditCabin, //or ()=>createCabin(id)
        onSuccess : () => {
          toast('table created!')
          queryClinet.invalidateQueries({
            queryKey:["cabins"]
          })
        },
        onError : (err)=> toast.error(err.message)
      })
      return {createCabin,isCreating}
}