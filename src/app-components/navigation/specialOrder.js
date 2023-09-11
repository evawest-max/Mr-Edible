import { Navbar } from "../nav components/nav";
import "./navigation.css";
function SpecialOrders(){
    return(
        <div>
            <Navbar/>
            <div className="special">
                <h2 >There are no special orders at the moment</h2>
            </div>
        </div>
    )
}

export default SpecialOrders