import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './userprofile.css';
import { useNavigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import Navbar from '../Headers&Footers/Headers';
import { ToastContainer, toast } from 'react-toastify';

const Userprofile = () => {
    const [details, setDetails] = useState(null);
    const [streak, setStreak] = useState('');

    const navigate = useNavigate();

    const handleEditButtonClick = () => {
        navigate('/profile/edit-profile');

    };

    const fetchUsername = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                console.error('Access token not available');
                toast.error('Access token not available');
                return;
            }

            const response = await axios.get("http://127.0.0.1:8000/api/user/profiles/detail/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            setDetails(response.data);
            console.log("profile", response.data);

        } catch (error) {
            console.error('Error occurred while fetching data', error);
            toast.error('Error occurred while fetching data', error);
        }
    }

    const streakdetails = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                console.error('Access Token not Available');
                toast.error('Access Token not Available');
                return;
            }

            const response = await axios.get("http://127.0.0.1:8000/api/user/daily-streak/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            setStreak(response.data);
            console.log("streak", response.data);
        } catch (error) {
            console.error('Error occurred while fetching streak', error);
        }
    };

    // const deleteuser = async () =>{
    //     try{
    //         const accessToken = localStorage.getItem('accessToken');

    //         if (!accessToken) {
    //             console.error('Access Token not Available');
    //             toast.error('Access Token not Available');
    //             return;
    //         }
    //         const response = await axios.delete('http://127.0.0.1:8000/api/user/profiles/detail/',{
    //             headers : {
    //                 'Content-Type':'application/json',
    //                 'Authorization':`Bearer ${accessToken}`,
    //             },
    //         })
            

    //     }catch (error){
    //         console.error('Error occurred while Deleting data', error);

    //     }
    // }


    useEffect(() => {
        streakdetails();
        fetchUsername();
    }, []);


    return (
        <>
    <ToastContainer />
            <Navbar></Navbar>
            <div className="userProfileContainer">

                {details ? (
                    <>
                        <div className='user'>
                            <h2 className="userProfileHeader">Owner: {details.owner}</h2>
                        </div>
                        <div className='containerdd'>
                            <div className='img-cont'>
                                <img className="userProfileImage" src={`http://127.0.0.1:8000/${details.profile_image}`} alt='' />
                            </div>
                            <div className='details'>
                                <p className='userProfileDetails'>Date of Birth : {details.dob}</p>
                                <p className="userProfileDetails">Gender: {details.gender}</p>
                                <p className="userProfileDetails">Contact: {details.phone}</p>
                                <p className="userProfileDetails">Total Carbon Emissions: {details.total_carbon_emissions}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="loadingText">Loading...</p>
                )}

                {streak ? (
                    <p className="userstreaks">Your Streaks: {streak.current_streak}</p>
                ) : (
                    <p className="loadingText">Loading streak...</p>
                )}


                <button onClick={handleEditButtonClick} style={{fontSize:'1rem'}}>Edit Profile &emsp;<FaRegEdit fontSize={'1.5rem'}/></button>

                {/* <button onClick={deleteuser}>Delete Profile</button> */}

            </div>

        </>
    );
}

export default Userprofile;
