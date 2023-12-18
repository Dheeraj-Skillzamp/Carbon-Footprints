
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../Headers&Footers/Headers';
import './monthlyemission.css';

const Monthlyemission = () => {
  const [emissiondata, setEmissiondata] = useState({});

  const monthlyemission = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        toast.error('Access Token is not Available');
        return;
      }
      const response = await axios.get('http://127.0.0.1:8000/api/user/emission-record/',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setEmissiondata(response.data);
      console.log('emission', response.data);
    } catch (error) {
      console.log('Error occurred while fetching Emission Data', error);
    }
  };

  useEffect(() => {
    monthlyemission();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="emission-table">
          <h2 className="table-title">Current Month Emission Data</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Total Emissions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Current Month</td>
                <td>{emissiondata.current_month_emissions}</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div className="emission-table">
          <h2 className="table-title">Past Months Emission Data</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Total Emissions</th>
              </tr>
            </thead>
            <tbody>
              {emissiondata.past_months_emissions &&
                emissiondata.past_months_emissions.map((monthData) => (
                  <tr key={monthData.month}>
                    <td>{monthData.month}</td>
                    <td>{monthData.total_emissions}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
  
};

export default Monthlyemission;
