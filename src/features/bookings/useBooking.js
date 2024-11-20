import { useQuery } from "@tanstack/react-query"
import { getBooking } from "../../services/apiBookings"
import { useParams } from "react-router-dom"

//For details of bookins
export function useBooking() {
  const { bookingId } = useParams();
  console.log(bookingId + 'in useBooking');
  
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    //not fetch tree times
    retry: false,
  });

  return { isLoading, error, booking };
}