import React from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "../Headers&Footers/Headers";
import "./Help.css";
import { FAQ } from "../utils/Global";

const Help = () => {
  // const faqRender = FAQ.map((data,index)=>(
  // <div key={index}>
  //     <div>{data.question}</div>
  //     <div>{data.answer}</div>
  //     <div>{data.answer1}</div>
  //     <div>{data.answer2}</div>
  // </div>
  // ))
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div>
        <div>
          <h1 className="help-head">Help & Support</h1>
          {/* {faqRender} */}
        </div>
        <div className="faq-container">
          {FAQ.map((faq, index) => (
            <div key={index} className="faq-card">
              <h2>{faq.question}</h2>
              <p>{faq.answer}</p>
              <p>{faq.answer1}</p>
              <p>{faq.answer2}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Help;
