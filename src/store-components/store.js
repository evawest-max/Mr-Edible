import "./store.css"
import playStore from "./play-icon.svg"
import appStore from "./app-store.svg"
function Store(){
    return(
        <div className="store-container">
            <h1>Get Our App</h1>
            <p>you can use our app for a better experience on your smart phone</p>
            <div className="app-store-logo-container">
                <div className="store">
                    <img src={appStore} alt="app store"/>
                    <h4>Apple Store</h4>
                </div>
                <div className="store">
                    <img src={playStore} alt="app store"/>
                    <h4> Google Play Store</h4>
                </div>
            </div>
        </div>
    )
}
export default Store