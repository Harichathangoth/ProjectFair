import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'


function Profile() {

    const [open, setOpen] = useState(false);


  return (
    <div className='card shadow p-5 mt-5 me-2 mb-2'>
        <div className="d-flex justify-content-between">
            <h1>Profile</h1>
            <button onClick={() => setOpen(!open)} className='btn btn-outline-info'><i class="fa-solid fa-angle-down"></i></button>
        </div>
         <Collapse in={open}>
            {/* Upload Profile Picture */}
         <div className="row justify content center mt-3">
            <label>
                <input type="file" style={{display:'none'}}/>
                <img width={{width:'100px',height:'200px'}} src="https://imgs.search.brave.com/rCGeCHKkSE_s7ZwRS5VCQTKqCRaHgeLl4QYksqIjGws/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8zMTM1LzMxMzU3/MTUucG5n" alt="" />
            </label>
            <div className='mt-3'>
                <input type="text" className='form-control' placeholder='Github'/>
                <input type="text" className='form-control mt-2' placeholder='Linkedin'/>
            </div>
            <div className='mt-3 text-align-center d-grid'>
                <button className='btn btn-warning d-grid'>Update</button>
            </div>
            </div>
         </Collapse>
    </div>
  )
}

export default Profile