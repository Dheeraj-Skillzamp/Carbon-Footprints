import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../Headers&Footers/Headers';
import './emissiontips.css';

const Emissiontips = () => {

    const [emissiontips, setEmissiontips] = useState({
        tip_text: '',
    });

    const addemissiontips = async (e) => {
        e.preventDefault();
        try {

            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                console.error('Access Token not Available');
                toast.error('Access Token not Available');
                return;
            }

            const response = await axios.post('http://127.0.0.1:8000/api/admin/emission-tips/', emissiontips, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            if (response.status >= 200 && response.status < 300) {
                console.log('Emission Tips Successfully');
                toast.success('Emission Tips Successfully');
            } else {
                console.log('Emission Tips not Updated');
                toast.error('Emission Tips not Updated');
            }



        } catch (error) {
            console.log("Error Occured while Updating Tips", error);

        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmissiontips({
            ...emissiontips,
            [name]: value,
        });

    }

    return (
        <>
            <ToastContainer />
            <Navbar />
            <div className='emi-head'>
                <h2>Emission Tips</h2>
            </div>
            <div className='tips-container'>
                <div >
                    <label>Add Emission Tips</label>
                    {/* <input
                        type='text'
                        placeholder='Emission Tips'
                        name='tip_text'
                        value={emissiontips.tip_text}
                        onChange={handleChange} /> */}
                        <textarea 
                         type='text'
                         placeholder='Emission Tips'
                         name='tip_text'
                         value={emissiontips.tip_text}
                         onChange={handleChange}/>
                </div>
                
                    <button onClick={addemissiontips}>Submit</button>
                
            </div>
            </>
    );
}

export default Emissiontips;
