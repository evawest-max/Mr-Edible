
import { useRef, useState } from "react";
import VendorCard from "../vendor/vendor-card";
import vendorsdata from "../vendor/vendorDatabase";
import "./navigation.css";
import {AiFillStar} from "react-icons/ai";
// import { useContext } from "react";
// import { Cartcontext } from "../Mr edible store/context folder/appContext"
import { TiArrowDownThick } from "react-icons/ti";
import Footer from "../../footer-components/footer";
// import { FaSearch } from "react-icons/fa";
// import { IoIosStar } from "react-icons/io";

function Vendors(){
    // let cart=useContext(Cartcontext)
    let sortedvendor= vendorsdata.sort( (a,b)=>{
            return b.rating-a.rating
         })
    let [vendor, setvendor]=useState(sortedvendor.map((data, index)=>{
        let star=data.rating===1?<AiFillStar/>:data.rating===2?<div><AiFillStar/><AiFillStar/></div>:data.rating===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:data.rating===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:data.rating===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return(
                
                    <VendorCard key={index} name={data.name} image={data.image} rating={star} about={data.about} vendorPage={data.vendorPage}/>
                
            )
    })
    )
    const inputvalue=useRef()
    function findvendor(){
        let filteredVendor=vendorsdata.filter((vendor, index)=>{
            return vendor.name.toLocaleLowerCase().includes(inputvalue.current.value.toLocaleLowerCase())
        })
        setvendor(filteredVendor.map((data, index)=>{
            let star=data.rating===1?<AiFillStar/>:data.rating===2?<div><AiFillStar/><AiFillStar/></div>:data.rating===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:data.rating===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:data.rating===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return(
                
                    <VendorCard key={index} name={data.name} image={data.image} rating={star} about={data.about} vendorPage={data.vendorPage} />
                
            )
        })
        )
    }
    return(
        <div>
            <div className="vendorContainer">
                <div className="vendorContainer2">
                    <input onChange={findvendor} type="text" placeholder="Search" ref={inputvalue}/>
                    <div className="vendor-instruction-container"><TiArrowDownThick/> click on vendor logo to visit online store</div>
                    <div className="vendor-card-container">
                        {vendor}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Vendors