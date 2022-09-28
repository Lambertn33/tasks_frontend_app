import React from 'react'
import Navbar from '../../reusable/Navbar';

export default function Wrapper({children}) {
  return (
    <>
    <Navbar />
    <div className='container'>
      <div className='row'>
        {children}
      </div>
    </div>
    </>
  )
}
