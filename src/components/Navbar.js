import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    let navigate=useNavigate();
  return (
    <div className='nav'>
        <p className='navbar-p' onClick={()=>{navigate('/new-expense')}}>Add expense</p>
        <p className='navbar-p' onClick={()=>{navigate('/history')}}>History</p>
        <p className='navbar-p' onClick={()=>{navigate('/balance')}}>Balance</p>
    </div>
  )
}

export default Navbar