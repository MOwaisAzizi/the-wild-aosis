import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export function useCheckIn(){
    const quaryClient = useQueryClient()
    const navigate = useNavigate()

    const {mutate :checkin, isLoading:isCheckingIn} = useMutation({
        mutationFn:(bookingId)=> updateBooking(bookingId,{
                status:'check-in',
                isPaid:true
        }),
         onSuccess : (data)=>{
            toast.success(`Booking #${data.id} successfully checked in`)
            //is working as the same of before
            quaryClient.invalidateQueries({active:true})
           navigate('/')
        },
        onError : ()=>toast.error('Thare was on error')
    })

    return {checkin,isCheckingIn}
}