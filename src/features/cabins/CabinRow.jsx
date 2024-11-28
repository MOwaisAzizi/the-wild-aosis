import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import PropTypes from "prop-types";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

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

export default function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();
  const {
    discount,
    image,
    maxCapacity,
    name,
    regularPrice,
    description,
    id: cabinId,
  } = cabin;

  function hanldeDuplicate() {
    const cabin = {
      name: `copy of ${name}`,
      image,
      discount,
      maxCapacity,
      regularPrice,
      description,
    };
    createCabin(cabin);
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} quests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
               <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

<Menus.Button onClick={hanldeDuplicate} icon={<HiSquare2Stack />}>{" "}Duplicate</Menus.Button>

              {/* //opent window */}
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            {/* //confirm window */}
            <Modal.Window name="delete">
              <ConfirmDelete disabled={isDeleting} resourceName="cabins" onConfirm={() => deleteCabin(cabinId)}/>
            </Modal.Window>

          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

////this not importent but should be thare
CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    discription: PropTypes.string.isRequired,
  }).isRequired,
};
