import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"
import { PAGE_SIZE } from "../../utils/constants"

export function useBookings(){
  //this is for preFetching
  const quaryClient = useQueryClient()
  
  //Filter bookings
//we use filter in another way and just fetch the filtered value
const [searchParams] = useSearchParams()
 const filterValue = searchParams.get('status')
 const filter = !filterValue || filterValue === 'all' ? null : {field:'status', value:filterValue,method:'gte'}
//  const filter = !filterValue || filterValue === 'all' ? null : {field:'totalPrice', value:5000,method:'gte'}
  
//Sort
const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
const [field, direction] = sortByRaw.split("-");
const sortBy = { field, direction };

const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

 const {isLoading,data:{data:bookings,count}={}} =  useQuery({
        ////key to store data for this name to catch , and we put filter to update as the filter changes
          queryKey:['bookings',filter,sortBy,page],
          // queryFn:getBookings
          queryFn:()=>getBookings({filter, sortBy,page})
        })

  //Prefetch the next page Data too
  const pageCount = Math.ceil(count/PAGE_SIZE)
  if(page<pageCount)
 quaryClient.prefetchQuery({
  queryKey:['bookings',filter,sortBy,page],
  // queryFn:getBookings
  queryFn:()=>getBookings({filter, sortBy,page:page+1})
 })
 
//prefitch the previose page
 if(page>1)
  quaryClient.prefetchQuery({
   queryKey:['bookings',filter,sortBy,page],
   queryFn:()=>getBookings({filter, sortBy,page:page-1})
  })


        return {bookings,isLoading,count}
}