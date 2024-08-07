import React from 'react'
import "./contactPage.css"

export default function Contactpage() {
  return (
    <div>
        <h1>Contact Us</h1>
        <form>
            <input type='text' placeholder='name'/>
            <input type='text' placeholder='email'/>
            <textarea placeholder='message'/>
            <input type='submit' placeholder='submit' value='submit'/>
        </form>
    </div>
  )
}
