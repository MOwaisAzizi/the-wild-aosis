import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from './styles/GlobalStyles'
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Cabins from './pages/Cabins'
import Login from './pages/Login'
import Account from './pages/Account'
import Users from './pages/Users'
import PageNotFound from './pages/PageNotFound'
import Settings from './pages/Settings'
import AppLayout from "./ui/AppLayout";

// these are all in templet leteral but by using extention it seem that is not
// const StyledApp = styled.div`
//   padding: 10px;
// `;
//this is a componet
// const H1 = styled.h1`
//   font-weight: 600;
//   background-color: yellow;
// `

function App() {
  return (
   <>
       <GlobalStyles/>
   <BrowserRouter>
    <Routes>  
      <Route element={<AppLayout/>}>
       
      {/* //this is for default page so whin we do not go to any pages('/') it atomaticall will navigate to pashbord */}
    <Route index element={<Navigate to={'dashboard'}/>}/>
    <Route path="dashboard" element={<Dashboard/>}/>
    <Route path="bookings" element={<Bookings/>}/>
    <Route path="cabins" element={<Cabins/>}/>
    <Route path="users" element={<Users/>}/>
    <Route path="settings" element={<Settings/>}/>
    <Route path="pageNotFound" element={<PageNotFound/>}/>
    <Route path="login" element={<Login/>}/>
    <Route path="account" element={<Account/>}/>
      </Route>
   </Routes>
   </BrowserRouter>
   </>
  );
}
export default App;


{/* <>
<GlobalStyles />

<StyledApp>
  <Row type="vertical">
    <Row type="horizontal">
      <Heading as="h1">Wild oasis</Heading>
      <div>
        <Button size = 'large' variation = 'primary'>Check In</Button>
        <Button>Check Out</Button>
      </div>
    </Row>

    <Row type="vertical">
      <Heading as="h3">Form</Heading>
      <div>
        <Input type="text" placeholder="text" />
        <Input type="text" placeholder="next" />
      </div>
    </Row>
  </Row>
</StyledApp>
</> */}