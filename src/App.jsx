import styled from "styled-components"
import GlobalStyles from "./styles/GlobalStyles"
import Button from "./ui/Button"
import Input from "./ui/Input"


const StyledApp = styled.div`
  background-color: orangered;
  color: white;
  padding: 10px;
` 
//this is a componet
const H1 = styled.h1`
  font-weight: 600;
  background-color: yellow;
`

function App(){
  return (
    <>
    <GlobalStyles/>
    <StyledApp>
    <H1>Hello World</H1>
    <Button>Check In</Button>
    <Button>Check Out</Button>
    <Input type="text" placeholder="text"/>
    </StyledApp>
    </>
  )
}
export default App