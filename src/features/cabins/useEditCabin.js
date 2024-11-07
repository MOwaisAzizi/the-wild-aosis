import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEditCabin } from "../../services/apiCabins"
import toast from "react-hot-toast"

export function useEditCabin(){
  const queryClinet = useQueryClient()

const {mutate:editCabin,isLoading:isEditing} = useMutation({
  mutationFn : ({newCabinData,id})=> createEditCabin(newCabinData,id), //or ()=>createCabin(id)
  onSuccess : () => {
    toast('table edited!')
    queryClinet.invalidateQueries({
      queryKey:["cabins"]
    })
  },
  onError : (err)=> toast.error(err.message)
})
return {editCabin,isEditing}
}