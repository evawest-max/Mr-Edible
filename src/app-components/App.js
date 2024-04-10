import './App.css';
import Appsection from './app componets';
import Cart from './Mr edible store/cart component/cart';
import CheckoutPage from './Mr edible store/cart component/checkoutPage';
import Cartprovider from './Mr edible store/context folder/appContext';
import LoginPage from './login/login';

import SpecialOrders from './navigation/specialOrder';
import TrackOrder from './navigation/trackOrder';
import Vendors from './navigation/vendors';
import Notfound from './notfound/notfound';
import SearchBar from './Mr edible store/search component/searchBar';
import { createBrowserRouter,  Route, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import Signup from './signup/signup';
import UserProfile from './login/userProfile/user-profile';
import SmileCakesSearchBar from './smile cakes/smile cakes search component/smile cakes searchBar';
import SmileCakesCart from './smile cakes/smile cakes cart component/smile cakes cart';
import SmileCakesCartprovider from './smile cakes/smile cartContext/smileCartContext';
import Cartitem from './smile cakes/smile cakes cart component/checkoutPage';
import ResetPassword from './login/reset-profile';
import Homepage from './navigation/homePage/homePage';
import AdminRoot from './login/admin/admin-Root/adminRoot';
import Overview from './login/admin/admin overview/overview';
import Payment from './login/admin/payments/payment';
import Properties from './login/admin/vendors/vendors';
import Schedules from './login/admin/Schedules/schedules';
import Users from './login/admin/customers/customers';
import Settings from './login/admin/settings/settings';
import VendorDetails from './login/admin/vendors/vendor details page/vendor details';
import VendorsCardContainer from './login/admin/vendors/vendors';
import CustomerRoot from './login/admin/customers/customer details page/customer root';
import CustomerDetails from './login/admin/customers/customer details page/customer details';
import VendorProfileOverview from './login/vendors/vendor overview/vendor overview';
import VendorRoot from './login/vendors/vendor-Root/vendorRoot';
import Notifications from './login/vendors/notifications/notifications';
import VendorFoods from './login/vendors/vendor-foods/vendor-foods';
import VendorUpload from './login/vendors/upload/upload';
import VendorSettings from './login/vendors/vendor settings/vendor-settings';


const router=createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Appsection/>}>
        <Route index element={<Homepage/>}/>
        <Route path='/vendors' element={<Vendors/>}></Route>
        <Route path='/mrEdible' element={<SearchBar/>}></Route>
        <Route path='/checkoutpage' element={<CheckoutPage/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/special' element={<SpecialOrders/>}></Route>
        <Route path='/track' element={<TrackOrder/>}></Route>
        <Route path='/vendors' element={<Vendors/>}></Route> 
        <Route path='/login-page' element={<LoginPage/>}></Route>  
        <Route path='/signup-page' element={<Signup/>}></Route> 
        <Route path='/user-profile' element={<UserProfile/>}></Route>  
        <Route path='//reset-profile' element={<ResetPassword/>}></Route>    
        <Route path='/smile-cakes' element={<SmileCakesSearchBar/>}></Route>
        <Route path='/smile-cakes-cart' element={<SmileCakesCart/>}></Route>
        <Route path='/smile-cakes-checkoutpage' element={<Cartitem/>}></Route>
        <Route path='admin-page' element={<AdminRoot/>}>
          <Route index element={<Overview/>}/>
          <Route path='overview' element={<Overview/>}/>
          <Route path='vendorsCardContainer' element={<VendorRoot/>}>
            <Route index element={<VendorsCardContainer/>}/>
            <Route path='vendordetails' element={<VendorDetails/>}/>
          </Route>
          <Route path='customers' element={<CustomerRoot/>}>
            <Route index element={<Users/>}/>
            <Route path='customerdetails' element={<CustomerDetails/>}/>
          </Route>
          <Route path='schedules' element={<Schedules/>}/>
          <Route path='settings' element={<Settings/>}/> 
        </Route>
        <Route path='Vendor-profile-Overview' element={<VendorRoot/>}>
          <Route index element={<VendorProfileOverview/>}/>
          <Route path='vendor-profile-Overview' element={<VendorProfileOverview/>}/> 
          <Route path='vendor-Notifications' element={<Notifications/>}/> 
          <Route path='vendor-foods' element={<VendorFoods/>}/> 
          <Route path='Vendor-upload' element={<VendorUpload/>}/> 
          <Route path='Vendor-settings' element={<VendorSettings/>}/> 
        </Route>
      
        <Route path='*' element={<Notfound/>} /> 
      </Route>
  )
)
function App() {
  return (
      <Cartprovider>
        <SmileCakesCartprovider>
          <RouterProvider router={router}/>
        </SmileCakesCartprovider>
      </Cartprovider>
  );
}

export default App;
