import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = (props) => {

    const navigate=useNavigate();
    const[isLoggedIn, setIsLoggedIn]= useState(false);

    const checkUserToken = () => {
        const token = localStorage.getItem('accessToken');
        if(!token || token === 'undefined'){
            setIsLoggedIn(false);
            return navigate('/');
        }
        setIsLoggedIn(true);
    }
    useEffect(() =>{
        checkUserToken();
    },[isLoggedIn]);
    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}

export default ProtectedRoutes;
