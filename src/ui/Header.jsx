import styled from "styled-components"


export default function Header(){

  const HeaderStyled = styled.div`
        background-color: var(--color-grey-0);
        padding: 1.2rem 4.2rem;
        border: 1px solid var(--color-grey-100);
`

    return(
       <HeaderStyled>
         <p>Header</p>
       </HeaderStyled>
    )
}