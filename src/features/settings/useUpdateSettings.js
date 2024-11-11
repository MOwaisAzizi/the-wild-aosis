
import { useMutation, useQueryClient } from "@tanstack/react-query"
// import { createEditCabin } from "../../services/apiCabins"
import toast from "react-hot-toast"
import { updateSetting as updateSettingsApi } from "../../services/apiSettings"

export function useUpdateSettings(){
  const queryClinet = useQueryClient()

const {mutate: updateSetting, isLoading :isUpdating} = useMutation({
  mutationFn : ({newSetting})=> updateSettingsApi(newSetting), //or ()=>createCabin(id)
  onSuccess : () => {
    toast('settings edited!')
    queryClinet.invalidateQueries({
      queryKey:["settings"]
    })
  },
  onError : (err)=> toast.error(err.message)
})
return {updateSetting,isUpdating}
}