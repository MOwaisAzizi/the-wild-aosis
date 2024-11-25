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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Bookins";
import CheckinBooking from "./features/check-in-out/CheckinBooking";

// these are all in templet leteral but by using extention it seem that is not
// const StyledApp = styled.div`
//   padding: 10px;
// `;
//this is a componet
// const H1 = styled.h1`
//   font-weight: 600;
//   background-color: yellow;
// `

const queryClint = new QueryClient({  defaultOptions :
  {
  queries:{
    // cacheTime : 60 * 1000
    cacheTime : 0
  }
}
})

function App() {
  return<QueryClientProvider client={queryClint}>
   <ReactQueryDevtools initialIsOpen = {false}/>
 <GlobalStyles/>
   <BrowserRouter> 
    <Routes>  
    <Route element={<AppLayout/>}>
      {/* //this is for default page so whin we do not go to any pages(by searchbar) it atomaticall will navigate to pashbord */}
    <Route index element={<Navigate to={'dashboard'}/>}/>
    <Route path="dashboard" element={<Dashboard/>}/>
    <Route path="bookings" element={<Bookings/>}/>
    <Route path="bookings/:bookingId" element={<Booking/>}/>
    <Route path="checkin/:bookingId" element={<CheckinBooking/>}/>
    <Route path="cabins" element={<Cabins/>}/>
    <Route path="settings" element={<Settings/>}/>
    <Route path="users" element={<Users/>}/>
    <Route path="login" element={<Login/>}/>
    <Route path="account" element={<Account/>}/>
    <Route path="*" element={<PageNotFound/>}/>
      </Route>
   </Routes>
   </BrowserRouter>

   <Toaster
   position="top-center"
   gutter={12}
   containerStyle={{margin:'8px'}}
   toastOptions={{
    success :{
         duration : 3000
    },
    error : {
      duration:5000
    },
    style :{
      fontSize:'16px',
      maxWidth:'1500px',
      padding:'16px 24px',
      backgroundColor:'var(--color-grey-0)',
      color:'var(--color-grey-700)'
    }
   }}
   />
 </QueryClientProvider>
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