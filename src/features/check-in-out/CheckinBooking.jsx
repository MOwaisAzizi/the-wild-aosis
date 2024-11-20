import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import {useBooking} from '../bookings/useBooking'
import Spinner from '../../ui/Spinner'
import { useMoveBack } from "../../hooks/useMoveBack";
import CheckBox from '../../ui/Checkbox'
import { useEffect, useState } from "react";
import { useCheckIn } from "./useCheckIn";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid,setConfirmed] = useState(false)
  const moveBack = useMoveBack();
  const {booking, isLoading } = useBooking();
  const {checkin ,isCheckingIn} = useCheckIn()
  //see if the use paid just true the state and disable the checkbox
  useEffect(function(){
    setConfirmed(booking?.isPaid ?? false)
  },[booking])
 
 if(isLoading) return <Spinner/>

  const {
    id: bookingId,
    guests,
    totalPrice,
    // numGuests,
    // hasBreakfast,
    // numNights,
  } = booking;

 
  function handleCheckin() {
    if(!confirmPaid) return
     checkin(bookingId)
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
       
      <Box>
         <CheckBox disabled = {confirmPaid || isCheckingIn} checked={confirmPaid} id={'confirm'} onChange={()=>setConfirmed(confirm=>!confirm)}>
         I confirm that {guests.fullName} has paid the total amount ${formatCurrency(totalPrice)}
         </CheckBox>
      </Box>

      <ButtonGroup>
        <Button disabled = {!confirmPaid || isCheckingIn} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
