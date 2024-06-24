import { useEffect, useState } from "react";
import "./Foodsection.css";
import { Cartcontext} from "../context folder/appContext";
import { useContext } from "react";
import { FaCartPlus } from "react-icons/fa6";
import { MdRemoveShoppingCart } from "react-icons/md";
import { getDownloadURL, getStorage, ref } from "firebase/storage";


//  export let checkout=[]
 function Fooditem(props){
    const cart= useContext(Cartcontext)
    
    const [buttonState, newbuttonState]= useState(<button onClick={addToCart} className="food-button">Add to cart <FaCartPlus/></button>)

    function addToCart(){
        newbuttonState(<button onClick={removefromCart} className="food-button">Remove <MdRemoveShoppingCart /></button>)
        cart.addItemsToCartList(props.id, props.price,props.name, props.image, props.vendorName )
    }

    function removefromCart(){    
        newbuttonState(<button onClick={addToCart} className="food-button">Add to cart <FaCartPlus/></button>)
        cart.deleteFromCartList(props.id)
    }
    const [imageurl, setimageurl]=useState("https://robohash.org/ebu")
    const storage = getStorage();
    
    getDownloadURL(ref(storage, props.image))
    .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        setimageurl(url)
        // alert(url)
        // console.log("URL is Correct")
    })
    .catch((error) => {
        alert(error)
        // console.log("URL is wrong")
    });

    return(
       
            <div className="food-item"  >
                <img src={imageurl} alt="rice"/>
                <p className="food-name">{props.name}</p>
                <p className="food-price"><del>{props.oldprice}</del> ₦{props.price}</p>
                <div>{props.stars}</div>
                {!props.availability?<button>Unavailabile</button>:buttonState}
            </div>
        
    )
}
export default Fooditem