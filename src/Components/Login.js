import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Login.css";
import { FcManager } from "react-icons/fc";
import { GoogleLogin } from "react-google-login";

const clientId =
  "541547830041-ll8mudkm38ra86s4eibvtjsjmtgds3ql.apps.googleusercontent.com";

const Login = () => {
  const [data, setData] = useState({
    email: "",
  });
  const [otp, setOtp] = useState({
    otp: "",
  });
  const [otpSentSuccessfully, setOtpSentSuccessfully] = useState(false);
  const [loadingSendOTP, setloadingSendOTP] = useState(false);
  const [loadingVerifyOTP, setLoadingVerifyOTP] = useState(false);
  const navigate = useNavigate();
  const [showOTP, setShowOTP] = useState(false);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || ""
  );
  const [inputError, setInputError] = useState({
    message: "",
    shaking: false,
  });

  const headers = {
    "Content-Type": "application/json",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setOtp({
      ...otp,
      [name]: value,
    });
  };

  const handleResendOTP = async () => {
    try {
      setloadingSendOTP(true);
      if (!data.email) {
        setInputError({
          message: "Please enter your email",
          shaking: true,
        });
        setloadingSendOTP(false);
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/resend-otp/",
        data,
        { headers }
      );

      if (response.status === 200) {
        console.log("OTP Resent Successfully");
        setOtpSentSuccessfully(true);
        setShowOTP(true);
        toast.success("OTP Resent Successfully");
      } else {
        console.log("Error resending OTP");
        toast.error("Error resending OTP");
      }
    } catch (error) {
      console.log("Error resending OTP", error);
      toast.error("Error resending OTP");
    } finally {
      setloadingSendOTP(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      setLoadingVerifyOTP(true);
      if (!otp.otp) {
        setInputError({
          message: "Please enter the OTP",
          shaking: true,
        });
        setLoadingVerifyOTP(false);
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/verify-otp/",
        {
          email: data.email,
          otp: otp.otp,
        },
        { headers }
      );

      console.log("Verify OTP Response:", response.data);

      if (
        response.status === 200 &&
        response.data.message === "OTP verified successfully"
      ) {
        console.log("OTP Verified");
        toast.success("OTP Verified");
        const newAccessToken = response.data.access_token;
        setAccessToken(newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);
        const userToken = localStorage.setItem("userRole", "user");
        
        navigate("/dashboard");
      } else {
        console.log("OTP verification failed");
        toast.error("OTP Verification Failed. Try Again");
        navigate("/login")
      }
    } catch (error) {
      console.log("OTP Verification Failed. Try Again", error);
      toast.error("OTP Verification Failed. Try Again");
    } finally {
      setLoadingVerifyOTP(false);
    }
  };

  const onSuccess = (res) => {
    console.log("Login success", res.profileObj);
    
    // const newAccessToken = res.profileObj.googleId;
    // console.log(newAccessToken);
    // setAccessToken(newAccessToken);
    // localStorage.setItem("accessToken", newAccessToken);
    // const userToken = localStorage.setItem("userRole", "user");
    // navigate("/dashboard");
  };
  const onFailure = (res) => {
    console.log("Login fail", res);
  };

  return (
    <div>
      <ToastContainer />
      <div className="mainn-container">
        <div className="form-containerr">
          <div>
            <div className="iconnn">
              <FcManager fontSize={"8rem"} />
            </div>
            <h2>User Login</h2>
            <div className={` ${inputError.shaking ? "shake" : ""}`}>
              <label>E-mail :</label>
              <input
                className="in-email"
                placeholder="Enter your Email"
                name="email"
                onChange={handleChange}
              ></input>
              <button onClick={handleResendOTP} disabled={loadingSendOTP}>
                {loadingSendOTP
                  ? "Sending OTP..."
                  : otpSentSuccessfully
                  ? "OTP Sent Successfully!"
                  : "Send OTP"}
              </button>
              <p
                className="error-message"
                style={{ color: "red", textAlign: "end" }}
              >
                {inputError.message}
              </p>
            </div>
            {showOTP && (
              <div className={`otp-container ${showOTP ? "show" : "hide"}`}>
                <label>Enter OTP :</label>
                <input
                  placeholder="OTP"
                  name="otp"
                  onChange={handleChange1}
                ></input>
                <button onClick={handleVerifyOTP} disabled={loadingVerifyOTP}>
                  {loadingVerifyOTP ? "Verifying..." : "Verify OTP"}
                </button>
                <p
                  className="error-message"
                  style={{ color: "red", textAlign: "end" }}
                >
                  {inputError.message}
                </p>
              </div>
            )}
          </div>
          <div className="not-user-container">
            <Link to="/">
              <p>Not registered Yet? </p>
            </Link>
            <Link to="/admin">
              <p>Admin Login</p>
            </Link>
          </div>
          <div
            id="signInButton"
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            <GoogleLogin
              clientId={clientId}
              buttonText="Login with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
