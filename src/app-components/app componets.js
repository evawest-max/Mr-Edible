import './App.css';
import { Outlet } from 'react-router-dom';
import { Navbar } from './nav components/nav';

function Appsection() {
    return (
      <div className='app'>
          <div  className='fixed-nav'><Navbar/></div>

          <main>
            <Outlet/>
          </main>
      </div>
    );
  }
  
  export default Appsection;