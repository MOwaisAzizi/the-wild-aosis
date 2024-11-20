import styled from "styled-components"
import Logo from './Logo'
import MainNav from './MainNav'
import Uploader from "../data/Uploader"

export default function Sidebar(){

    const StyledSidebar = styled.aside`
        background-color: var(--color-grey-0);
        padding: 3.2rem 2.4rem;
        grid-row: 1/-1;
        display: flex;
        flex-direction: column;
        gap: 3.2rem;
    `
    return(
       <StyledSidebar>
        <Logo/>
        <MainNav/>
        <Uploader/>
       </StyledSidebar>
    )
}