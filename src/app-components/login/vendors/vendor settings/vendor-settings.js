import React, { useRef, useState } from 'react'
import "./vendor-settings.css"
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { deleteObject, getDownloadURL, getStorage, ref as storageRef, uploadBytes} from 'firebase/storage';

export default function VendorSettings() {
  // Define state variables for each setting
  const [vendorname, setUsername] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [phoneNumber, setPhoneNUmber] = useState('');
  const [deliveryFee, setDeliveryFee] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    // You can implement logic to update settings here

    if(isAdmin){
      const db=getDatabase();
      const postData={
        last_profile_update:new Date().toLocaleString(),
        accountName:vendorname,
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
      setTimeout(() => { 
        setUsername('');
        setAboutUs('');
        setPhoneNUmber('');
        setDeliveryFee('')
        setIsAdmin(null);
      }, 5000);
    }else{alert("check the box first")}
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
    <div className="admin-settings">
      <h1>Vendor Settings</h1>
      <div className='passport_update'>
        <img src={userimageurl} alt='user'/>
        <div>
          <p>upload a new photo</p>
          <input ref={passportref}  type='file' accept='image/*' onChange={(e)=>setfile(e.target.files[0])}/><br/>
        <button id='update-photo-button' onClick={updatePhoto}>{uploadButton}</button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Vendor name:</label>
          <input type="text" id="username" value={vendorname} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="aboutus">Abouut us:</label>
          <textarea id="aboutus" value={aboutUs} onChange={(e) => setAboutUs(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="Phonenumber">Phone number:</label>
          <input type="number" id="phonenumber" value={phoneNumber} onChange={(e) => setPhoneNUmber(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Delivery fee:</label>
          <input type="number" id="number" value={deliveryFee} onChange={(e) => setDeliveryFee(e.target.value)} />
        </div>
        <div className="form-group">
          <p htmlFor="isAdmin">check the box:</p>
          <input type="checkbox" id="isAdmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  )
}
