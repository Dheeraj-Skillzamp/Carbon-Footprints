import React from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from '../Headers&Footers/Headers';

const About = () => {
    return (
       <>
       <ToastContainer />
        <Navbar />
       <div>
        <div>
            <h1>About</h1>
        </div>
       </div>
       </>
    );
}

export default About;
