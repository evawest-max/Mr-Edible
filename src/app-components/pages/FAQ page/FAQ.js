import React, { useState } from 'react'
import "./FAQ.css"

export default function Faq() {
    const [question1, setQuestion1]=useState(false)
    const [question2, setQuestion2]=useState(false)
    const [question3, setQuestion3]=useState(false)
    const [question4, setQuestion4]=useState(false)
    const [question5, setQuestion5]=useState(false)
    
  return (
    <div id='FAQ-section'>
        <div id='faq-title'>
            <h1> Frequently Asked Questions</h1>
            <p>Got Questions? We've got answers</p>
        </div>
        <div id='FAQ-question-container'>
            <div id='FAQ-question-and-answer'>
                <h4 onClick={()=>{question1?setQuestion1(false):setQuestion1(true)}}>How do i get my money back if the food was not delivered? <span> </span> </h4>
                {question1?<p>You can always request for refund if your item was not delivered
                 by clicking on item was not delivered and the money will be sent back to your
                  registerd account with 3 working days. else you can send us an email
                   with your transaction refrence number and item number with subject as
                    request for refund to surport@mredible.com
                </p>:""}
            </div>
            <div id='FAQ-question-and-answer'>
                <h4 onClick={()=>{question2?setQuestion2(false):setQuestion2(true)}}>Can i convert my points to Cash? </h4>
                {question2?<p>yes, you can convert your points to cash only when you have gotten up to 2000 Edible points</p>:""}
            </div>
            <div id='FAQ-question-and-answer'>
                <h4 onClick={()=>{question3?setQuestion3(false):setQuestion3(true)}}>How how long does it take for a food item to be delivered? </h4>
                {question3?<p>Within 15 mins to 1hour depending to your location.
                </p>:""}
            </div>
            <div id='FAQ-question-and-answer'>
                <h4 onClick={()=>{question4?setQuestion4(false):setQuestion4(true)}}>can my edible points be transfered? </h4>
                {question4?<p>NO! your can only use your edible points to buy on the app or pay bills.
                </p>:""}
            </div>
            <div id='FAQ-question-and-answer'>
                <h4 onClick={()=>{question5?setQuestion5(false):setQuestion5(true)}}>How do i register as a vendor? <span> </span> </h4>
                {question5?<p>
                    <ol>
                        <li>
                            Click on SIgnin
                        </li>
                        <li>
                            Click on vendor
                        </li>
                        <li>
                            Fill in your details, check the box and submit
                        </li>
                        <li>
                            A confirmation link will be sent to your email.
                             Click on the link to activate your account
                        </li>
                    </ol>
                </p>:""}
            </div>
        </div>
    </div>
  )
}
