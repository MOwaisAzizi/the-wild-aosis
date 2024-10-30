import styled, { css } from "styled-components";

// we can delete css function but for changing the text to seem like css we use css function
const center = css`
    text-align: center;
`
const Heading = styled.h1`
  font-weight: 600;
  /* ${center} */

//as is because the elemet shoud be display in HTML as what element if we use type it will get the style
//but in HTML all element will be the name of component,use the type whin all styles use for just on element
//type is someting that we make but as is a style componet props
  ${
  (props)=>props.as === 'h1' && css`
  font-weight: 800;
  font-size : 3rem   
    `
    }

    ${
  (props)=>props.as === 'h2' && css`
  font-weight: 600;
  font-size : 2rem   
    `
    }

    ${
  (props)=>props.as === 'h3' && css`
  font-weight: 500;
  font-size : 1.8rem   
    `
    }
`

export default Heading