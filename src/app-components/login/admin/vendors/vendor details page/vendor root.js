import React from 'react'
import { Outlet } from 'react-router-dom'
import VendorCards from '../../components/vendor cards/vendor cards'

export default function VendorRoot() {
  return (
    <div >
        {/* <VendorCards/> */}

        <div>
            <Outlet/>
        </div>
    </div>
  )
}
