import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Headers&Footers/Headers";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Favtips.css";

const Favtips = () => {
  const [favtips, setFavtips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);

  const favouritetips = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access Token not Available");
        toast.error("Access Token not Available");
        return;
      }

      const response = await axios.get(
        "http://127.0.0.1:8000/api/user/create-favorite/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setFavtips(response.data);
        console.warn("tipss", response.data);
      } else {
        console.log("Favorite Tips not fetched");
        toast.error("Favorite Tips not fetched");
      }
    } catch (error) {
      console.log("Error occurred while fetching favorite tips", error);
    }
  };

  const removeFavTip = async (favorite_id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access Token not Available");
        toast.error("Access Token not Available");
        return;
      }

      const response = await axios.delete(
        "http://127.0.0.1:8000/api/user/create-favorite/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          data: { favorite_id }, 
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success("Tip removed from favorites successfully");
        favouritetips(); 
        setShowModal(false); 
      } else {
        console.log("Error occurred while removing favorite tip");
        toast.error("Error occurred while removing favorite tip");
      }
    } catch (error) {
      console.log("Error occurred while removing favorite tip", error);
    }
  };

  useEffect(() => {
    favouritetips();
  }, []);

  const handleReadMore = (tip) => {
    setSelectedTip(tip);
    setShowModal(true);
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <h2 className="headingg">Favourite Tips</h2>
      <div className="dailytips-container mt-5">
        <div className="column-container">
          {favtips.map((tip, index) => (
            <div key={tip.id} className="card">
              <div className="card-body">
                {/* <span 
               className="remove-fav"
              onClick={() => removeFavTip(tip.id)} >Remove from Favorites</span> */}
                <h2 className="card-title">Tip :</h2>
                <p className="card-subtitle">Updated Date:{tip.created_at}</p>
                {tip.tip_photo && (
                  <div className="card-image">
                    <img
                      className="photo"
                      src={`http://127.0.0.1:8000${tip.tip_photo}`}
                      alt="Tip-Imag"
                    ></img>
                  </div>
                )}
                {tip.tip_video && (
                  <video className="video" controls>
                    <source src={`http://127.0.0.1:8000${tip.tip_video} `}type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <p className="card-text">
                  {tip.tip_text.length > 200 ? (
                    <>
                      {tip.tip_text.slice(0, 200)}...
                      <Link
                        className="read-more-button"
                        onClick={() => handleReadMore(tip)}
                      >
                        Read More
                      </Link>
                    </>
                  ) : (
                    tip.tip_text
                  )}
                </p>
                <div style={{ marginTop: "50px" }}>
                  <span
                    className="remove-fav"
                    onClick={() => removeFavTip(tip.id)}
                  >
                    Remove from Favorites
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Read more */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => removeFavTip(selectedTip.id)}
            >
              Remove from Favourites
            </p>
            <h2>Tip Details</h2>
            <p className="card-subtitle">
              Updated Date:{selectedTip.created_at}
            </p>
            <span className="close-button" onClick={() => setShowModal(false)}>
              <AiTwotoneCloseCircle />
            </span>
            {selectedTip.tip_photo && (
              <img
              className="photo"
              src={`http://127.0.0.1:8000${selectedTip.tip_photo}`}
              alt="Tip-Imag"
            />
            )}
            {selectedTip.tip_video && (
              <video className="video" controls>
              <source src={`http://127.0.0.1:8000${selectedTip.tip_video}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            )}
            <p>{selectedTip.tip_text}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Favtips;
