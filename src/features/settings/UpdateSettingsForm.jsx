import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSetings } from './useSetings';
import Spinner from '../../ui/Spinner'
import { useUpdateSettings } from './useUpdateSettings';

function UpdateSettingsForm() {
  const {settings:{minBookingLength,maxBookingLength,maxGuestsPerBooking,breakfastPrice} = {},isLoading} = useSetings()
  const {updateSetting,isUpdating} = useUpdateSettings()

function handleUpdate(e,field){
  const {value} = e.target
  if(!value) return

 updateSetting({[field]: value})
}

  if(isLoading) return <Spinner/>
  return (
    <Form>
      <FormRow label='Minimum nights/booking' >
        <Input type='number' id='min-nights'  disabled={isUpdating} defaultValue={minBookingLength} onBlur={e=>handleUpdate(e,'minBookingLength')}/>
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights'  defaultValue={maxBookingLength}  onBlur={e=>handleUpdate(e,'maxBookingLength')}/>
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests'  defaultValue={maxGuestsPerBooking} onBlur={e=>handleUpdate(e,'maxGuestsPerBooking')}/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice} onBlur={e=>handleUpdate(e,'breakfastPrice')}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
