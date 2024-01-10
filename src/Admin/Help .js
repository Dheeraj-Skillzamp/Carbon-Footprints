import React, {useState} from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "../Headers&Footers/Headers";
import "./Help.css";
import { FAQ } from "../utils/Global";
import Pagination from "../utils/Pagination";

const Help = () => {
  const faqsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastFaq = currentPage * faqsPerPage;
  const indexOfFirstFaq = indexOfLastFaq - faqsPerPage;
  const currentFaqs = FAQ.slice(indexOfFirstFaq, indexOfLastFaq);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div> 
        <div>
          <h1 className="help-head">Help & Support</h1>
        </div>
        <div>
          <Pagination
            faqsPerPage={faqsPerPage}
            totalFaqs={FAQ.length}
            paginate={paginate}
          />
        </div>
        <div className="faq-container">
          {currentFaqs.map((faq, index) => (
            <div key={index} className="faq-card">
              <h2>{faq.heading}</h2>
              <p>{faq.answer}</p>
              <p>{faq.answer1}</p>
              <p>{faq.answer2}</p>
              {faq.answer3 && <p>{faq.answer3}</p>}
              {faq.answer4 && <p>{faq.answer4}</p>}
              {faq.image && <img src={faq.image} alt="Carbon Footprints" />}
              {faq.answer5 && <p>{faq.answer5}</p>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Help;
