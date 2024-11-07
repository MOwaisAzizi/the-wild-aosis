import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import PropTypes from "prop-types";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValue } = cabinToEdit;
  const isEditSesion = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    //to add values in form by default
    defaultValues: isEditSesion ? editValue : {},
  });
  //get error to if thare is in input fields
  const { errors } = formState;

  function onSubmit(data) {
    //whin you not choise in edit a new image it will be the path but whin you chose another it will recreate anoter
    const image = typeof data.image === "string" ? data.image : data.image[0];
    //editCabin and createCabin are actually mutate function so access to onsuccess
    if (isEditSesion)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => reset(),
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => reset(),
        }
      );
  }

  function onError() {
    //error
    // console.log(error);
  }

  return (
    //if thare is promlem with whin submiting just perform onError function
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required!" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required!",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", { required: "This field is required!" })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            validate: (value) =>
              value < getValues().regularPrice ||
              "discount should be less then regularPrice",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          {...register("description", { required: "This field is required!" })}
          defaultValue=""
        />
      </FormRow>

      {/* type="file" : is also for choising a file */}
      <FormRow label="Cabin photo" error={errors?.image?.message}>
        {/* we can not refetch image to edit */}
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSesion ? false : "This field is required!",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSesion ? "Edit Cabin" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.shape({
    editId: PropTypes.string.isRequired,
    editValue: PropTypes.string.isRequired,
  }).isRequired,
};

{
  /* <Form onSubmit={handleSubmit(onSubmit,onError)}>
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
        {/* type is an HTML attribute! */
}
//     <Button variation="secondary" type="reset">
//       Cancel
//     </Button>
//     <Button disabled={isCreating}>Create Cabin</Button>
//   </FormRow>
// </Form> */}
