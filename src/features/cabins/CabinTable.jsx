import styled from "styled-components";
import Spinner from '../../ui/Spinner'

import { useQuery } from "@tanstack/react-query"
import { gitCabins } from "../../services/apiCabins"
import CabinRow from "./CabinRow";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

export default function CabinTable(){

 const {isLoading,data:cabinData} =  useQuery({
  ////key to store data for this name to catch 
    queryKey:['cabin'],
    queryFn:gitCabins
  })
 if(isLoading) return <Spinner/>

 console.log(cabinData)
 
  
return (
  <Table role="table">
    <TableHeader role="row">
      <div>Cabin</div>
      <div>Capacity</div>
      <div>Price</div>
      <div>discount</div>
    </TableHeader>
    {
      cabinData.map(cabin=><CabinRow cabin={cabin} key={cabin.id}/>)
    }
  </Table>
)

}
