import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './userprofile.css';
import { useNavigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
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

    const deleteuser = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                console.error('Access Token not Available');
                toast.error('Access Token not Available');
                return;
            }
            const response = await axios.delete('http://127.0.0.1:8000/api/user/profiles/detail/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            })
            console.log(response.data);
            setDetails(null);
            toast("Profile Details Deleted Successfull");

        } catch (error) {
            console.error('Error occurred while Deleting data', error);

        }
    }

    useEffect(() => {
        streakdetails();
        fetchUsername();
    }, []);


    return (
        <>
        <ToastContainer />
            <Navbar />
        <div className='userprofile' >
            {/* <div className='profilebackground'>
            </div> */}
            
            <div className="userProfileContainer">

                {details ? (
                    <>
                        <img className="userBackImage" src={`http://127.0.0.1:8000/${details.bg_image}`} alt='' />
                        <div className='containerdd'>
                            <div className='img-cont'>
                                <img className="userProfileImage" src={`http://127.0.0.1:8000/${details.profile_image}`} alt='' />
                                <span className='editbutton' onClick={handleEditButtonClick} style={{ fontSize: '1rem', }}><FaRegEdit fontSize={'1.5rem'} color='red' />
                                </span>
                            </div>
                            <div className='details'>
                                <h2 className="userProfileHeader">{details.owner}</h2>
                                <p className='userProfileDetails'>Date of Birth : <span>{details.dob}</span></p><br></br>
                                <p className="userProfileDetails">Gender: <span>{details.gender}</span></p><br></br>
                                <p className="userProfileDetails">Contact: <span>{details.phone}</span></p><br></br>
                                <p className="userProfileDetails">Total Carbon Emissions: <span>{details.total_carbon_emissions}</span></p><br></br>
                                {streak ? (
                                    <p className="userstreaks">Your Streaks: {streak.current_streak}</p>
                                ) : (
                                    <p className="loadingText">Your Streaks: 0 (Add Food Details For Streak....)</p>
                                )}
                            </div>
                            <div className='delete-profile'>
                                <span style={{ fontSize: '1rem' }}><MdDelete onClick={deleteuser} fontSize={'1.5rem'} color='red' /></span>

                            </div>
                        </div>
                    </>
                ) : (
                    <p className="loadingText">Loading...</p>
                )}
            </div>
        </div>
        </>
    );
}

export default Userprofile;
