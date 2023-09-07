import { Link } from "react-router-dom";
import "./notfound.css"

function Notfound(){
    return(
        <div className="notfound-container">
            <h1>This page was not found</h1>
            <p>Please click on <Link to="/home">Home Page</Link> to go back to home page</p>
        </div>
    )
}

export default Notfound