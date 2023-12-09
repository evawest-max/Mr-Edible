import "./footer.css"
import facebook from "./facebook.svg"
import instagram from "./instagram.svg"
import whatsapp from "./whatsapp.svg"
import copyright from "./copyright.svg"
function Footer(){
    return(
        <div className="container">
            <div className="footer-container" >
                <div>
                    <h4 className="link-title">Quick Links</h4>
                    <div className="quick-links">
                        <p>About Us</p>
                        <p>Our mission and vision</p>
                        <p>Privacy Policy</p>
                        <p>Terms & Conditions</p>
                        <p>FAQ</p>
                    </div>
                </div>
                <div>
                    <h4 className="link-title">Contact Us</h4>
                    <div className="quick-links">
                        <p>Contact@mredible.com</p>
                        <div className="footer-image">
                            <img src={facebook} alt="facebook"/>
                            <img src={instagram} alt="instagram"/>
                            <a href="https://api.Whatsapp.com/send?phone=2347032397184&text=I%27m+having+an+issue+can+you+please+help+me+resolve+it"><img src={whatsapp} alt="whats app"/></a>
                            
                        </div>
                        <div className="subscribe-container">
                            <input className="footer-input" type="text" placeholder="Email address"/>
                            <button className="footer-button"><b>Subcribe</b></button>
                        </div>

                    </div>
                </div>
            </div>
            <p className="copyright-para"><img src={copyright} alt="copyright"/> 2023 Ebunolwa Akinwumi. All Rights reserved</p>
        </div>
    )
}

export default Footer