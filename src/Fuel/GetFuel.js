// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './getfuel.css'
// import Navbar from '../Headers&Footers/Headers';
// import { ToastContainer, toast } from 'react-toastify';
// import { FcFilledFilter } from "react-icons/fc";


// const GetFuel = () => {
//     const [fueldata, setFueldata] = useState([]);
//     const [fooddata, setFooddata] = useState([]);
//     const [filteredFuelData, setFilteredFuelData] = useState([]);
//     const [filteredFoodData, setFilteredFoodData] = useState([]);
//     const [filterDate, setFilterDate] = useState('');


//     const handleFilter = () => {
//         // Filter data based on the entered date
//         const filteredData = fueldata.filter(entry => entry.entry_date === filterDate);
//         setFilteredFuelData(filteredData);
//         const filteredfood = fooddata.filter(entry => entry.entry_date === filterDate);
//         setFilteredFoodData(filteredfood)
//     };

//     const fuelDetails = async () => {
//         try {
//             const accessToken = localStorage.getItem('accessToken');

//             if (!accessToken) {
//                 console.error('Access Token not Available');
//                 toast.error('Access Token not Available');
//                 return;
//             }

//             const response = await axios.get("http://127.0.0.1:8000/api/user/fuel-used/detail/", {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${accessToken}`,
//                 },
//             });

//             setFueldata(response.data);
//             setFilteredFuelData(response.data); // Initialize filtered data with all data
//             console.log("streak", response.data);
//         } catch (error) {
//             console.error('Error occurred while fetching streak', error);
//         }
//     };


//     const foodDetails = async () => {
//         try {
//             const accessToken = localStorage.getItem("accessToken");

//             if (!accessToken) {
//                 toast.error('Access TOken is not Available');
//                 return;
//             }
//             const response = await axios.get("http://127.0.0.1:8000/api/user/daily-food-choices/detail/", {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${accessToken}`,
//                 },
//             });
//             setFooddata(response.data);
//             setFilteredFoodData(response.data);
//             console.log("food", response.data);
//         } catch (error) {
//             console.error("Error occured while getting Food Data", error);
//         }
//     };

//     useEffect(() => {

//         fuelDetails();
//         foodDetails();
//     }, []);

//     return (
//         <>
//             <ToastContainer />
//             <Navbar />
//             <div className="filter-section">
//                         <label className='label-fuel'>Filter by Date:</label>
//                         <input type="date" className="date-input" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
//                         <button className="filter-button" onClick={handleFilter}><FcFilledFilter fontSize={'1.5rem'} /></button>
//                     </div>
//             <div className="fuel-container">

//                 <div className='fuel-details' >
                    
//                     <div className="fuel-header">
//                         <h1 className='fuel-h'>Fuel Details</h1>

//                     </div>
//                     <div className="fuel-table">
//                         {filteredFuelData ? (
//                             <table style={{marginBottom:'15px'}}>
//                                 <thead>
//                                     <tr>
//                                         <th>Date</th>
//                                         <th>Electricity</th>
//                                         <th>Diesel</th>
//                                         <th>Petrol</th>
//                                         <th>Total Emission</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filteredFuelData.map(entry => (
//                                         <tr key={entry.id}>
//                                             <td style={{ color: entry.entry_date === filterDate ? 'red' : 'black' }}>
//                                                 {entry.entry_date}
//                                             </td>

//                                             {/* <td>{entry.entry_date}</td> */}
//                                             <td>{entry.electricity}</td>
//                                             <td>{entry.diesel}</td>
//                                             <td>{entry.petrol}</td>
//                                             <td>{entry.total_emission}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         ) : (
//                             <p>Loading fuel data...</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <div className='food-container'>
//                 <div className='food-details' >
//                     <div className="food-header">
//                         <h1 className='food-h'>Food Details</h1>
                        
//                     </div>
//                     <div className="food-table">
//                         {filteredFoodData ? (
//                             <table style={{marginBottom:'15px'}}>
//                                 <thead>
//                                     <tr>
//                                         <th>Date</th>
//                                         <th>Food Type</th>
//                                         <th>Total Food Emission</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filteredFoodData.map(entry => (
//                                         <tr key={entry.id}>
//                                             <td style={{ color: entry.entry_date === filterDate ? 'red' : 'black' }}>
//                                                 {entry.entry_date}
//                                             </td>

//                                             <td>{entry.food_type}</td>
//                                             <td>{entry.total_food_emission}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         ) : (
//                             <p>Loading fuel data...</p>
//                         )}
//                     </div>

//                 </div>
//             </div>
//         </>
//     );
// }

// export default GetFuel;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './getfuel.css';
import Navbar from '../Headers&Footers/Headers';
import { ToastContainer, toast } from 'react-toastify';
import { FcFilledFilter } from 'react-icons/fc';

const GetFuel = () => {
    const [fueldata, setFueldata] = useState([]);
    const [fooddata, setFooddata] = useState([]);
    const [filteredFuelData, setFilteredFuelData] = useState([]);
    const [filteredFoodData, setFilteredFoodData] = useState([]);
    const [filterDate, setFilterDate] = useState('');

    const handleFilter = () => {
        // Filter data based on the entered date
        const filteredData = fueldata.filter((entry) => entry.entry_date === filterDate);
        setFilteredFuelData(filteredData);
        const filteredfood = fooddata.filter((entry) => entry.entry_date === filterDate);
        setFilteredFoodData(filteredfood);
    };

    const fuelDetails = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                console.error('Access Token not Available');
                toast.error('Access Token not Available');
                return;
            }

            const response = await axios.get('http://127.0.0.1:8000/api/user/fuel-used/detail/', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Sort the data based on the entry_date in descending order
            const sortedData = response.data.sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date));

            setFueldata(sortedData);
            setFilteredFuelData(sortedData); // Initialize filtered data with sorted data
            console.log('streak', sortedData);
        } catch (error) {
            console.error('Error occurred while fetching streak', error);
        }
    };

    const foodDetails = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                toast.error('Access Token is not Available');
                return;
            }
            const response = await axios.get('http://127.0.0.1:8000/api/user/daily-food-choices/detail/', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Sort the data based on the entry_date in descending order
            const sortedData = response.data.sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date));

            setFooddata(sortedData);
            setFilteredFoodData(sortedData);
            console.log('food', sortedData);
        } catch (error) {
            console.error('Error occurred while getting Food Data', error);
        }
    };

    useEffect(() => {
        fuelDetails();
        foodDetails();
    }, []);

    return (
        <>
            <ToastContainer />
            <Navbar />
            <div className="filter-section">
                <label className="label-fuel">Filter by Date:</label>
                <input
                    type="date"
                    className="date-input"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
                <button className="filter-button" onClick={handleFilter}>
                    <FcFilledFilter fontSize={'1.5rem'} />
                </button>
            </div>
            <div className="fuel-container">
                <div className="fuel-details">
                    <div className="fuel-header">
                        <h1 className="fuel-h">Fuel Details</h1>
                    </div>
                    <div className="fuel-table">
                        {filteredFuelData ? (
                            <table style={{ marginBottom: '15px' }}>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Electricity</th>
                                        <th>Diesel</th>
                                        <th>Petrol</th>
                                        <th>Total Emission</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredFuelData.map((entry) => (
                                        <tr key={entry.id}>
                                            <td style={{ color: entry.entry_date === filterDate ? 'red' : 'black' }}>
                                                {entry.entry_date}
                                            </td>
                                            <td>{entry.electricity}</td>
                                            <td>{entry.diesel}</td>
                                            <td>{entry.petrol}</td>
                                            <td>{entry.total_emission}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Loading fuel data...</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="food-container">
                <div className="food-details">
                    <div className="food-header">
                        <h1 className="food-h">Food Details</h1>
                    </div>
                    <div className="food-table">
                        {filteredFoodData ? (
                            <table style={{ marginBottom: '15px' }}>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Food Type</th>
                                        <th>Total Food Emission</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredFoodData.map((entry) => (
                                        <tr key={entry.id}>
                                            <td style={{ color: entry.entry_date === filterDate ? 'red' : 'black' }}>
                                                {entry.entry_date}
                                            </td>
                                            <td>{entry.food_type}</td>
                                            <td>{entry.total_food_emission}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Loading food data...</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default GetFuel;
