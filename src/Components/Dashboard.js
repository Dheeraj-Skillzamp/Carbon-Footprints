import React, { useEffect, useState } from "react";
import Navbar from "../Headers&Footers/Headers";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import "./dashboard.css";

const Dashboard = () => {
  const [dailytips, setDailytips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTip, setSelectedTip] = useState({});
  const [fav, setFav] = useState(false);
  const [like, setLike] = useState(false);
  const [addFav, setAddFav] = useState();

  const dailyemissiontips = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("Access Token not Available");
        toast.error("Access Token not Available");
        return;
      }

      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/emission-tips/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setDailytips(response.data);
        console.log("tips", response.data);
      } else {
        console.log("Emission Tips not Updated");
        toast.error("Emission Tips not Updated");
      }
    } catch (error) {
      console.log("Error Occurred while Updating Tips", error);
    }
  };

  const handleReadMore = (tip) => {
    setSelectedTip(tip);
    setAddFav({
      tip_id: tip.id,
    });
    setShowModal(true);
  };

  const addtofav = async (tip_id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/create-favorite/",
        { tip_id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        toast("Tips Added to Favourites");
        setFav(!fav);
        setLike(!like);
      } else if (response.status === 400) {
        toast.error("Already Added to Favourites");
      } else {
        toast.error("Error adding tips to Favourites");
      }
    } catch (error) {
      console.error("Error occurred ", error);
      toast.error("Already Added to Favourites");
    }
  };

  useEffect(() => {
    dailyemissiontips();
  }, [setDailytips]);

  console.log("idd", selectedTip);
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div>
        <div className="dailytips-container mt-5">
          <div className="column-container">
            {dailytips.map((tip, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  {/* <span
                    onClick={() => addtofav(tip.id)}
                    style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                  >
                    {fav ? <FaHeart /> : <FaRegHeart />} Add to Favorites
                  </span> */}

                  <h5 className="card-title">Tips</h5>
                  <div className="fav-button">
                    <span className="add-fav" onClick={() => addtofav(tip.id)}>
                      {fav ? (
                        <FaHeart style={{ color: "red" }} />
                      ) : (
                        <FaRegHeart />
                      )}{" "}
                      Favourites
                    </span>
                    {/* <button>
                  {like ?  <BiSolidLike  style={{color:'blue'}}/> :<BiLike /> }Like
                    </button> */}
                  </div>
                  <p className="card-subtitle">Updated Date:{tip.updated_at}</p>
                  <p className="card-text">
                    {tip.tip_photo && (
                      <div className="card-image">
                        <img
                          className="tipp-photo"
                          src={tip.tip_photo}
                          alt="Tip-Imag"
                        ></img>
                      </div>
                    )}
                    {tip.tip_text.length > 220 ? (
                      <>
                        {tip.tip_text.slice(0, 220)}...
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <label
                value={selectedTip.id}
                onClick={() => addtofav(selectedTip.id)}
                style={{ cursor: "pointer", color: "red" }}
              >
                Add to Favourites {fav ? <FaHeart /> : <FaRegHeart />}
              </label>
              <h2>Tip Details</h2>
              <span
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                <AiTwotoneCloseCircle />
              </span>
              {selectedTip.tip_photo && (
                <img
                  className="tip-photo"
                  src={selectedTip.tip_photo}
                  alt="Tip-Imag"
                ></img>
              )}
              <p>{selectedTip.tip_text}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import Navbar from '../Headers&Footers/Headers';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link } from 'react-router-dom';
// import { AiTwotoneCloseCircle } from 'react-icons/ai';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import './dashboard.css';

// const Dashboard = () => {
//   const [dailytips, setDailytips] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedTip, setSelectedTip] = useState({});
//   const [fav, setFav] = useState(false);
//   const [addFav, setAddFav] = useState();

//   const dailyemissiontips = async () => {
//     try {
//       const accessToken = localStorage.getItem('accessToken');

//       if (!accessToken) {
//         console.error('Access Token not Available');
//         toast.error('Access Token not Available');
//         return;
//       }

//       const response = await axios.get(
//         'http://127.0.0.1:8000/api/admin/emission-tips/',
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (response.status >= 200 && response.status < 300) {
//         setDailytips(response.data);
//         console.log("tips", response.data)
//       } else {
//         console.log('Emission Tips not Updated');
//         toast.error('Emission Tips not Updated');
//       }
//     } catch (error) {
//       console.log('Error Occurred while Updating Tips', error);
//     }
//   };

//   const handleReadMore = (tip) => {
//     setSelectedTip(tip);
//     setAddFav({
//       tip_id: tip.id,
//     });
//     setShowModal(true);
//   };

//   const addtofav = async () => {
//     try {
//       const accessToken = localStorage.getItem('accessToken');
//       const response = await axios.post(
//         'http://127.0.0.1:8000/api/user/create-favorite/',
//         { tip_id: addFav.tip_id },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             '  Authorization': `Bearer ${accessToken}`,
//           },
//         }
//       );
//       if (response.status >= 200 && response.status < 300) {
//         toast('Tips Added to Favourites');
//         setFav(!fav);
//       } else if (response.status === 400) {
//         // setFav(fav);
//         toast.error('Already Added to Favourites');
//       } else {
//         toast.error('Error adding tips to Favourites');
//       }
//     } catch (error) {
//       console.error('Error occurred ', error);
//       toast.error('Already Added to Favourites');
//     }
//   };

//   useEffect(() => {
//     dailyemissiontips();
//   }, []);

//   return (
//     <>
//       <ToastContainer />
//       <Navbar />
//       <div>

//         <div className="dailytips-container mt-5">
//           <div className="column-container">
//             {dailytips.map((tip, index) => (
//               <div key={index} className="card">
//                 <div className="card-body">
//                 <button onClick={() => addtofav(tip.id)}>
//                     {fav ? <FaHeart /> : <FaRegHeart />} Add to Favorites
//                   </button>
//                   <h5 className="card-title">Tips</h5>
//                   {/* <p className="card-subtitle">Created Date:{tip.created_at}</p> */}
//                   <p className="card-subtitle">Updated Date:{tip.updated_at}</p>
//                   <p className="card-text">
//                     {tip.tip_text.length > 220 ? (
//                       <>
//                         {tip.tip_text.slice(0, 220)}...
//                         <Link
//                           className="read-more-button"
//                           onClick={() => handleReadMore(tip)}
//                         >
//                           Read more
//                         </Link>
//                       </>
//                     ) : (
//                       tip.tip_text
//                     )}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Modal for Read More */}
//         {showModal && (
//           <div className="modal-overlay">
//             <div className="modal">
//               {/* Add to Favourites button */}
//               {addFav !== undefined && (
//                 <>
//                   {/* {fav ? (
//                     <FaHeart
//                       value={selectedTip.id}
//                       onClick={() => addtofav()}
//                       style={{
//                         fill: 'red',
//                         fontSize: '1.5rem',
//                         cursor: 'pointer',
//                       }}
//                     />
//                   ) : (
//                     <FaRegHeart
//                       value={selectedTip.id}
//                       onClick={() => addtofav()}
//                       style={{ fontSize: '1.5rem', cursor: 'pointer' }}
//                     />
//                   )} */}
//                   <label
//                     value={selectedTip.id}
//                     onClick={() => addtofav()}
//                     style={{ cursor: 'pointer', color: 'red' }}
//                   >
//                     Add to Favourites
//                   </label>
//                   <h2>Tip Details</h2>
//                   <span
//                     className="close-button"
//                     onClick={() => setShowModal(false)}
//                   >
//                     <AiTwotoneCloseCircle />
//                   </span>
//                   <p>{selectedTip.tip_text}</p>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Dashboard;
