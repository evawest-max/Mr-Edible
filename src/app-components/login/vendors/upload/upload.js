import React, { useState } from 'react'
import "./upload.css"
import { child, getDatabase, push, ref, update } from 'firebase/database';
import { getStorage, ref as  storageRef, uploadBytes } from 'firebase/storage';

export default function VendorUpload() {
    const [foodName, setFoodName] = useState('');
  const [amount, setAmount] = useState('');
  const [oldAmount, setOldAmount] = useState('');
  const [aboutMeal, setAboutMeal] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [file, setFile] = useState(null);
  

  const handleFileChange = (e) => {
    const files = e.target.files[0];
    setFile(files);
    console.log(files)
  };

  const handleUpload = async () => {
    if(isAdmin){
      const db=getDatabase()
      const newPostKey = push(child(ref(db), 'posts')).key;
      console.log(newPostKey)
      const postData={
        id:newPostKey,
        availability:true,
        name:foodName,
        passport:"food image/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).name+"/"+newPostKey,
        amount:amount,
        oldAmount:oldAmount,
        aboutMeal:aboutMeal,
        upload_date:new Date().toLocaleString(),
      }
      await update (ref(db,"food items/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).name+"/"+newPostKey, ), postData).then(() => {
        
        console.log('Update success')
      })
      const storage=getStorage();
      const serverimageref= storageRef(storage, "food image/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).name+"/"+newPostKey)
      await uploadBytes(serverimageref, file)
      .then((snapshot) => {
        alert('Upload Successfull');
      })
      .catch((error)=>{console.log(error)});

      // Reset fields after upload
      setTimeout(() => { 
        setFoodName('');
        setAmount('');
        setOldAmount('');
        setAboutMeal('')
        setFile(null);
        setIsAdmin(null);
      }, 5000);
    }else{alert("check the box first")}
  };
  // const [buttonState, setButtonstate]=useState(<button className='vendor-upload-button' onClick={handleUpload}>Upload</button>)
  return (
    <div className="vendor-upload-App">
      <h1>Upload Food item</h1>
      <div className="vendor-upload-form">
        <label className='vendor-upload-label' htmlFor="upload">Upload Photo Field:</label>
        <input className='vendor-upload-input' type="file" id="upload" onChange={handleFileChange} />

        <label className='vendor-upload-label' htmlFor="name">Food Name Field:</label>
        <input className='vendor-upload-input' type="text" id="name" value={foodName} onChange={(e) => setFoodName(e.target.value)} />

        <label className='vendor-upload-label' htmlFor="amount">Amount Field:</label>
        <input className='vendor-upload-input' type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

        <label className='vendor-upload-label' htmlFor="oldAmount">Old Amount Field:</label>
        <input className='vendor-upload-input' type="number" id="oldAmount" value={oldAmount} onChange={(e) => setOldAmount(e.target.value)} />

        <label className='vendor-upload-label' htmlFor="aboutmeal">About meal:</label>
        <textarea className='vendor-upload-input' id="aboutmeal" value={aboutMeal} onChange={(e) => setAboutMeal(e.target.value)} />

        <div className="form-group">
          <p htmlFor="isAdmin">check the box:</p>
          <input type="checkbox" id="isAdmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
        </div>
        
        <button className='vendor-upload-button' onClick={handleUpload}>Upload</button>
      </div>
    </div>
  )
}
