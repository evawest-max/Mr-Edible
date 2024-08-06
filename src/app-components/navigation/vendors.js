
import { useRef, useState } from "react";
// import vendorsdata from "../component/vendor/vendorDatabase";
import "./navigation.css";
import {AiFillStar} from "react-icons/ai";
// import { useContext } from "react";
// import { Cartcontext } from "../Mr edible store/context folder/appContext"
import { TiArrowDownThick } from "react-icons/ti";
import Footer from "../component/footer-components/footer";
import VendorCard from "../component/vendor-component/vendor-card";
import { getDatabase, onValue, ref } from "firebase/database";
// import { FaSearch } from "react-icons/fa";
// import { IoIosStar } from "react-icons/io";

function Vendors(){
    // let cart=useContext(Cartcontext)
    let sortedvendor=[]
    let vendorsData=JSON.parse(localStorage.getItem("vendors"))
    function loadvendors(){
        vendorsData=JSON.parse(localStorage.getItem("vendors"))
        sortedvendor= Object.values(vendorsData).filter(item => item.accountType==='vendor' )  
    }
    localStorage.getItem("vendors")&& loadvendors()
    
    

    let [vendor, setvendor]=useState(sortedvendor.map((data, index)=>{
        let star=data.rating===1?<AiFillStar/>:data.rating===2?<div><AiFillStar/><AiFillStar/></div>:data.rating===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:data.rating===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:data.rating===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
        // if (!localStorage.getItem(data.bussiness_name)) {
        //     localStorage.setItem(data.bussiness_name, JSON.stringify([]))
        // }    
        return(
                
                    <VendorCard key={index} name={data.bussiness_name} image={data.passport} rating={star} about={data.about} vendorPage={data.vendorPage}/>
                
            )
    })
    )
    const inputvalue=useRef()
    function findvendor(){
        let filteredVendor=sortedvendor.filter((vendor, index)=>{
            return vendor.bussiness_name.toLocaleLowerCase().includes(inputvalue.current.value.toLocaleLowerCase())
        })
        sortedvendor.length>0 ? setvendor(filteredVendor.map((data, index)=>{
            let star=data.rating===1?<AiFillStar/>:data.rating===2?<div><AiFillStar/><AiFillStar/></div>:data.rating===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:data.rating===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:data.rating===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return(
                
                    <VendorCard key={index} name={data.bussiness_name} image={data.passport} rating={star} about={data.about} vendorPage={data.vendorPage} storeStatus={data.store_status} address={data.address} email={data.email} phonenumber={data.phonenumber}/>
                
            )
        })
        ): alert("No vendors yet, please check back later. Thank you")
    }
    const db = getDatabase();
    const starCountRef = ref(db, 'users/vendors');
    onValue(starCountRef, (snapshot) => {
        let list=[]
        const data = snapshot.val();
        for (const key in data) {
            const element = data[key];
                if(element.accountType==="vendor"){
                    list.push(data)
                    localStorage.setItem('vendors',JSON.stringify(list[0]));
                    showResentlyAddedVendor()
                }
        }
    });

    function showResentlyAddedVendor(){
        loadvendors()

        setvendor(sortedvendor.map((data, index)=>{
            let star=data.rating===1?<AiFillStar/>:data.rating===2?<div><AiFillStar/><AiFillStar/></div>:data.rating===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:data.rating===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:data.rating===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            // if (!localStorage.getItem(data.bussiness_name)) {
            //     localStorage.setItem(data.bussiness_name, JSON.stringify([]))
            // }    
            return(
                    
                        <VendorCard key={index} name={data.bussiness_name} image={data.passport} rating={star} about={data.about} vendorPage={data.vendorPage}/>
                    
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