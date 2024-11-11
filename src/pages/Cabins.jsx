import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "./AddCabin";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
      </Row>

      <Row type="horizontal">
        <CabinTable />
      </Row>

      <Row>
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
