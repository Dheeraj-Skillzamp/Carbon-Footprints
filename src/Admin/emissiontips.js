import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../Headers&Footers/Headers';
import './emissiontips.css';

import { Link } from 'react-router-dom';
import { AiTwotoneCloseCircle } from 'react-icons/ai';

const Emissiontips = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const [emissiontips, setEmissiontips] = useState({
        entry_date: currentDate,
        tip_text: '',
    });

    const [editedTip, setEditedTip] = useState({
        entry_date: currentDate,
        id:'',
        tip_text: '',
    });

    const [dailytips, setDailytips] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTip, setSelectedTip] = useState({});

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
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status >= 200 && response.status < 300) {
                setDailytips(response.data);
                
                console.log("tips", response.data);
            } else {
                console.log('Emission Tips not Updated');
                toast.error('Emission Tips not Updated');
            }
        } catch (error) {
            console.log('Error Occurred while Updating Tips', error);
        }
    };

    useEffect(() => {
        dailyemissiontips();
    }, []);

    const addemissiontips = async (e) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                console.error('Access Token not Available');
                toast.error('Access Token not Available');
                return;
            }

            const response = await axios.post('http://127.0.0.1:8000/api/admin/emission-tips/', emissiontips, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.status >= 200 && response.status < 300) {
                console.log('Emission Tips Successfully');
                toast.success('Emission Tips Successfully');
                setEmissiontips({
                    entry_date: currentDate,
                    tip_text: '',
                });
                dailyemissiontips();
            } else {
                console.log('Emission Tips not Updated');
                toast.error('Emission Tips not Updated');
            }
        } catch (error) {
            console.log("Error Occurred while Updating Tips", error);
        }
    };

    const updateEmissionTip = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                console.error('Access Token not Available');
                toast.error('Access Token not Available');
                return;
            }

            const response = await axios.patch(
                `http://127.0.0.1:8000/api/admin/emission-tips/detail/`,
                editedTip,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status >= 200 && response.status < 300) {
                console.log('Emission Tip Updated Successfully');
                toast.success('Emission Tip Updated Successfully');
                setShowEditModal(false);
                dailyemissiontips();
                // Perform any additional actions after successful update if needed
            } else {
                console.log('Failed to update Emission Tip');
                toast.error('Failed to update Emission Tip');
            }
        } catch (error) {
            console.log('Error Occurred while Updating the Tip', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmissiontips({
            ...emissiontips,
            [name]: value,
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
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                console.error('Access Token not Available');
                toast.error('Access Token not Available');
                return;
            }

            const response = await axios.delete('http://127.0.0.1:8000/api/admin/emission-tips/detail/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                data: { id: id }, 
            });

            if (response.status >= 200 && response.status < 300) {
                console.log('Emission Tip Deleted Successfully');
                toast.success('Emission Tip Deleted Successfully');
                dailyemissiontips();
               
            } else {
                console.log('Failed to delete Emission Tip');
                toast.error('Failed to delete Emission Tip');
            }
        } catch (error) {
            console.log('Error Occurred while Deleting the Tip', error);
        }
    };

    return (
        <>
            <ToastContainer />
            <Navbar />
            <div className='emi-head'>
                <h2>Emission Tips</h2>
            </div>
            <div className='tips-container'>
                <div>
                    <label>Add Emission Tips</label>
                    <textarea
                        type='text'
                        placeholder='Emission Tips'
                        name='tip_text'
                        value={emissiontips.tip_text}
                        onChange={handleChange}
                    />
                </div>

                <button onClick={addemissiontips}>Submit</button>
            </div>

            <div>
                {/* <h2 className='emi-tip'>Emission Tips</h2> */}
                <div className="dailytips-container mt-5">
                    <div className="column-container">
                        {dailytips.map((tip, index) => (
                            <div key={index} className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Tips</h5>
                                    <p className="card-subtitle">Updated Date: {tip.updated_at}</p>

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
                                <div className='extra-button'>
                                    <button className='edit-tips' onClick={() => handleEdit(tip)}>
                                        Edit Tip
                                    </button>

                                    <button className='del-tips' onClick={() => deleteEmissiontips(tip.id)}>
                                        Delete Tip
                                    </button>
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
                            <p>{selectedTip.tip_text}</p>
                        </div>
                    </div>
                )}

                {showEditModal && (
                    <div className="edit-modal-overlay">
                        <div className="edit-modal">
                            <h2>Edit Tip</h2>
                            <p
                            name='id'
                            value={editedTip.id}></p>
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
}

export default Emissiontips;
