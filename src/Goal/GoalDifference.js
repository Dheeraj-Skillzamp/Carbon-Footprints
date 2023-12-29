import React, { useState, useEffect } from "react";
import Navbar from "../Headers&Footers/Headers";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Chart from "chart.js/auto";
import { DNA } from "react-loader-spinner";

const GoalDifference = () => {
  const [goaldiff, setGoaldiff] = useState(null);
  const [loading, setLoading] = useState(true);

  const Goaldifference = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        toast.error("Access Token is not available");
        return;
      }

      const response = await axios.get(
        "http://127.0.0.1:8000/api/user/goal-total_emission-diffrence/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setGoaldiff(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error occurred while getting Goaldetails", error);
      toast.error("Error occurred while fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    Goaldifference();
  }, []);

  useEffect(() => {
    if (!goaldiff) return;

    const ctx = document.getElementById("chartCanvas").getContext("2d");

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Total Goal", "Total Emission", "Difference"],
        datasets: [
          {
            label: "Difference b/w Total Emission & Total Goal",
            backgroundColor: [
              "rgba(7,188,12,0.6)",
              "rgba(75,192,192,0.6)",
              "rgba(255,205,86,0.6)",
            ],
            borderColor: [
              "rgba(7,188,12,1)",
              "rgba(75,192,192,1)",
              "rgba(255,205,86,1)",
            ],
            borderWidth: 1,
            data: [
              goaldiff.total_goal,
              goaldiff.total_emission,
              goaldiff.difference,
            ],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Optionally, destroy the chart when the component unmounts
    return () => {
      chart.destroy();
    };
  }, [goaldiff]);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <h2>Difference between Goal & Total Carbon Emission</h2>
      {loading ? (
        <div className="loader-container">
          <DNA color="#00BFFF" height={250} width={250} />
        </div>
      ) : (
        <>
          <div style={{ height: "500px", width: "900px", marginLeft: "25px" }}>
            <canvas id="chartCanvas" width="800px"></canvas>
          </div>
          <div style={{marginLeft:"25px", width:"900px", marginBottom:"10px"}}> 
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Value (Kg)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Goal</td>
                  <td>{goaldiff.total_goal}</td>
                </tr>

                <tr>
                  <td>Total Emission</td>
                  <td>{goaldiff.total_emission}</td>
                </tr>
                <tr>
                  <td>Difference</td>
                  <td>{goaldiff.difference}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default GoalDifference;
