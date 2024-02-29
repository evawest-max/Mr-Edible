import React from 'react'
import './overviewTodayCard.css'

export default function OverviewTodayCard(props) {
  return (
    <div id='OverviewTodayCard-container'>
        <h1>{props.number1} {props.number2}</h1>
        <p>{props.text1} {props.text2}</p>
    </div>
  )
}
