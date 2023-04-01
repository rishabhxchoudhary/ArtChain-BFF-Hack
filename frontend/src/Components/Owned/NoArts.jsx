import React from 'react'
import stressed from '../../Assets/stressed.png'
import './NoArts.css'

const NoArts = () => {
  return (
    <div className='flex flex-col '>
    <div className="vector">
       
    <img src={stressed}/>
    <h2><strong>You have no owned Arts</strong> 🥲</h2>
    <p>You currently have no art in you collection please select a valid option to move further</p>
</div>
<div class="btn">
    <ul class="flex">
        <li><a href="#"> Buy Art</a></li>
        <li><a href="#"> Create Art</a></li>
    </ul>
</div>
    </div>
  )
}

export default NoArts