import React,{useState} from 'react';
import { FcManager } from "react-icons/fc";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

    
    const [admin, setAdmin] = useState({
        username:'',
        password:'',
    });

    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const navigate= useNavigate();


    const headers = {
        'Content-Type':'application/json',
    };

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setAdmin({
            ...admin,
            [name]: value,
        });
    }
    
    const adminlogin = async (e) =>{
        e.preventDefault();
        try{

            const response = await axios.post('http://127.0.0.1:8000/api/admin/admin-login/',{
                username : admin.username,
                password:admin.password,
            },{Headers});
            
            if (response.status === 200 ) {
                console.log("Login 'successfull");
                toast.success("Login Successfull");
                
                const userToken = localStorage.setItem('userRole','admin')

                const newAccessToken = response.data.access_token;
                setAccessToken(newAccessToken);
                localStorage.setItem('accessToken', newAccessToken);

                navigate('/dashboard');
            } else if(response.status === 401){
                console.log("Login failed");
                toast.error('wrong id pass. Try Again');
            }
        }catch(error){
            console.log("Error Occured while Login",error);

        }
    }
    return (
        <>
        <ToastContainer />
            <div>
                
                    <div className='main-container'>
                        <div className='form-container'>
                            <div>
                                <div className='iconn'>
                                    <FcManager fontSize={'8rem'} />
                                </div>
                                <h2>Admin Login</h2>
                                <div>
                                    <label>Username :</label>
                                    <input
                                        className='ad-user'
                                        placeholder='Username'
                                        name='username'
                                    onChange={handleChange}
                                    />                                    
                                </div>
                                <div>
                                    <label>Password :</label>
                                    <input
                                    className='ad-pass' 
                                    placeholder='Password'
                                    name='password'
                                    onChange={handleChange}/>
                                </div>

                                <button onClick={adminlogin}>Login</button>
                            </div>

                        </div>
                    </div>
                
            </div>
        </>
    );
}

export default AdminLogin;
