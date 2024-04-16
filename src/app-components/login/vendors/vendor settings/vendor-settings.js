import React, { useRef, useState } from 'react'
import "./vendor-settings.css"
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { deleteObject, getDownloadURL, getStorage, ref as storageRef, uploadBytes} from 'firebase/storage';
import VendorShopToggleSwitch from '../components/vendor shop toggle switch/vendorShopToggleSwitch';


export default function VendorSettings() {
  // Define state variables for each setting
  const [vendorname, setUsername] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [phoneNumber, setPhoneNUmber] = useState('');
  const [deliveryFee, setDeliveryFee] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [buttonState, setButtonstate]=useState("Save")

  function submit(sub){
    sub&&setButtonstate("Loading...")
    !sub&&setButtonstate("Save")
  }

  // Function to handle form submission
  const handleSubmit = async(e) => {
    submit(true)
    e.preventDefault();
    // You can implement logic to update settings here

    if(isAdmin){
      if(vendorname.length>1 && aboutUs.length>1&& phoneNumber.length>1&& deliveryFee.length>1){
        const db=getDatabase();
        const postData={
          last_profile_update:new Date().toLocaleString(),
          name:vendorname,
          aboutUs:aboutUs,
          deliveryFee:deliveryFee,
          phonenumber:phoneNumber
        }
        await update (ref(db,"users/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).id ), postData).then(() => {  
          alert('Update successful')
        })
        .catch((error)=>{
          alert(error)
        })

        // Reset fields after upload
        submit(false)
        setTimeout(() => { 
          setUsername('');
          setAboutUs('');
          setPhoneNUmber('');
          setDeliveryFee('')
          setIsAdmin(null);
        }, 5000);
      }else if(vendorname.length>1 && aboutUs.length===0&& phoneNumber.length===0&& deliveryFee.length===0){
        const db=getDatabase();
        const postData={
          last_profile_update:new Date().toLocaleString(),
          name:vendorname,
        }
        await update (ref(db,"users/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).id ), postData).then(() => {  
          alert('Update successful')
        })
        .catch((error)=>{
          alert(error)
        })

        // Reset fields after upload
        submit(false)
        setTimeout(() => { 
          setUsername('');
          setIsAdmin(null);
        }, 5000);
      }else if(vendorname.length===0 && aboutUs.length>1&& phoneNumber.length===0&& deliveryFee.length===0){
        const db=getDatabase();
        const postData={
          last_profile_update:new Date().toLocaleString(),
          aboutUs:aboutUs,
        }
        await update (ref(db,"users/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).id ), postData).then(() => {  
          alert('Update successful')
        })
        .catch((error)=>{
          alert(error)
        })

        // Reset fields after upload
        submit(false)
        setTimeout(() => { 
          setAboutUs('');
          setIsAdmin(null);
        }, 5000);
      }else if(vendorname.length===0 && aboutUs.length===0&& phoneNumber.length>1&& deliveryFee.length===0){
        const db=getDatabase();
        const postData={
          last_profile_update:new Date().toLocaleString(),
          phonenumber:phoneNumber,
        }
        await update (ref(db,"users/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).id ), postData).then(() => {  
          alert('Update successful')
        })
        .catch((error)=>{
          alert(error)
        })

        // Reset fields after upload
        submit(false)
        setTimeout(() => { 
          setPhoneNUmber('');
          setIsAdmin(null);
        }, 5000);
      }else if(vendorname.length===0 && aboutUs.length===0&& phoneNumber.length===0&& deliveryFee.length>1){
        const db=getDatabase();
        const postData={
          last_profile_update:new Date().toLocaleString(),
          deliveryFee:deliveryFee,
        }
        await update (ref(db,"users/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).id ), postData).then(() => {  
          alert('Update successful')
        })
        .catch((error)=>{
          alert(error)
        })

        // Reset fields after upload
        submit(false)
        setTimeout(() => { 
          setDeliveryFee('');
          setIsAdmin(null);
        }, 5000);
      }else{
        submit(false)
        alert("You can only update all fields or just one field ");
        setUsername('');
        setAboutUs('');
        setPhoneNUmber('');
        setDeliveryFee('')
        setIsAdmin(null);
      }
    }else{alert("check the box first");setButtonstate("Save")}
  };

  // listen for changes in the database
  const db = getDatabase();
  const userdataref = ref(db, 'users/'+JSON.parse(localStorage.getItem('mredibleloggedinUser')).id);
  onValue (userdataref,(snapshot) => {
    const data = snapshot.val();
    localStorage.setItem('mredibleloggedinUser', JSON.stringify(data))
  });

  const [file, setfile]=useState()
    const [uploadButton, setuploadbutton]=useState("UPLOAD")
    const [userimageurl,setuserimageurl]=useState("")
    let passportref=useRef()
    
    async function updatePhoto(){
      if(isAdmin){
      setuploadbutton("Uploading");
        const storage= storageRef(getStorage(), `customer passport/ ${JSON.parse(localStorage.getItem('mredibleloggedinUser')).id}`)
        await deleteObject(storage).then(() => {
          // File deleted successfully
          uploadBytes(storage, file).then((snapshot) => {
          // console.log(snapshot.metadata.timeCreated)
          getDownloadURL(storageRef(getStorage(), `customer passport/${JSON.parse(localStorage.getItem('mredibleloggedinUser')).id}`))
            .then((url) => {
              // `url` is the download URL for 'images/stars.jpg'
              setuserimageurl(url)
              alert('Uploaded');
              // console.log(url)
              
            })
            .catch((error) => {
              // Handle any errors
              alert(error)
            });
        });
        }).catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error)
        });
        
        setuploadbutton("UPLOAD")
        setIsAdmin(null)
      }else{alert("check the box first");setuploadbutton("UPLOAD")}
    }

    const storage = getStorage();
      getDownloadURL(storageRef(storage, `customer passport/ ${JSON.parse(localStorage.getItem('mredibleloggedinUser')).id}`))
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'
          setuserimageurl(url)
          // console.log(url)
          
        })
        .catch((error)=>{
          alert(error)
          setuserimageurl("https://robohash.org/fghj")
        })

  return (
    <div className="vendor-settings">
      {/* <h1 id='vendor -heading'>Vendor Settings</h1> */}
      <div>
        <div>
          <VendorShopToggleSwitch/>
        </div>
        <div id='vendor-passport_update'>
          <img src={userimageurl} alt='user'/>
          <div>
            <p>upload a new photo</p>
            <input ref={passportref}  type='file' accept='image/*' onChange={(e)=>setfile(e.target.files[0])}/><br/>
            <div className="form-group">
              <p htmlFor="isAdmin"><input type="checkbox" id="isAdmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} /> check the box </p>   
            </div>
          <button id='Vendor-update-photo-button' onClick={updatePhoto}>{uploadButton}</button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Vendor name:</label>
          <input type="text" id="username" value={vendorname} placeholder='John Smith' onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="aboutus">Abouut us:</label>
          <textarea value={aboutUs} placeholder='We are.....' onChange={(e) => setAboutUs(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="Phonenumber">Phone number:</label>
          <input type="number" id="phonenumber" value={phoneNumber} placeholder='0803*******' onChange={(e) => setPhoneNUmber(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="Delivery fee">Delivery fee:</label>
          <input type="number" id="number" value={deliveryFee} placeholder='1000' onChange={(e) => setDeliveryFee(e.target.value)} />
        </div>
        <div className="form-group">
          <p htmlFor="isAdmin"><input type="checkbox" id="isAdmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} /> check the box </p>   
        </div>
        <button id='vendor-update-btn' type="submit" onClick={submit}>{buttonState}</button>
      </form>
    </div>
  )
}
