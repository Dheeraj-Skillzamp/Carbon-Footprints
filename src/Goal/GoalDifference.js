import React from 'react';

import Navbar from '../Headers&Footers/Headers';
import { ToastContainer} from 'react-toastify';

const GoalDifference = () => {
    return (
        <>
        <ToastContainer />
            <Navbar />
            <h2>Difference between Goal & Total Carbon Emission</h2>
        </>
    );
}

export default GoalDifference;
