import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";


function Cabins() {
const [showForm,setShowForm] = useState(false)
//   useEffect(function(){
//     gitCabins().then(data=>{
//       console.log(data);
//     })
//   },[])
  
  return (
<>
<Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
    </Row>

<Row type="horizontal">
<CabinTable/>
</Row>

<Row>
<Button onClick={()=>setShowForm(show=>!show)}>Add New</Button>
{
  showForm && <CreateCabinForm/>
}
</Row>

</>
  );
}

export default Cabins;
