import Spinner from '../../ui/Spinner'
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

export default function CabinTable(){
 const {isLoading,cabinData} = useCabins()
 const[searchParams] = useSearchParams()
 if(isLoading) return <Spinner/>

 //1-Filter
 let filterValue = searchParams.get('discount') || 'all'
 let filterCabins;
if(filterValue==='all') filterCabins = cabinData
if(filterValue==='no-discount') filterCabins = cabinData.filter(data=>data.discount === 0)
if(filterValue==='with-discount') filterCabins = cabinData.filter(data=>data.discount > 0)
  
//Sort
const sortBy = searchParams.get('sortBy') || 'startDate-asc'
const [field,direction] = sortBy.split('-')
//for asc and desc 
const modifier = direction === 'asc' ? 1 : -1
const sortedCabin = filterCabins.sort((a,b)=>(a[field] - b[field]) * modifier)

if(!sortedCabin.length) return <Empty resoureName = 'Cabins'/>


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
    <Table.Body data = {sortedCabin}
     render = {(cabin)=><CabinRow cabin={cabin}
     key={cabin.id}/>}/>
  </Table>
     </Menus>
)

}

