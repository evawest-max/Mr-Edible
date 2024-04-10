import React, { useState } from 'react'
import "./upload.css"
import { child, getDatabase, push, ref, update } from 'firebase/database';
import { getStorage, ref as  storageRef, uploadBytes } from 'firebase/storage';

export default function VendorUpload() {
    const [foodName, setFoodName] = useState('');
  const [amount, setAmount] = useState('');
  const [oldAmount, setOldAmount] = useState('');
  const [aboutMeal, setAboutMeal] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const files = e.target.files[0];
    setFile(files);
    console.log(files)
  };

  const handleUpload = async () => {
    const db=getDatabase()
    const newPostKey = push(child(ref(db), 'posts')).key;
    console.log(newPostKey)
    const postData={
      id:newPostKey,
      name:foodName,
      passport:"food image/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).name+"/"+newPostKey,
      amount:amount,
      oldAmount:oldAmount,
      aboutMeal:aboutMeal
    }
    await update (ref(db,"food items/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).name+"/"+newPostKey, ), postData).then(() => {
      
      console.log('Update success')
    })
    const storage=getStorage();
    const serverimageref= storageRef(storage, "food image/"+JSON.parse(localStorage.getItem('mredibleloggedinUser')).name+"/"+newPostKey)
    await uploadBytes(serverimageref, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).catch((error)=>{console.log(error)});



    // You can implement the upload functionality here
    console.log("Uploaded file:", file);
    console.log("Name:", foodName);
    console.log("Amount:", amount);
    console.log("Old Amount:", oldAmount);
    console.log("aboutMeal:", aboutMeal);
    // Reset fields after upload
    setFoodName('');
    setAmount('');
    setOldAmount('');
    setAboutMeal('')
    setFile(null);
  };
  return (
    <div className="vendor-upload-App">
      <h1>Upload Page</h1>
      <div className="vendor-upload-form">
        <label className='vendor-upload-label' htmlFor="upload">Upload Photo Field:</label>
        <input className='vendor-upload-input' type="file" id="upload" onChange={handleFileChange} />

        <label className='vendor-upload-label' htmlFor="name">Name Field:</label>
        <input className='vendor-upload-input' type="text" id="name" value={foodName} onChange={(e) => setFoodName(e.target.value)} />

        <label className='vendor-upload-label' htmlFor="amount">Amount Field:</label>
        <input className='vendor-upload-input' type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

        <label className='vendor-upload-label' htmlFor="oldAmount">Old Amount Field:</label>
        <input className='vendor-upload-input' type="number" id="oldAmount" value={oldAmount} onChange={(e) => setOldAmount(e.target.value)} />

        <label className='vendor-upload-label' htmlFor="aboutmeal">About meal:</label>
        <textarea className='vendor-upload-input' id="aboutmeal" value={aboutMeal} onChange={(e) => setAboutMeal(e.target.value)} />

        <button className='vendor-upload-button' onClick={handleUpload}>Upload</button>
      </div>
    </div>
  )
}
