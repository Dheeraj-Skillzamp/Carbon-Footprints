import React, { useEffect, useState } from 'react';
import Navbar from '../Headers&Footers/Headers';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import './foodgoal.css';
import {  useNavigate } from 'react-router-dom';

const Goaldetails = () => {
    const [getgoal, setGetgoal] = useState();

    // const [setgoal, setSetgoal] = useState({
    //     diesel_goal: '',
    //     electricity_goal: '',
    //     food_goal: '',
    //     petrol_goal: '',
    //     total_goal: '',
    // })

    const [editgoal, setEditgoal] = useState({
        id:'',
        diesel_goal: '',
        electricity_goal: '',
        food_goal: '',
        petrol_goal: '',
        total_goal: '',
    })

    const goalData =['ID','Petrol','Diseal','Electricity','Food','Total Goal'];

    // const [showform, setShowform] = useState(false);
    const [showform1, setShowform1] = useState(false);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/profile/set-goal')
    };

    const toggleForm1 = () => {
        setShowform1((prevValue) => !prevValue);
    };

    //set goal

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setSetgoal((prevGoal) => ({
    //         ...prevGoal,
    //         [name]: value,
    //     }));
    // };



    // const setyourgoal = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const accessToken = localStorage.getItem('accessToken');

    //         const response = await axios.post("http://127.0.0.1:8000/api/user/emission-goal/", setgoal, {
    //             headers: {
    //                 'Content-Type': ' application/json',
    //                 'Authorization': `Bearer ${accessToken}`,
    //             },
    //         });
    //         if (response.status >= 200 && response.status < 300) {
    //             console.log('Value Updated Successfully');
    //             toast.success('Fuel Updated Successfully');
    //         } else if (response.status === 401) {
    //             console.log('Unauthorized: Please check your access token');
    //             toast.error('Unauthorized: Please check your access token');
    //         } else {
    //             console.log(`Error: ${response.status} - ${response.statusText}`);
    //             toString.error(`Error: ${response.status} - ${response.statusText}`);
    //         }

    //     } catch (error) {
    //         console.log('Error getting details', error);
    //         toast.error('Error getting details', error);

    //     }
    // }

    //Goal Details

    const yourgoal = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");

            if (!accessToken) {
                toast.error("Access Token is not available");
                return;
            }

            const response = await axios.get("http://127.0.0.1:8000/api/user/emission-goal/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            setGetgoal(response.data);

            console.log('goalData',getgoal);
            console.log("Goals", response.data);
        } catch (error) {
            console.log("Error occurred while getting Goaldetails", error);
        }
    }

    useEffect(() => {
        yourgoal();
    }, []);


    // setEditgoal((prevGoal) => ({
    //     ...prevGoal,
    //     id: getgoal?.id,
    // }));

    //Edit Goal

    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setEditgoal((prevGoal) => ({
            ...prevGoal,
            [name]: value,
        }));
    };
    const edityourgoal = async (e) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');

            const response = await axios.patch("http://127.0.0.1:8000/api/user/emission-goal/", editgoal, {
                headers: {
                    'Content-Type': ' application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            if (response.status >= 200 && response.status < 300) {
                console.log('Value Updated Successfully');
                toast.success('Fuel Updated Successfully');
            } else if (response.status === 401) {
                console.log('Unauthorized: Please check your access token');
                toast.error('Unauthorized: Please check your access token');
            } else {
                console.log(`Error: ${response.status} - ${response.statusText}`);
                toast.error(`Error: ${response.status} - ${response.statusText}`);
            }

        } catch (error) {
            console.log('Error getting details', error);
            toast.error('Error getting details', error);

        }
    }

 

    return (
        <>
            <ToastContainer />
            <Navbar />
            <div>
                <div className='goal-container'>
                    <h2>Current Goal</h2>
                   
            <div>
                    {getgoal && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Goal</th>
                                    <th>Value</th>

                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(getgoal).map(([key, value],index) => (
                                    
                                        <tr key={key}>
                                            <td style={{color: key === 'total_goal'? 'red':'',fontWeight: key === 'total_goal'? 'bold':'', display: key === 'id'? 'none':'', }}>{goalData[index]}</td>
                                          
                                            <td style={{color: key === 'total_goal'? 'red':'',fontWeight: key === 'total_goal'? 'bold':'', display: key === 'id'? 'none':'', }}>{value}</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    )}
                    </div>
                    <button className='set-goall' onClick={handleClick}>Set Goal</button>
                            <button className='edit-goal' onClick={toggleForm1}>Edit Goal</button>
                </div>
            </div>
{/* 
            {showform && (
            <div>
                <div className='setgoal-container'>
                    <h2>Set Your Goal</h2>
                    <form onSubmit={setyourgoal}>
                      
                        <div>
                            <label>Food</label>
                            <input type='number'
                                placeholder='Food Goal'
                                name='food_goal'
                                value={setgoal.food_goal}
                                onChange={handleChange} />
                        </div>
                        <div>
                            <label>Electricity</label>
                            <input type='number'
                                placeholder='Electricity Goal'
                                name='electricity_goal'
                                value={setgoal.electricity_goal}
                                onChange={handleChange} />
                        </div>

                        <div>
                            <label>Diesel</label>
                            <input type='number'
                                placeholder='Diesel Goal'
                                name='diesel_goal'
                                value={setgoal.diesel_goal}
                                onChange={handleChange} />
                        </div>

                        <div>
                            <label>Petrol</label>
                            <input type='number'
                                placeholder='Petrol Goal'
                                name='petrol_goal'
                                value={setgoal.petrol_goal}
                                onChange={handleChange} />
                        </div>
                        <button type='submit'>Set Goal</button>



                    </form>

                </div>
            </div>
            )} */}

            {showform1 && (<div>
                <div className='edit-container'>
                    <h2>Edit Your Goal</h2>
                    <form onSubmit={edityourgoal}>
                    <div style={{display:'none'}}>
                            <label>ID</label>
                            <input type='number'
                            placeholder='ID'
                            name='id'
                            value={getgoal.id}
                            disabled/>

                        </div>


                        <div>
                            <label>Food</label>
                            <input type='number'
                                placeholder='Food Goal'
                                name='food_goal'
                                value={editgoal.food_goal}
                                onChange={handleChange1} />
                        </div>
                        <div>
                            <label>Electricity</label>
                            <input type='number'
                                placeholder='Electricity Goal'
                                name='electricity_goal'
                                value={editgoal.electricity_goal}
                                onChange={handleChange1} />
                        </div>

                        <div>
                            <label>Diesel</label>
                            <input type='number'
                                placeholder='Diesel Goal'
                                name='diesel_goal'
                                value={editgoal.diesel_goal}
                                onChange={handleChange1} />
                        </div>

                        <div>
                            <label>Petrol</label>
                            <input type='number'
                                placeholder='Petrol Goal'
                                name='petrol_goal'
                                value={editgoal.petrol_goal}
                                onChange={handleChange1} />
                        </div>
                        <button type='submit'>Edit Goal</button>



                    </form>

                </div>
            </div>
            )}
        </>
    );
}

export default Goaldetails;
