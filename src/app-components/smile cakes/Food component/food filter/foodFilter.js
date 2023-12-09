import React, { useState } from 'react'
import "./foodFilter.css"
import {AiFillStar} from "react-icons/ai"
import {FcClearFilters} from "react-icons/fc"
import {FcFilledFilter} from "react-icons/fc"


let displaytoggleCategory=false
let displaytoggleprice=false
let displaytogglestars=false

// window.addEventListener=("click",cancel)
    
function FoodFilter(props) {
    const [displayscategory,changedisplaycategory]=useState({ display:"none"})
    const [displaysprice,changedisplayprice]=useState({ display:"none"})
    const [displaysstars,changedisplaystars]=useState({ display:"none"})
    const [fiterTabButton, changeFilterTabButton]=useState(<div className='fitertab' onClick={openfilter}>Open filter tabs <FcFilledFilter/></div>)
    
    function openfilter(){
        changeFilterTabButton(<div className='fitertab' onClick={closefilter}>Close filter tabs <FcClearFilters/></div>)
            displaytoggleCategory=!displaytoggleCategory
            displaytoggleprice=!displaytoggleprice
            displaytogglestars=!displaytogglestars
            displaytoggleCategory? changedisplaycategory({display:"flex"}):changedisplaycategory({display:"none"})
            displaytoggleprice?changedisplayprice({display:"flex"}):changedisplayprice({display:"none"})
            displaytogglestars?changedisplaystars({display:"flex"}):changedisplaystars({display:"none"})
    }
    function closefilter(){
        changeFilterTabButton(<div className='fitertab' onClick={openfilter}>Open filter tabs <FcFilledFilter/></div>)
        displaytoggleCategory=!displaytoggleCategory
            displaytoggleprice=!displaytoggleprice
            displaytogglestars=!displaytogglestars
            displaytoggleCategory? changedisplaycategory({display:"flex"}):changedisplaycategory({display:"none"})
            displaytoggleprice?changedisplayprice({display:"flex"}):changedisplayprice({display:"none"})
            displaytogglestars?changedisplaystars({display:"flex"}):changedisplaystars({display:"none"})
    }
    
    return (
        <div>
            <div className='foodfilter' >
                <h4 className='fitertab'>{fiterTabButton}</h4>
                <div  className='filter-button-container one'>
                    
                    <div className='one' style={displayscategory} name='category' id='category'>
                        <button  className='filter-left-button' onClick={props.filterbycategoryAll}>All</button>
                        <button className='filter-center-button' onClick={props.filterbycategorySnacks}>Snacks</button>
                        <button className='filter-center-button' onClick={props.filterbycategoryFoods}>Foods</button>
                        <button className='filter-right-button' onClick={props.filterbycategoryDrinks}>Drinks</button>
                    </div>         
                </div>

                <div className='filter-button-container one'>
                    
                    <div style={displaysprice}>
                        <button className='filter-left-button' onClick={props.filterbyprice1000}>₦0-1000</button>
                        <button className='filter-center-button' onClick={props.filterbyprice1000_4000}>₦1,001-4000</button>
                        <button className='filter-right-button'onClick={props.filterbypriceOver4000}>Over ₦4000</button>
                    </div>
                </div>

                <div className='filter-button-container '>
                    
                    <div id='three' style={displaysstars}>
                        <button className='filter-left-star-button' onClick={props.filterbyratings} value={"one star"}><AiFillStar/></button>
                        <button className='filter-center-star-button' onClick={props.filterbyratings2} value={"two stars"}><AiFillStar/><AiFillStar/></button>
                        <button className='filter-center-star-button' onClick={props.filterbyratings3} value={"three stars"}><AiFillStar/><AiFillStar/><AiFillStar/></button>
                        <button className='filter-center-star-button' onClick={props.filterbyratings4} value={"four star"}><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></button>
                        <button className='filter-right-star-button' onClick={props.filterbyratings5} value={"five star"}><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></button>
                    </div>
                </div>
            </div>

            <div className='foodfilter-desktop' >
                <h4 >Filter tab</h4>
                <div  className='filter-button-container-desktop one-desktop'>
                    
                    <div className='one-desktop' name='category' id='category'>
                        <button  className='filter-left-button' onClick={props.filterbycategoryAll}>All</button>
                        <button className='filter-center-button' onClick={props.filterbycategorySnacks}>Snacks</button>
                        <button className='filter-center-button' onClick={props.filterbycategoryFoods}>Foods</button>
                        <button className='filter-right-button' onClick={props.filterbycategoryDrinks}>Drinks</button>
                    </div>         
                </div>

                <div className='filter-button-container-desktop one-desktop'>
                    
                    <div >
                        <button className='filter-left-button-desktop' onClick={props.filterbyprice1000}>₦0-1000</button>
                        <button className='filter-center-button-desktop' onClick={props.filterbyprice1000_4000}>₦1,001-4000</button>
                        <button className='filter-right-button-desktop'onClick={props.filterbypriceOver4000}>Over ₦4000</button>
                    </div>
                </div>

                <div className='filter-button-container-desktop '>
                    
                    <div id='three' >
                        <button className='filter-left-star-button-desktop' onClick={props.filterbyratings} value={"one star"}><AiFillStar/></button>
                        <button className='filter-center-star-button-desktop' onClick={props.filterbyratings2} value={"two stars"}><AiFillStar/><AiFillStar/></button>
                        <button className='filter-center-star-button-desktop' onClick={props.filterbyratings3} value={"three stars"}><AiFillStar/><AiFillStar/><AiFillStar/></button>
                        <button className='filter-center-star-button-desktop' onClick={props.filterbyratings4} value={"four star"}><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></button>
                        <button className='filter-right-star-button-desktop' onClick={props.filterbyratings5} value={"five star"}><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodFilter
