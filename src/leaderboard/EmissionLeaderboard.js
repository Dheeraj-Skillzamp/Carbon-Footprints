import React, { useEffect, useState } from 'react';
import Navbar from '../Headers&Footers/Headers';
import axios from 'axios';
import { toast } from 'react-toastify';
import './leadarboard.css';

const EmissionLeaderboard = () => {
  const [lead, setLead] = useState([]);

  const leaderboard = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        toast.error('Access Token is not available');
        return;
      }

      const response = await axios.get(
        'http://127.0.0.1:8000/api/user/leaderboard/',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setLead(response.data);
      console.log('lead', response.data);
    } catch (error) {
      console.log('Error occurred while getting LeaderBoard', error);
    }
  };

  useEffect(() => {
    leaderboard();
  }, []); // Make sure to pass an empty dependency array to run the effect only once

  return (
    <>
      <Navbar />
      <div>
      <div className="container">
        <div>
          <h1 className="header">Leaderboard</h1>
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Total Emissions</th>
              </tr>
            </thead>
            <tbody>
              {lead.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.total_emissions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </>
  );
};

export default EmissionLeaderboard;
