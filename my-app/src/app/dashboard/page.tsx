import React from 'react'
import './page.css'

// import Component Layout
import Layoutbar from './Layout/layoutbar'
import Layoutfooter from './Layout/layoutfooter'

export default function page() {
  return (
    <>
      <div className='mb-10'>
        <Layoutbar />
      </div>
           
      <Layoutfooter />
    </>
  )
}
