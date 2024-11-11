// import { useState } from "react"
// import CreateCabinForm from "../features/cabins/CreateCabinForm"
import Modal from "../ui/Modal"
import Button from "../ui/Button"
import CreateCabinForm from "../features/cabins/CreateCabinForm"

export default function AddCabin(){
////compound Component
return (<Modal>
<Modal.Open opens = 'cabin-form'>
     <Button>Add New Cabin</Button>
</Modal.Open>
<Modal.Window name = 'cabin-form'>
     <CreateCabinForm/>
</Modal.Window>

{/* <Modal.Open opens = 'table'>
     <Button>show Table</Button>
</Modal.Open>
<Modal.Window name = 'table'>
     <CabinTable/>
</Modal.Window> */}

</Modal>
)



// const [showModal,setshowModal] = useState(false)
// return (
//     <div>
//     <Button onClick={()=>setshowModal(show=>!show)}>Add New</Button>
//     {showModal && (
//              <Modal onCloseModal = {()=>setshowModal(false)}>
//         <CreateCabinForm onCloseModal = {()=>setshowModal(false)}/>
//              </Modal>
//     )
//     }
//    </div>
// )

}
