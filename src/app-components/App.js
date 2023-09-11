import './App.css';
import Appsection from './app componets';
import Cart from './cart component/cart';
//import CartIcon from './cart component/cartIcon';
import CheckoutPage from './cart component/checkoutPage';
import SpecialOrders from './navigation/specialOrder';
import TrackOrder from './navigation/trackOrder';
import Vendors from './navigation/vendors';
import Notfound from './notfound/notfound';
import SearchBar from './search component/searchBar';
import { createBrowserRouter,  Route, createRoutesFromElements, RouterProvider} from 'react-router-dom';

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<SearchBar/>}/>
      <Route path='/checkoutpage' element={<CheckoutPage/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/special' element={<SpecialOrders/>}></Route>
      <Route path='/track' element={<TrackOrder/>}></Route>
      <Route path='/vendors' element={<Vendors/>}></Route>  
      <Route path='*' element={<Notfound/>} />    
    </Route>
  )
)
function App() {
  return (
        <RouterProvider router={router}/>
  );
}

export default App;
