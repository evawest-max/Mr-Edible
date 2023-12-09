import './App.css';
import Appsection from './app componets';
import Cart from './cart component/cart';
//import CartIcon from './cart component/cartIcon';
import CheckoutPage from './cart component/checkoutPage';
import Cartprovider from './context folder/appContext';
import LoginPage from './login/login';
//import Cartprovider from './context folder/appContext';

import SpecialOrders from './navigation/specialOrder';
import TrackOrder from './navigation/trackOrder';
import Vendors from './navigation/vendors';
import Notfound from './notfound/notfound';
import SearchBar from './search component/searchBar';
import { createBrowserRouter,  Route, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import Signup from './signup/signup';
import UserProfile from './login/userProfile/user-profile';
import Fooditem from './Food component/food item';
import Footer from '../footer-components/footer';

const router=createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Appsection/>}>
        <Route index element={<Vendors/>}/>
        <Route path='/mrEdible' element={<SearchBar/>}></Route>
        <Route path='/checkoutpage' element={<CheckoutPage/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/special' element={<SpecialOrders/>}></Route>
        <Route path='/track' element={<TrackOrder/>}></Route>
        <Route path='/vendors' element={<Vendors/>}></Route> 
        <Route path='/login-page' element={<LoginPage/>}></Route>  
        <Route path='/signup-page' element={<Signup/>}></Route> 
        <Route path='/user-profile' element={<UserProfile/>}></Route>  
        <Route path='*' element={<Notfound/>} />    
      </Route>
  )
)
function App() {
  return (
      <Cartprovider>
        <RouterProvider router={router}/>
      </Cartprovider>
  );
}

export default App;
