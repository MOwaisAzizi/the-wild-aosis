import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";


export default function AppLayout(){

     const StyledAppLayout = styled.div`
        display: grid;
        grid-template-columns: 26rem 1fr;
        grid-template-rows: auto 1fr;
        height: 100vh;
     `

    const Main = styled.main`
        background-color: var(--color-grey-50);
        padding: 4rem 4.6rem 6.4rem;
    `

    return(
       <StyledAppLayout>

       <Header/>
       <Sidebar/>

       <Main>
       <Outlet/>
        </Main>         
       </StyledAppLayout>
    )
}