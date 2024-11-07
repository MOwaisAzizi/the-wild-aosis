import { useMutation,useQueryClient } from "@tanstack/react-query"
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins"
import toast from "react-hot-toast"

//mutate==mutateFn
//it is actualy not refresh the page as we delet but to do that we use onsuccess method
export function useDeleteCabin(){
      //we access to queryClient(states in devtools) in app to refresh that
    const queryClient = useQueryClient()
    const {isloading:isDeleting,mutate:deleteCabin} = useMutation({
        mutationFn : (id)=> deleteCabinApi(id),//or deleteCabin
        onSuccess : () =>{
          toast.success('cabin successfully deleted !')
          //consume invalid and refresh/we can do not use it but after refresh the table will delete
          queryClient.invalidateQueries({
            //refresh this key
            queryKey: ['cabins']
          })
        },
        onError:(err)=>toast.error(err.message)
      })

      return{isDeleting,deleteCabin}
}