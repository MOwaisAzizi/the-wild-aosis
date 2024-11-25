import styled from "styled-components";
import  {formatCurrency} from '../../utils/helpers'
import PropTypes from 'prop-types';
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({cabin}){
  const {isDeleting,deleteCabin} = useDeleteCabin()
  const {createCabin,isCreating}= useCreateCabin()
  const {discount,image,maxCapacity,name,regularPrice,discription,id:cabinId} = cabin

function hanldeDuplicate(){
  const cabin = {
    name:`copy of ${name}`,image,discount,maxCapacity,regularPrice,discription
  }
 createCabin(cabin)
}

 return (
  <>
  <TableRow role="row">
  <Img src={image}/>
  <Cabin>{name}</Cabin>
  <div>Fits up to {maxCapacity} quests</div>
  <Price>{formatCurrency(regularPrice)}</Price>
  {discount ? <Discount>{formatCurrency(discount)}</Discount>: <span>&mdash;</span>}
  <div>
 <Modal>
 <button onClick={hanldeDuplicate}><HiSquare2Stack disabled={isCreating}/></button>
  <Modal.Open opens = 'edit'>
  <button><HiPencil/></button>
  </Modal.Open>

  <Modal.Window name = 'edit'>
 <CreateCabinForm cabinToEdit = {cabin} />
</Modal.Window>

{/* //opent window */}
<Modal.Open opens="delete">
  <button><HiTrash/></button>
</Modal.Open>

{/* //confirm window */}
<Modal.Window name="delete">
 <ConfirmDelete disabled={isDeleting} resourceName='cabins' onConfirm = {()=>deleteCabin(cabinId)}/>
</Modal.Window>
 </Modal>
  </div>
</TableRow>


</>
  // <>
  //   <TableRow role="row">
  //   <Img src={image}/>
  //   <Cabin>{name}</Cabin>
  //   <div>Fits up to {maxCapacity} quests</div>
  //   <Price>{formatCurrency(regularPrice)}</Price>
  //   {discount ? <Discount>{formatCurrency(discount)}</Discount>: <span>&mdash;</span>}
  //   <div>
  //   <button onClick={hanldeDuplicate}><HiSquare2Stack disabled={isCreating}/></button>
  //   <button onClick={()=>setShowForm(show=>!show)}><HiPencil/></button>
  //   <button onClick={()=>deleteCabin(cabinId)} disabled={isDeleting}><HiTrash/></button>
  //   </div>
  // </TableRow>
  // {showForm && <CreateCabinForm cabinToEdit = {cabin} />}
  // </>
 )
}

////this not importent but should be thare
CabinRow.propTypes = {
  cabin: PropTypes.shape({
      id:PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      maxCapacity: PropTypes.number.isRequired,
      regularPrice: PropTypes.number.isRequired,
      discount: PropTypes.number.isRequired,
      discription: PropTypes.string.isRequired,
  }).isRequired,
};

