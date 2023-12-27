import "./checkoutpage.css";
// import backArrow from "./back arrow.svg"
//import mredible from "./mrEdible.PNG"
import { useContext } from "react";
import { Cartcontext } from "../context folder/appContext";
import {BiArrowBack} from "react-icons/bi"
import { useState} from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { Link } from "react-router-dom";
import Cart, { productsIDInTheCartListpagetotal } from "./cart";


export default function Cartitem() {
  const cart=useContext(Cartcontext)
  //const [amount, setAmount] = useState(0);
  const [location,setlocation]=useState("")
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const config = {
    public_key: "FLWPUBK_TEST-cb119a9a9127ae014d8a8ddd16e081da-X",
    tx_ref: Date.now(),
    amount: productsIDInTheCartListpagetotal.toString(),
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email,
      phone_number: phone.toString(),
      name: name,
      location: location.toString()
      //amount:cart.totalItemInCart
    },
    customizations: {
      title: "Mr Edible",
      description: "Payment for items in cart",
      logo: "https://s3.amazonaws.com/logos.brandpa.com/images/0996ece46a850625a585854e651c4c0c.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
    <div className="cart-back-arrow">
        <Link to="/cart"><BiArrowBack/></Link>
            <h4 className="goback">Back to cart</h4>
    </div> 
      <div className="containers">
        <input
          type="number"
          placeholder="Amount"
          value={productsIDInTheCartListpagetotal.toString()}
          //onchange={(e) => setAmount(cart.totalItemInCart.toString())}
        />
        <select 
        onChange={(e) => setlocation(e.target.value)} 
        >
          <option value="Port Harcourt">Port Harcourt</option>
          <option value="Warri">Warri</option>
          <option value="Lagos">Lagos</option>
          <option value="Asaba">Asaba</option>
          <option value="Chosose location" selected>Choose Location</option>
        </select>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        
        <button
          onClick={() =>
            handleFlutterPayment({
              callback: (response) => {
                if(response){
                  alert("Thank you, transction successfull. Our delivery agent will be in touch with you soon")
                  cart.addToOrders()
                }else{alert("Transction unsuccessful, please try again.")}
                //console.log(response);
                closePaymentModal();
              },
              onClose: () => {},
            })
          }
        >
          Pay
        </button>
      </div>
    </div>
  );
}