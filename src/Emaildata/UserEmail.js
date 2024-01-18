import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "../Headers&Footers/Headers";
import { DNA } from "react-loader-spinner";
import "./userEmail.css";
import axios from "axios";

const UserEmail = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  const emailData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/fetch_emails/",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setEmails(response.data);

      setLoading(false);
      console.log("data", response.data);
      console.log("subject", response.data.email_results[0].subject);
    } catch (error) {
      console.log("Error Occurred while fetching Email Data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    emailData();
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div>
        <h2 className="head"> User's Email Data</h2>
        <div className="email-container">
          {loading ? (
            <div className="loading-spinner">
              <DNA type="Puff" color="#00BFFF" height={250} width={250} />
            </div>
          ) : (
            <div>
              {emails.email_results &&
                emails.email_results.map((email, index) => (
                  <div key={index} className="email-card">
                    <div className="email-card-header">
                      <strong>Subject:</strong> {email.subject}
                    </div>
                    <div className="email-card-details">
                      <strong>Sender:</strong> {email.sender}
                      <br />
                      <strong>Date Sent:</strong> {email.date_sent}
                      <br />
                      <strong>Body:</strong>
                      <br />
                      {email.body}
                      <br />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserEmail;

