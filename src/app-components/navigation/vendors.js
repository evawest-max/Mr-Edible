import { Navbar } from "../nav components/nav"
import "./navigation.css";
function Vendors(){
    return(
        <div>
            <Navbar/>
            <div className="vendorContainer">
                <h2 >We are yet to onboard new vendors. use the subscribe button below to stay updated</h2>
            </div>
        </div>
    )
}

export default Vendors