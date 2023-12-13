import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './editprofile.css'
import Navbar from '../Headers&Footers/Headers';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



const Editprofile = () => {

    const [details, setDetails] = useState(null);
    const [updateDetails, setUpdateDetails] = useState({
        gender: '',
        dob: '',
        phone: '',
        profile_image: null,
    });

    const navigate = useNavigate();


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

    useEffect(() => {
        fetchUsername();
    }, []);



  const handleChange = (e, name) => {
    const newValue = name === 'profile_image' ? e.target.files[0] : e.target.value;

    if (name === 'phone' && newValue.length > 10) {
        console.error('Phone number must be 10 digits');
        toast.error('Phone number must be 10 digits');
        return;
    }

    setUpdateDetails(prevDetails => ({
        ...prevDetails,
        [name]: newValue,
    }));
};


    const UpdateProfile = async () => {
        try {

            const userId = details.id;
            const accessToken = localStorage.getItem('accessToken');

            if (!userId || !accessToken) {
                console.error('ID or Access token not available');
                return;
            }
            if (updateDetails.phone !== '' && updateDetails.phone.length !== 10) {
                console.error('Phone number must be 10 digits');
                toast.error('Phone number must be 10 digits');
                return;
            }

            const formData = new FormData();

            if (updateDetails.gender !== '') {
                formData.append('gender', updateDetails.gender);
            }

            if (updateDetails.dob !== '') {
                formData.append('dob', updateDetails.dob);
            }
            if (updateDetails.phone !== '') {
                formData.append('phone', updateDetails.phone);
            }


            if (updateDetails.profile_image !== null) {
                formData.append('profile_image', updateDetails.profile_image);
            }


            const response = await axios.patch(
                `http://127.0.0.1:8000/api/user/profiles/detail/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );

            setUpdateDetails(prevDetails => ({
                ...prevDetails,
                gender: '',
                dob: '',
                phone: '',
                profile_image: null,
            }));

            if (response.status === 200) {
                console.log('Profile Updated successfully....  ');
                toast.success('Profile Updated successfully....  ');
                navigate('/profile');
                fetchUsername();
            } else {
                console.error('Failed to Update Profile');
                toast.error('Failed to Update Profile');
            }
        } catch (error) {
            console.log('Error occurred while updating profile', error);
            toast.error('Error occurred while updating profile', error);
        }
    };


    useEffect(() => {

    }, [updateDetails]);

    return (
        <>
        <ToastContainer />
        <Navbar></Navbar>
            <div className='edit'>
                <div className='profile-container'>
                    <h2>Update Profile</h2>
                    <div>
                        {details ? (
                            <h2 className='owner'>Owner: {details.owner}</h2>
                        ) : (
                            <p className="loadingText">Loading...</p>
                        )}

                        <label className='form-label'>Gender:</label>
                        <input
                            className='form-input'
                            type='text'
                            placeholder='Gender'
                            value={updateDetails.gender}
                            onChange={(e) => handleChange(e, 'gender')}
                        />
                        <label className='form-label'>Date Of Birth:</label>
                        <input
                            className='form-input'
                            type='date'
                            placeholder='DOB'
                            value={updateDetails.dob}
                            onChange={(e) => handleChange(e, 'dob')}
                        />
                        <label className='form-label'>Contact No.:</label>
                        <input
                            className='form-input'
                            type='number'
                            placeholder='phone'
                            value={updateDetails.phone}
                            onChange={(e) => handleChange(e, 'phone')}
                        />
                        <label className='form-label'>Profile Picture</label>
                        <input
                            className='form-input'
                            type='file'
                            onChange={(e) => handleChange(e, 'profile_image')}
                        />
                        <button className='submit-button' onClick={UpdateProfile}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Editprofile;
