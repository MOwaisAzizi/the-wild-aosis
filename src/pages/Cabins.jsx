import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";


function Cabins() {

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

</>
  );
}

export default Cabins;
