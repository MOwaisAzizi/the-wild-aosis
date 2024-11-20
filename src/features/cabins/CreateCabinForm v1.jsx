import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";


function CreateCabinForm() {
  const {register,handleSubmit,reset,getValues,formState} = useForm()

  //get error to if thare is
   const {errors} = formState
   console.log(errors);

const queryClinet = useQueryClient()
const {mutate,isLoading:isCreating} = useMutation({
  mutationFn : createCabin, //or ()=>createCabin(id)
  onSuccess : () => {
    toast('table created!')
    queryClinet.invalidateQueries({
      queryKey:["cabins"]
    })
    reset()
  },
  onError : (err)=> toast.error(err.message)
})

function onSubmit(data){
  //mutate(data)// 👇 name of the input
  mutate({...data,image:data.image[0]});
}

function onError(){//error
  // console.log(error);
}

  return (
    //if thare is promlem with whin submiting just perform onError function
    <Form onSubmit={handleSubmit(onSubmit,onError)}>

      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isCreating} {...register("name",{required:'This field is required!'})}/>
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isCreating} {...register("maxCapacity",
          {required:'This field is required!',min:{
            value:1,
            message:'Capacity should be at least 1'
          }}
          )}/>
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isCreating} {...register("regularPrice",{required:'This field is required!'})}/>
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} disabled={isCreating} {...register("discount",{
          validate:(value)=> value < getValues().regularPrice || 'discount should be less then regularPrice'
        })}/>
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea type="number" id="description" disabled={isCreating} {...register("description",{required:'This field is required!'})} defaultValue="" />
      </FormRow>

      {/* type="file" : is also for choising a file */}
      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput  id="image" accept="image/*" disabled={isCreating} {...register("image",{required:'This field is required!'})}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Create Cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;



{/* <Form onSubmit={handleSubmit(onSubmit,onError)}>
      <FormRow label='Cabin name'>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name"  {...register("name",{required:'This field is required!'})}/>
     { errors?.name?.message && <Error>{errors.name.message}</Error>   }
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity",
          {required:'This field is required!',min:{
            value:1,
            message:'Capacity should be at least 1'
          }}
          )}/>
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" {...register("regularPrice",{required:'This field is required!'})}/>
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" id="discount" defaultValue={0} {...register("discount",{
          validate:(value)=> value <= getValues().regularPrice || 'discount should be less then regularPrice'
        })}/>
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea type="number" id="description" {...register("description",{required:'This field is required!'})} defaultValue="" />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
    //     <Button variation="secondary" type="reset">
    //       Cancel
    //     </Button>
    //     <Button disabled={isCreating}>Create Cabin</Button>
    //   </FormRow>
    // </Form> */}