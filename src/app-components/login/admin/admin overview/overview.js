import React from 'react'
import "./overview.css"
import AssetCards from '../components/asset cards/assetCards'
import OverviewTodayCard from '../components/overviewtoday card/overviewTodayCard'
import LineChart from '../components/line chart/lineChart'
import { FaHome } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { HiMiniUsers } from "react-icons/hi2";

export default function Overview() {
  return (
    <div id='admin-container-overview'>
       <div id='first-overview-container'>
            <div id='admin-asset-overview'>
                <div>
                    <h3>Assets</h3>
                    <div id='asset-card-main-container'>
                        <AssetCards home=<FaHome />numb1="783" properties="Properties"/>
                        <AssetCards pic=<IoPersonSharp /> numb2="562" landlords="Landlords"/>
                        <AssetCards pic2= <HiMiniUsers/> numb3="3,674" tenants="Tenants"/>
                    </div>
                </div>
            </div>
            <div id='overview-today-container'>
                <h3>Overview today</h3>
                <div id='today-first-card-container'>
                    <h1><FaHome /></h1>
                    <div>
                        <h2>49</h2>
                        <p>New Property Added</p>
                    </div>
                </div>
                <div id='today-second-card-container'>
                    <OverviewTodayCard number1="16" text1="New Landloads"/>
                    <OverviewTodayCard number2="25" text2="New Tenants"/>
                </div>
            </div>
       </div> 
        <LineChart/>
    </div>
  )
}
