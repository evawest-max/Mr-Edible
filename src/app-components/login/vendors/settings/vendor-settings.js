import React, { useState } from 'react'
import "./vendor-settings.css"

export default function VendorSettings() {
  // Define state variables for each setting
  const [vendorname, setUsername] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [phoneNumber, setPhoneNUmber] = useState('');
  const [deliveryFee, setDeliveryFee] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement logic to update settings here
    console.log('Username:', vendorname);
    console.log('Email:', aboutUs);
    console.log('Phone number:', phoneNumber);
    console.log('Password:', deliveryFee);
    console.log('Is Admin:', isAdmin);
  };
  return (
    <div className="admin-settings">
      <h1>Vendor Settings</h1>
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
          <input type="email" id="phonenumber" value={phoneNumber} onChange={(e) => setPhoneNUmber(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Delivery fee:</label>
          <input type="number" id="number" value={deliveryFee} onChange={(e) => setDeliveryFee(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="isAdmin">Is Vendor:</label>
          <input type="checkbox" id="isAdmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  )
}
