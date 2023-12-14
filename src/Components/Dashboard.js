import React, { useEffect, useState } from 'react';
import Navbar from '../Headers&Footers/Headers';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './dashboard.css';
import { Link } from 'react-router-dom';
import { AiTwotoneCloseCircle } from "react-icons/ai"
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const Dashboard = () => {
  const [dailytips, setDailytips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTip, setSelectedTip] = useState({});
  const[ fav, setFav]= useState(false);

  const dailyemissiontips = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.error('Access Token not Available');
        toast.error('Access Token not Available');
        return;
      }

      const response = await axios.get('http://127.0.0.1:8000/api/admin/emission-tips/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setDailytips(response.data);
      } else {
        console.log('Emission Tips not Updated');
        toast.error('Emission Tips not Updated');
      }
    } catch (error) {
      console.log('Error Occurred while Updating Tips', error);
    }
  };

  const handleReadMore = (tip) => {
    setSelectedTip(tip);
    setShowModal(true);
  };

  useEffect(() => {
    dailyemissiontips();
  }, []);

  return (
    <>
      <ToastContainer />
      <div>
        <Navbar />
        <div className="dailytips-container mt-5">
          <div className="column-container">
            {dailytips.map((tip, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  <h5 className="card-title">Tips</h5>
                  <p className="card-text">
                    {tip.tip_text.length > 50 ? (
                      <>
                        {tip.tip_text.slice(0, 100)}...
                        <Link
                          className="read-more-button"
                          onClick={() => handleReadMore(tip)}
                        >
                          Read more
                        </Link>
                      </>
                    ) : (
                      tip.tip_text
                    )}
                  </p>
                  <div>
                    <h4 className="card-subtitle">Created At</h4>
                    <p className="card-text">{tip.created_at}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Read More */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              {fav ? (<FaHeart onClick={()=> setFav(!fav)} style={{fill:'red',}}/>):(<FaRegHeart onClick={()=> setFav(!fav)} />)}          
              <h2>Tip Details</h2>
              <span className="close-button" onClick={() => setShowModal(false)}>
                <AiTwotoneCloseCircle />
              </span>
              <p>{selectedTip.tip_text}</p>
             
            </div>
            <div>
              
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
