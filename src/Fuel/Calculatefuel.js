import axios from "axios";
import React, { useState } from "react";
import "./calculatefuel.css";
import Navbar from "../Headers&Footers/Headers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";

const Calculatefuel = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [fuel, setFuel] = useState({
    entry_date: currentDate,
    electricity: { value: null, unit: "Unit" },
    diesel: { value: null, unit: "L" },
    petrol: { value: null, unit: "L" },
  });
  const [food, setFood] = useState({
    entry_date: currentDate,
    food_type: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFuel((prevFuel) => ({
      ...prevFuel,
      [name]: { ...prevFuel[name], value },
    }));
  };

  const handleUnitChange = (name, unit) => {
    setFuel((prevFuel) => ({
      ...prevFuel,
      [name]: { ...prevFuel[name], unit },
    }));
  };

  const handleFuel = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/fuel-used/",
        {
          entry_date: fuel.entry_date,
          electricity: fuel.electricity.value,
          diesel: fuel.diesel.value,
          petrol: fuel.petrol.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Value Updated Successfully");
        toast.success("Fuel Updated Successfully");
        window.location.reload();
      } else if (response.status === 401) {
        console.log("Unauthorized: Please check your access token");
        toast.error("Unauthorized: Please check your access token");
      } else {
        console.log(`Error: ${response.status} - ${response.statusText}`);
        toString.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.log("Error getting details", error);
      toast.error("Error getting details", error);
    }
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFood((prevFood) => ({
      ...prevFood,
      [name]: value,
    }));
  };

  const handleFood = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/daily-food-choices/",
        food,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Value Updated Successfully");
        toast.success("Food Updated Successfully");
        window.location.reload();
      } else if (response.status === 401) {
        console.log("Unauthorized: Please check your access token");
        toast.error("Unauthorized: Please check your access token");
      } else {
        console.log(`Error: ${response.status} - ${response.statusText}`);
        toast.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.log("Error getting details", error);
      toast.error("Error getting details", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div>
        <div className="calculatefuel">
          <div>
            <h2>Enter your Fuel details :</h2>
          </div>
          <form onSubmit={handleFuel}>
            <div>
              <h4>Current Date: {currentDate}</h4>
              <label>Electricity</label>
              <input
                type="number"
                placeholder="Electricity"
                name="electricity"
                value={fuel.electricity.value}
                onChange={handleChange}
              />
              <select
                value={fuel.electricity.unit}
                onChange={(e) =>
                  handleUnitChange("electricity", e.target.value)
                }
              >
                <option value="Unit">Unit</option>
              </select>
            </div>
            <div>
              <label>Diesel</label>
              <input
                type="number"
                placeholder="Diesel"
                name="diesel"
                value={fuel.diesel.value}
                onChange={handleChange}
              />
              <select
                value={fuel.diesel.unit}
                onChange={(e) => handleUnitChange("diesel", e.target.value)}
              >
                <option value="L">Liters</option>
              </select>
            </div>

            <div>
              <label>Petrol</label>
              <input
                type="number"
                placeholder="Petrol"
                name="petrol"
                value={fuel.petrol.value}
                onChange={handleChange}
              />
              <select
                value={fuel.petrol.unit}
                onChange={(e) => handleUnitChange("petrol", e.target.value)}
              >
                <option value="L">Liters</option>
              </select>
            </div>
            <button type="submit">
              {/* {" "}
              {loading ? (
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height={20}
                  width={50}
                />
              ) : (
                "Submit"
              )} */}Submit
            </button>
          </form>
        </div>
        <div className="calculatefood">
          <div>
            <h3>Enter Your food Details below :- </h3>
          </div>
          <form onSubmit={handleFood}>
            <label>Food Type</label>
            <select
              value={food.food_type}
              name="food_type"
              onChange={handleChange1}
            >
              <option value="" disabled>
                Select Food Type
              </option>
              <option value="vegetarian">Vegetarian</option>
              <option value="non_vegetarian">Non-Vegetarian</option>
              <option value="ovo_vegetarian">Ovo-Vegetarian</option>
            </select>
            <br />
            <button type="submit">
              {/* {loading ? (
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height={20}
                  width={50}
                />
              ) : (
                "Submit"
              )} */} Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Calculatefuel;
