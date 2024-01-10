import React from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from '../Headers&Footers/Headers';
import './userEmail.css'
const UserEmail = () => {
    return (
      <>
      <ToastContainer/>
      <Navbar/>
      <div>
        <div className='email-data'>
            <h2>Email Data</h2>
        </div>
      </div>
      </>
    );
}

export default UserEmail;
