//import Adverts from "./advert section/adverts"
import "./Foodsection.css";
import freshlycooked from "./freshlycooked.png"
import lessthan from "./less-than.svg"
import greaterthan from "./greaterThan.svg"
//import smallChops from "./small chops.png"
//import smallchops2 from "./small chops 2.png"
//import rice from "./rice and chicken 1.png"
//import soup from "./DALAS-SOUPS.png"

function Foodsection() {
  return (
    <div className="foods">
      <div className="advertcontainer">
        <img src={lessthan} alt="lessthan"/>
        <img className="advert-img" src={freshlycooked} alt="advert" />
        <img src={greaterthan} alt="greater than"/>
      </div> 
    </div>
  );
}
export default Foodsection;
