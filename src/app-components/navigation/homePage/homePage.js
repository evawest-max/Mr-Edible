
// import { useRef, useState } from "react";
// import VendorCard from "../vendor/vendor-card";
// import vendorsdata from "../vendor/vendorDatabase";
import "./homePage.css";
// import {AiFillStar} from "react-icons/ai";
// import { useContext } from "react";
// import { Cartcontext } from "../Mr edible store/context folder/appContext"
// import { TiArrowDownThick } from "react-icons/ti";
// import { FaSearch } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { MdPlayCircle } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FcFaq } from "react-icons/fc";
import Store from "../../component/store-components/store";
import Footer from "../../component/footer-components/footer";
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";

function Homepage(){
    const db = getDatabase();
    const dbRef = ref(getDatabase()); 
    get(child(dbRef, 'users/')).then((snapshot) => {
    if (snapshot.exists()) {
        
        let list=[]
        const data = snapshot.val();
        Object.values(data).map((item)=>{
            if (item.accountType==='vendor'){
                list.push(item)
                localStorage.setItem('vendors',JSON.stringify(list));
            }
        })
        // for (const key in data) {
        //     const element = data[key];

        //         if(element.accountType==="vendor"){
        //             list.push(data)
        //             localStorage.setItem('vendors',JSON.stringify(list[0]));
        //             console.log(list[0])
        //         }
        // }
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });

    // const starCountRef = ref(db, 'users/vendors');
    // onValue(starCountRef, (snapshot) => {
    //     let list=[]
    //     const data = snapshot.val();
    //     for (const key in data) {
    //         const element = data[key];

    //             if(element.accountType==="vendor"){
    //                 list.push(data)
    //                 localStorage.setItem('vendors',JSON.stringify(list[0]));
    //             }
    //     }
    // });

    const starCountRefs = ref(db, 'food items/');
    onValue(starCountRefs, (snapshot) => {
        // vendorsFoods=snapshot.val();
        // console.log(snapshot.val())
        localStorage.setItem("allVendorItem", JSON.stringify(snapshot.val()))
    //   if (snapshot.exists()) {
    //     console.log('yes')
    //   } else {
    //     console.log('no')
    // }
    })

    return(
        <div>
            <div className="homepage-image-container">
                <div className="homepage-text-btn-container">
                    <h3> Welcome to Mr Edible Food<br/> market place <br/><span>WE ARE RATED<IoIosStar /><IoIosStar /><IoIosStar /><IoIosStar /><IoIosStar /></span></h3>
                    <div>
                        <NavLink to="vendors" className="homepage-Btn-1">Order <span><MdKeyboardDoubleArrowRight style={{fontSize:"200%"}}/></span></NavLink>
                        <Link to="https://www.youtube.com/channel/UCblfN9rFw3yW1P64VThsgnw" className="homepage-Btn-2"><MdPlayCircle style={{fontSize:"200%"}} />  How to order</Link>
                        <NavLink className="homepage-Btn-3"><FcFaq style={{fontSize:"200%"}}/> FAQ</NavLink>
                    </div>
                </div>
            </div>
            <Store/>
            <Footer/>
        </div>
    )
}

export default Homepage