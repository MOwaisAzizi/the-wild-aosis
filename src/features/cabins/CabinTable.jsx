import Spinner from '../../ui/Spinner'
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import {Table} from "../../ui/Table";
import Menus from '../../ui/Menus';

export default function CabinTable(){
 const {isLoading,cabinData} = useCabins()
 if(isLoading) return <Spinner/>
  
return (
  <Menus>
  <Table columns = '0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
    <Table.Header >
      <div>Cabin</div>
      <div>Capacity</div>
      <div>Price</div>
      <div>discount</div>
    </Table.Header>

  {/* loop over the data to show Cabins */}
    <Table.Body data = {cabinData}
     render = {(cabin)=><CabinRow cabin={cabin}
     key={cabin.id}/>}/>
  </Table>
     </Menus>
)

}

