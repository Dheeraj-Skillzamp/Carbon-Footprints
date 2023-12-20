import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FcManager } from "react-icons/fc";
import './Registraion.css';
import { ToastContainer, toast } from 'react-toastify';

const Registration = () => {
    const [showOTP, setShowOTP] = useState(false);
    const [data, setData] = useState({
        email: '',
    });
    const [otp, setOtp] = useState({
        otp: '',
    });
    const [registrationError, setRegistrationError] = useState('');
    const [loadingVerifyOTP, setLoadingVerifyOTP] = useState(false);
    const [otpSentSuccessfully, setOtpSentSuccessfully] = useState(false);
    const [loadingSendOTP, setLoadingSendOTP] = useState(false);
    const [loadingResendOTP, setloadingResendOTP] = useState(false);
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
        setRegistrationError('');
    };

    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setOtp({
            ...otp,
            [name]: value,
        });
    };

    const headers = {
        'Content-Type': 'application/json',
    };

    // API for Registration

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoadingSendOTP(true);
            const response = await axios.post('http://127.0.0.1:8000/api/user/register/', data, { headers });

            if (response.status >= 200 && response.status < 300) {
                console.log("OTP Sent Successfully");
                toast.success("OTP Sent Successfully");
                setShowOTP(true);
                setOtpSentSuccessfully(true);
            } else if (response.status === 400) {
                console.log("Email is already registered");
                toast.error("Email is already registered");
                setRegistrationError('Email is already registered');
            } else {
                console.log('Registration Failed. Try Again');
                toast.error('Registration Failed. Try Again');
            }
        } catch (error) {
            console.log('Registration Failed. Try Again', error);
            toast.error('Enter Correct Email Id', error);
        } finally {
            setLoadingSendOTP(false);
        }
    };
    // API for Verfiying OTP

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            setLoadingVerifyOTP(true);
            const response = await axios.post('http://127.0.0.1:8000/api/user/verify-otp/', {
                email: data.email,
                otp: otp.otp,
            }, { headers });

            if (response.status === 200 && response.data.message === 'OTP verified successfully') {
                console.log("OTP Verified");
                toast.success("OTP Verified");

                const newAccessToken = response.data.access_token;
                setAccessToken(newAccessToken);
                localStorage.setItem('accessToken', newAccessToken);
                const userToken = localStorage.setItem('userRole', 'user')
                navigate('/dashboard');
            } else {
                console.log("OTP verification failed");
                toast.error("OTP verification failed");
            }
        } catch (error) {
            console.log('OTP Verification Failed. Try Again', error);
            toast.error('OTP Verification Failed. Try Again', error);
        } finally {
            setLoadingVerifyOTP(false);
        }
    };

    //API for Re-Send OTP
    const handleResendOTP = async () => {
        try {
            setloadingResendOTP(true);
            const response = await axios.post('http://127.0.0.1:8000/api/user/resend-otp/', data, { headers });

            if (response.status === 200) {
                console.log("OTP Resent Successfully");
                toast.success("OTP Resent Successfully");
                setOtpSentSuccessfully(true);
            } else {
                console.log("Error resending OTP");
                toast.error("Error resending OTP");
            }
        } catch (error) {
            console.log('Error resending OTP', error);
            toast.error('Error resending OTP', error);
        } finally {
            setloadingResendOTP(false);
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className='mainn-container'>
                <div className='form-container'>
                    <div>
                        <div className='iconn'>
                            <FcManager fontSize={'8rem'} />
                        </div>
                        <h2>User Registration</h2>
                        <div >
                            <label>E-mail :</label>
                            <input
                                className='in-email'
                                placeholder='Enter your Email'
                                name='email'
                                onChange={handleChange} ></input>
                            <button onClick={handleSubmit} disabled={loadingSendOTP}>
                                {loadingSendOTP ? 'Sending OTP...' : (otpSentSuccessfully ? 'OTP Sent Successfully!' : 'Send OTP')}
                            </button>
                            {registrationError && <p className="error-message">{registrationError}</p>}
                        </div>

                        {showOTP && (
                            <div className={`otp-container ${showOTP ? 'show' : 'hide'}`}>
                                <label>Enter OTP :</label>
                                <input
                                    placeholder='OTP'
                                    name='otp'
                                    onChange={handleChange1}  ></input>
                                <button className='verify-btn' onClick={handleVerifyOTP} disabled={loadingVerifyOTP}>
                                    {loadingVerifyOTP ? 'Verifying...' : 'Verify OTP'}
                                </button>
                                <button className='resend-btn' onClick={handleResendOTP} disabled={loadingResendOTP}>
                                    {loadingResendOTP ? 'Resending OTP...' : 'Resend OTP'}
                                </button>
                            </div>
                        )}
                        <div className="already-registered-container">
                            <Link to="/login">
                                <p>Already registered? </p>
                            </Link>
                            <Link to="/admin">
                                <p>Admin Login</p>
                            </Link>
                        </div>
                        {/* <div className='admin-login'>
                            <Link to="/admin">
                                <p>Admin Login</p>
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
