import styled from "styled-components";
import  {formatCurrency} from '../../utils/helpers'
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";

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
  
  const {discount,image,maxCapacity,name,regularPrice,id:cabinId} = cabin

  //we access to queryClient(states in devtools) in app to refresh that
  const queryClient = useQueryClient()
  
//mutate==mutateFn
//it is actualy not refresh the page as we delet but to do that we use onsuccess method
const {isloading:isDeleting,mutate} = useMutation({
  mutationFn : (id)=> deleteCabin(id),
  onSuccess : () =>{
    //consume invalid and refresh
    queryClient.invalidateQueries({
      //refresh this key
      queryKey: ['cabins']
    })
    alert('cabin successfully deleted !')
  },
  onError:(err)=>alert(err.message)
})


 return (
  <TableRow role="row">
    <Img src={image}/>
    <Cabin>{name}</Cabin>
    <div>Fits up tp {maxCapacity} quests</div>
    <Price>{formatCurrency(regularPrice)}</Price>
    <Discount>{formatCurrency(discount)}</Discount>
    <button onClick={()=>mutate(cabinId)} disabled={isDeleting}>Delete</button>
  </TableRow>
 )
}

////this not importent
CabinRow.propTypes = {
  cabin: PropTypes.shape({
      id:PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      maxCapacity: PropTypes.number.isRequired,
      regularPrice: PropTypes.number.isRequired,
      discount: PropTypes.number.isRequired,
  }).isRequired,
};