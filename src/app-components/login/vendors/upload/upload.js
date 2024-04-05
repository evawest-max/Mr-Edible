import React, { useState } from 'react'
import "./upload.css"

export default function VendorUpload() {
    const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [oldAmount, setOldAmount] = useState('');
  const [aboutMeal, setAboutMeal] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleUpload = () => {
    // You can implement the upload functionality here
    console.log("Uploaded file:", file);
    console.log("Name:", name);
    console.log("Amount:", amount);
    console.log("Old Amount:", oldAmount);
    console.log("aboutMeal:", aboutMeal);
    // Reset fields after upload
    setName('');
    setAmount('');
    setOldAmount('');
    setAboutMeal('')
    setFile(null);
  };
  return (
    <div className="vendor-upload-App">
      <h1>Upload Page</h1>
      <div className="vendor-upload-form">
        <label className='vendor-upload-label' htmlFor="upload">Upload Field:</label>
        <input className='vendor-upload-input' type="file" id="upload" onChange={handleFileChange} />

        <label className='vendor-upload-label' htmlFor="name">Name Field:</label>
        <input className='vendor-upload-input' type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

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
