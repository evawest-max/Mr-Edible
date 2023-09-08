//import Adverts from "./advert section/adverts"
import "./Foodsection.css";
import specialadverts from "./foodAdverts";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";



function Foodsection() { 
  return (
    
      <div className="advertcontainer">
        <AliceCarousel>
          <Link to="/special"><p><img className="advert-img" src={specialadverts[0].link} alt="advert" /></p></Link>
          <Link to="/special"><p><img className="advert-img" src={specialadverts[2].link} alt="advert" /></p></Link>
          <Link to="/special"><p><img className="advert-img" src={specialadverts[3].link} alt="advert" /></p></Link>
          <Link to="/special"><p><img className="advert-img" src={specialadverts[4].link} alt="advert" /></p></Link>
        </AliceCarousel>
      </div> 
    
  );
}
export default Foodsection;
