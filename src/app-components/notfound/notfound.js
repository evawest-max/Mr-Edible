import { Link } from "react-router-dom";
import "./notfound.css"
import { Navbar } from "../nav components/nav";

function Notfound(){
    return(
        <div>
            <Navbar/>
            <div className="notfound-container">
                <h1>This page was not found</h1>
                <p>Please click on <Link to="/">Home Page</Link> to go back to home page</p>
            </div>
        </div>
    )
}

export default Notfound