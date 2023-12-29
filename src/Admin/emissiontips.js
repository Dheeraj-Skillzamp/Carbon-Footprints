import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../Headers&Footers/Headers";
import "./emissiontips.css";
import { Link } from "react-router-dom";
import { AiTwotoneCloseCircle } from "react-icons/ai";

const Emissiontips = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [emissiontips, setEmissiontips] = useState({
    tip_text: "",
    tip_photo: null,
    tip_video: null,
  });

  const [editedTip, setEditedTip] = useState({
    id: "",
    tip_text: "",
    tip_photo: null,
    tip_video: null,
  });

  const [dailytips, setDailytips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTip, setSelectedTip] = useState({});

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
        console.warn("tips", response.data);
      } else {
        console.log("Emission Tips not Updated");
        toast.error("Emission Tips not Updated");
      }
    } catch (error) {
      console.log("Error Occurred while Updating Tips", error);
    }
  };

  useEffect(() => {
    dailyemissiontips();
  }, []);

  const addemissiontips = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access Token not Available");
        toast.error("Access Token not Available");
        return;
      }

      const formData = new FormData();

      if (emissiontips.tip_text !== "") {
        formData.append("tip_text", emissiontips.tip_text);
      }
      if (emissiontips.tip_photo !== null) {
        formData.append("tip_photo", emissiontips.tip_photo);
      }
      if (emissiontips.tip_video !== null) {
        formData.append("tip_video", emissiontips.tip_video);
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/emission-tips/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,

            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Emission Tips Successfully");
        toast.success("Emission Tips Successfully");
        setEmissiontips({
          entry_date: currentDate,
          tip_text: "",
          tip_photo: null,
          tip_video: null,
        });
        dailyemissiontips();
      } else {
        console.log("Emission Tips not Updated");
        toast.error("Emission Tips not Updated");
      }
    } catch (error) {
      console.log("Error Occurred while Updating Tips", error);
    }
  };

  //   const updateEmissionTip = async () => {
  //     try {
  //       const accessToken = localStorage.getItem("accessToken");
  //       if (!accessToken) {
  //         console.error("Access Token not Available");
  //         toast.error("Access Token not Available");
  //         return;
  //       }
  //       const formData = new FormData();

  //       formData.append("id", editedTip.id);
  //       formData.append("tip_text", editedTip.tip_text);
  //       if (editedTip.tip_photo !== null) {
  //         formData.append("tip_photo", editedTip.tip_photo);
  //       }
  //       if (editedTip.tip_video !== null) {
  //         formData.append("tip_video", editedTip.tip_video);
  //       }
  //       const response = await axios.patch(
  //         `http://127.0.0.1:8000/api/admin/emission-tips/detail/`,
  //         formData,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,

  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (response.status >= 200 && response.status < 300) {
  //         console.log("Emission Tip Updated Successfully");
  //         toast.success("Emission Tip Updated Successfully");
  //         setShowEditModal(false);
  //         dailyemissiontips();
  //       } else {
  //         console.log("Failed to update Emission Tip");
  //         toast.error("Failed to update Emission Tip");
  //       }
  //     } catch (error) {
  //       console.log("Error Occurred while Updating the Tip", error);
  //     }
  //   };

  const updateEmissionTip = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access Token not Available");
        toast.error("Access Token not Available");
        return;
      }

      const formData = new FormData();

      formData.append("id", editedTip.id);
      formData.append("tip_text", editedTip.tip_text);

      if (editedTip.tip_photo && editedTip.tip_photo instanceof File) {
        formData.append("tip_photo", editedTip.tip_photo);
      }

      if (editedTip.tip_video && editedTip.tip_video instanceof File) {
        formData.append("tip_video", editedTip.tip_video);
      }

      const response = await axios.patch(
        `http://127.0.0.1:8000/api/admin/emission-tips/detail/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Emission Tip Updated Successfully");
        toast.success("Emission Tip Updated Successfully");
        setShowEditModal(false);
        dailyemissiontips();
      } else {
        console.log("Failed to update Emission Tip");
        toast.error("Failed to update Emission Tip");
      }
    } catch (error) {
      console.log("Error Occurred while Updating the Tip", error);
    }
  };

  const handleChange = (e, name) => {
    const newValue =
      name === "tip_photo" || name === "tip_video"
        ? e.target.files[0]
        : e.target.value;

    setEmissiontips({
      ...emissiontips,
      [name]: newValue,
    });
  };

  const handleReadMore = (tip) => {
    setSelectedTip(tip);
    setShowModal(true);
  };

  const handleEdit = (tip) => {
    setEditedTip(tip);
    setShowEditModal(true);
  };

  const deleteEmissiontips = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access Token not Available");
        toast.error("Access Token not Available");
        return;
      }
      const response = await axios.delete(
        "http://127.0.0.1:8000/api/admin/emission-tips/detail/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          data: { id: id },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log("Emission Tip Deleted Successfully");
        toast.success("Emission Tip Deleted Successfully");
        dailyemissiontips();
      } else {
        console.log("Failed to delete Emission Tip");
        toast.error("Failed to delete Emission Tip");
      }
    } catch (error) {
      console.log("Error Occurred while Deleting the Tip", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="emi-head">
        <h2>Emission Tips</h2>
      </div>
      <div className="tips-container">
        <div>
          <label>Add Emission Tips</label>
          <textarea
            type="text"
            placeholder="Emission Tips (min-200 Words)"
            name="tip_text"
            value={emissiontips.tip_text}
            onChange={(e) => handleChange(e, "tip_text")}
          />
          <label className="form-label">Tip Photo</label>
          <input
            className="form-input"
            type="file"
            onChange={(e) => handleChange(e, "tip_photo")}
          />
          <label className="form-label">Tip Video</label>
          <input
            className="form-input"
            type="file"
            onChange={(e) => handleChange(e, "tip_video")}
          />
        </div>

        <button onClick={addemissiontips}>Submit</button>
      </div>
      <div>
        <div className="dailytips-container mt-5">
          <div className="column-container">
            {dailytips.map((tip, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  <h5 className="card-title">Tips</h5>
                  <div className="extra-button">
                    <button
                      className="edit-tips"
                      onClick={() => handleEdit(tip)}
                    >
                      Edit Tip
                    </button>

                    <button
                      className="del-tips"
                      onClick={() => deleteEmissiontips(tip.id)}
                    >
                      Delete Tip
                    </button>
                  </div>
                  <p className="card-subtitle">
                    Updated Date: {tip.updated_at}
                  </p>
                  {tip.tip_photo && (
                    <img
                      className="tip-photo"
                      src={tip.tip_photo}
                      alt="Tip-Imag"
                    ></img>
                  )}
                  {tip.tip_video && (
                    <video className="tip-video" controls>
                      <source src={tip.tip_video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}

                  <p className="card-text">
                    {tip.tip_text.length > 150 ? (
                      <>
                        {tip.tip_text.slice(0, 200)}...
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
              <h2>Tip Details</h2>
              <span
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                <AiTwotoneCloseCircle />
              </span>
              <div>
                {selectedTip.tip_photo && (
                  <img
                    className="modal-picutre"
                    src={selectedTip.tip_photo}
                    alt=""
                  ></img>
                )}
                {selectedTip.tip_video && (
                  <video className="tip-video" controls>
                    <source src={selectedTip.tip_video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              <p>{selectedTip.tip_text}</p>
            </div>
          </div>
        )}

        {showEditModal && (
          <div className="edit-modal-overlay">
            <div className="edit-modal">
              <h2>Edit Tip</h2>
              <p name="id" value={editedTip.id}></p>
              <label>Tip:</label>
              <textarea
                type="text"
                placeholder="Edit Emission Tip"
                name="tip_text"
                value={editedTip.tip_text}
                onChange={(e) =>
                  setEditedTip({
                    ...editedTip,
                    tip_text: e.target.value,
                  })
                }
              />
              <label>Tip Picture</label>
              <input
                type="file"
                name="tip_photo"
                onChange={(e) =>
                  setEditedTip({
                    ...editedTip,
                    tip_photo: e.target.files[0],
                  })
                }
              />
              <label>Tip Video</label>
              <input
                type="file"
                name="tip_video"
                onChange={(e) =>
                  setEditedTip({
                    ...editedTip,
                    tip_video: e.target.files[0],
                  })
                }
              />

              <button onClick={updateEmissionTip}>Save Changes</button>
              <span
                className="close-button"
                onClick={() => setShowEditModal(false)}
              >
                <AiTwotoneCloseCircle />
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Emissiontips;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import Navbar from "../Headers&Footers/Headers";
// import "./emissiontips.css";
// import { Link } from "react-router-dom";
// import { AiTwotoneCloseCircle } from "react-icons/ai";

// const Emissiontips = () => {
//   const currentDate = new Date().toISOString().split("T")[0];
//   const [emissiontips, setEmissiontips] = useState({
//     entry_date: currentDate,
//     tip_text: "",
//     tip_photo: null,
//     tip_video: null,
//   });

//   const [editedTip, setEditedTip] = useState({
//     entry_date: currentDate,
//     id: "",
//     tip_text: "",
//     tip_photo: null,
//     tip_video: null,
//   });

//   const [dailytips, setDailytips] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedTip, setSelectedTip] = useState({});

//   const dailyemissiontips = async () => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         console.error("Access Token not Available");
//         toast.error("Access Token not Available");
//         return;
//       }
//       const response = await axios.get(
//         "http://127.0.0.1:8000/api/admin/emission-tips/",
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (response.status >= 200 && response.status < 300) {
//         setDailytips(response.data);
//         console.log("tips", response.data);
//       } else {
//         console.log("Emission Tips not Updated");
//         toast.error("Emission Tips not Updated");
//       }
//     } catch (error) {
//       console.log("Error Occurred while Updating Tips", error);
//     }
//   };

//   useEffect(() => {
//     dailyemissiontips();
//   }, [setDailytips]);

//   const addemissiontips = async (e) => {
//     e.preventDefault();
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         console.error("Access Token not Available");
//         toast.error("Access Token not Available");
//         return;
//       }

//       const formData = new FormData();

//       if (emissiontips.tip_text !== "") {
//         formData.append("tip_text", emissiontips.tip_text);
//       }
//       if (emissiontips.tip_photo !== null) {
//         formData.append("tip_photo", emissiontips.tip_photo);
//       }
//       if (emissiontips.tip_video !== null) {
//         formData.append("tip_video", emissiontips.tip_video);
//       }

//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/admin/emission-tips/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (response.status >= 200 && response.status < 300) {
//         console.log("Emission Tips Successfully");
//         toast.success("Emission Tips Successfully");
//         setEmissiontips({
//           entry_date: currentDate,
//           tip_text: "",
//           tip_photo: null,
//           tip_video: null,
//         });
//         dailyemissiontips();
//       } else {
//         console.log("Emission Tips not Updated");
//         toast.error("Emission Tips not Updated");
//       }
//     } catch (error) {
//       console.log("Error Occurred while Updating Tips", error);
//     }
//   };

//   const updateEmissionTip = async () => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         console.error("Access Token not Available");
//         toast.error("Access Token not Available");
//         return;
//       }

//       const response = await axios.patch(
//         `http://127.0.0.1:8000/api/admin/emission-tips/detail/`,
//         editedTip,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       if (response.status >= 200 && response.status < 300) {
//         console.log("Emission Tip Updated Successfully");
//         toast.success("Emission Tip Updated Successfully");
//         setShowEditModal(false);
//         dailyemissiontips();
//       } else {
//         console.log("Failed to update Emission Tip");
//         toast.error("Failed to update Emission Tip");
//       }
//     } catch (error) {
//       console.log("Error Occurred while Updating the Tip", error);
//     }
//   };

//   const handleChange = (e, name) => {
//     const newValue =
//       name === "tip_photo" || name === "tip_video"
//         ? e.target.files[0]
//         : e.target.value;

//     setEmissiontips({
//       ...emissiontips,
//       [name]: newValue,
//     });
//   };

//   const handleReadMore = (tip) => {
//     setSelectedTip(tip);
//     setShowModal(true);
//   };

//   const handleEdit = (tip) => {
//     setEditedTip(tip);
//     setShowEditModal(true);
//   };

//   const deleteEmissiontips = async (id) => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         console.error("Access Token not Available");
//         toast.error("Access Token not Available");
//         return;
//       }
//       const response = await axios.delete(
//         "http://127.0.0.1:8000/api/admin/emission-tips/detail/",
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//           data: { id: id },
//         }
//       );
//       if (response.status >= 200 && response.status < 300) {
//         console.log("Emission Tip Deleted Successfully");
//         toast.success("Emission Tip Deleted Successfully");
//         dailyemissiontips();
//       } else {
//         console.log("Failed to delete Emission Tip");
//         toast.error("Failed to delete Emission Tip");
//       }
//     } catch (error) {
//       console.log("Error Occurred while Deleting the Tip", error);
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Navbar />
//       <div className="emi-head">
//         <h2>Emission Tips</h2>
//       </div>
//       <div className="tips-container">
//         <div>
//           <label>Add Emission Tips</label>
//           <textarea
//             type="text"
//             placeholder="Emission Tips (min-200 Words)"
//             name="tip_text"
//             value={emissiontips.tip_text}
//             onChange={(e) => handleChange(e, "tip_text")}
//           />
//           <label className="form-label">Tip Photo</label>
//           <input
//             className="form-input"
//             type="file"
//             onChange={(e) => handleChange(e, "tip_photo")}
//           />
//           <label className="form-label">Tip Video</label>
//           <input
//             className="form-input"
//             type="file"
//             onChange={(e) => handleChange(e, "tip_video")}
//           />
//         </div>

//         <button onClick={addemissiontips}>Submit</button>
//       </div>
//       <div>
//         <div className="dailytips-container mt-5">
//           <div className="column-container">
//             {dailytips.map((tip, index) => (
//               <div key={index} className="card">
//                 <div className="card-body">
//                   <h5 className="card-title">Tips</h5>
//                   <p className="card-subtitle">
//                     Updated Date: {tip.updated_at}
//                   </p>
//                   <p className="card-text">
//                     {tip.tip_text.length > 150 ? (
//                       <>
//                         {tip.tip_text.slice(0, 200)}...
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
//                 <div className="extra-button">
//                   <button className="edit-tips" onClick={() => handleEdit(tip)}>
//                     Edit Tip
//                   </button>

//                   <button
//                     className="del-tips"
//                     onClick={() => deleteEmissiontips(tip.id)}
//                   >
//                     Delete Tip
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {showModal && (
//           <div className="modal-overlay">
//             <div className="modal">
//               <h2>Tip Details</h2>
//               <span
//                 className="close-button"
//                 onClick={() => setShowModal(false)}
//               >
//                 <AiTwotoneCloseCircle />
//               </span>
//               <p>{selectedTip.tip_text}</p>
//             </div>
//           </div>
//         )}

//         {showEditModal && (
//           <div className="edit-modal-overlay">
//             <div className="edit-modal">
//               <h2>Edit Tip</h2>
//               <p name="id" value={editedTip.id}></p>
//               <label>Tip:</label>
//               <textarea
//                 type="text"
//                 placeholder="Edit Emission Tip"
//                 name="tip_text"
//                 value={editedTip.tip_text}
//                 onChange={(e) =>
//                   setEditedTip({
//                     ...editedTip,
//                     tip_text: e.target.value,
//                   })
//                 }
//               />
//               <label>Tip Picure</label>
//               <input
//                 type="file"
//                 name="tip_photo"
//                 value={editedTip.tip_photo}
//                 onChange={(e) =>
//                   setEditedTip({
//                     ...editedTip,
//                     tip_photo: e.target.files,
//                   })
//                 }
//               />
//               <label>Tip Video</label>
//               <input
//                 type="file"
//                 name="tip_video"
//                 value={editedTip.tip_video}
//                 onChange={(e) =>
//                   setEditedTip({
//                     ...editedTip,
//                     tip_video: e.target.files,
//                   })
//                 }
//               />

//               <button onClick={updateEmissionTip}>Save Changes</button>
//               <span
//                 className="close-button"
//                 onClick={() => setShowEditModal(false)}
//               >
//                 <AiTwotoneCloseCircle />
//               </span>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Emissiontips;
