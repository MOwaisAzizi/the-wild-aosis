import styled from "styled-components";
import PropTypes from "prop-types";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import {useOutSiteClick} from "../hooks/useOutsiteClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;


const ModalContext = createContext();

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;
  // const open = (value)=>setOpenName(value)

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  // cloneElement lets you create a new React element using another element as a starting point.
  //or is using childern with resiving props from childer
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  //abitlit to close modal if click outside the form
  const ref = useOutSiteClick(close)

  if (name !== openName) return null;

  //dom element to exit element from root and put in body
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {/* <div>{children}</div> */}
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;


////V-1
// export default function Modal({ children,onCloseModal }) {
//   return createPortal(
//     <Overlay>
//       <StyledModal>
//         {
//           <div>
//             <Button onClick={onCloseModal}>
//               <HiXMark />
//             </Button>
//             {children}
//           </div>
//         }
//       </StyledModal>
//     </Overlay>,
//     document.body
//   );
// }

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

Window.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,

};

Open.propTypes = {
  children: PropTypes.node.isRequired,
  opens: PropTypes.string.isRequired,
};

// CreateCabinForm.propTypes = {
//   cabinToEdit: PropTypes.shape({
//     editId: PropTypes.string.isRequired,
//     editValue: PropTypes.string.isRequired,
//   }).isRequired,
//   onCloseModal: PropTypes.func.isRequired,
// };