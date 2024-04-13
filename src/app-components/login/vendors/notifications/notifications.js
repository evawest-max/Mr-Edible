import React, { useState } from 'react'
import "./notifications.css"

export default function VendorNotifications() {
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'New user registered' },
        { id: 2, message: 'Server maintenance scheduled' },
        { id: 3, message: 'Pending delevery request' },
      ]);
    
      return (
        <div className="App">
          <header className="App-header">
            <h1>Vendor Notification Page</h1>
          </header>
          <div className="notification-container">
            <h2>Notifications</h2>
            <ul className="notification-list">
              {notifications.map(notification => (
                <li key={notification.id}>{notification.message}</li>
              ))}
            </ul>
          </div>
        </div>
      );
}
