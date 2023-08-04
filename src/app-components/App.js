import './App.css';
import { Navbar } from './nav components/nav';
import SearchBar from './search component/searchBar';
//import Foodsection from './Food component/Foodsection';
function App() {
  return (
    <div className='app'>
        <Navbar/>
        <SearchBar/>
    </div>
  );
}

export default App;
