import React, { useState } from 'react';
import Navbar from '../Headers&Footers/Headers';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import './foodgoal.css';

const SetGoal = () => {
    const [setgoal, setSetgoal] = useState({
        id: '',
        diesel_goal: '',
        electricity_goal: '',
        food_goal: '',
        petrol_goal: '',
        total_goal: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetgoal((prevGoal) => ({
            ...prevGoal,
            [name]: value,
        }));
    };

    const setYourGoal = async (e) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');

            const response = await axios.post("http://127.0.0.1:8000/api/user/emission-goal/", setgoal, {
                headers: {
                    'Content-Type': 'application/json',
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
    };

    const deleteGoal = async (e) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.delete("http://127.0.0.1:8000/api/user/emission-goal/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                data: setgoal,
            });

            if (response.status >= 200 && response.status < 300) {
                console.log('Goal Deleted Successfully');
                toast.success('Goal Deleted Successfully');

                // Reset setgoal state to 0 values
                setSetgoal({
                    diesel_goal: 0,
                    electricity_goal: 0,
                    food_goal: 0,
                    petrol_goal: 0,
                    total_goal: 0,
                });
            } else if (response.status === 401) {
                console.log('Unauthorized: Please check your access token');
                toast.error('Unauthorized: Please check your access token');
            } else {
                console.log(`Error: ${response.status} - ${response.statusText}`);
                toast.error(`Error: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.log('Error deleting goal', error);
            toast.error('Error deleting goal', error);
        }
    };

    return (
        <>
            <ToastContainer />
            <Navbar />
            <div>
                <div>
                    <div className='setgoal-container'>
                        <h2>Set Your Monthly Goal</h2>
                        <form onSubmit={setYourGoal}>
                            <div>
                                <label>Food (Kg)</label>
                                <input
                                    type='number'
                                    placeholder='Food Goal'
                                    name='food_goal'
                                    value={setgoal.food_goal}
                                    onChange={handleChange} />
                            </div>
                            <div>
                                <label>Electricity (Kg)</label>
                                <input
                                    type='number'
                                    placeholder='Electricity Goal'
                                    name='electricity_goal'
                                    value={setgoal.electricity_goal}
                                    onChange={handleChange} />
                            </div>
                            <div>
                                <label>Diesel (kg)</label>
                                <input
                                    type='number'
                                    placeholder='Diesel Goal'
                                    name='diesel_goal'
                                    value={setgoal.diesel_goal}
                                    onChange={handleChange} />
                            </div>
                            <div>
                                <label>Petrol (kg)</label>
                                <input
                                    type='number'
                                    placeholder='Petrol Goal'
                                    name='petrol_goal'
                                    value={setgoal.petrol_goal}
                                    onChange={handleChange} />
                            </div>
                            <button type='submit'>Set Goal</button>
                        </form>
                        <div>
                            <button className='delete-goal' onClick={deleteGoal}>Delete Goal</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SetGoal;
