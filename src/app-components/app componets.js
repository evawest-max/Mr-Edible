import './App.css';
import { Outlet } from 'react-router-dom';
import { Navbar } from './nav components/nav';

function Appsection() {
    return (
      <div className='app'>
          <Navbar/>
          

          <main>
            <Outlet/>
          </main>
      </div>
    );
  }
  
  export default Appsection;