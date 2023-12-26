
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Registration from './Components/Registration';
import Userprofile from './Components/userprofile';
import Calculatefuel from './Fuel/Calculatefuel'
import Editprofile from './Components/Editprofile';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import GetFuel from './Fuel/GetFuel';
import Monthlyemission from './Fuel/Monthlyemission';
import Goaldetails from './Goal/Goaldetails';
import SetGoal from './Goal/SetGoal';
import AdminLogin from './Admin/adminLogin';
import { useEffect, useState } from 'react';
import Emissiontips from './Admin/emissiontips';
import Favtips from './Favourite-Tips/Favouritetips';
import EmissionLeaderboard from './leaderboard/EmissionLeaderboard';
import Sidebar from './Sidebar/Sidebar';
import GoalDifference from './Goal/GoalDifference';
import Logout from './Components/Logout';
import About from './Admin/About';
// import Favouritelist from './Favourite-Tips/favouritelist';

function App() {
  const [loggedin, setLoggedin] = useState(false);
  // const navigate= useNavigate();
  const role = localStorage.getItem('userRole');
  // console.log("rollllllllllllll", role);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token && role) {
      setLoggedin(true);
    } else {
      // navigate('/');

    }
  }, [])
  return (
    <div>

      <BrowserRouter>
        <Routes>

          <Route index element={<Registration />} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/admin' element={<AdminLogin />} />

          {loggedin &&
            (role === "admin" || role === "user") && (
              <Route
                path='/dashboard'
                element={
                  <Sidebar>
                    <Dashboard />
                  </Sidebar>
                } />
            )}

          {loggedin &&
            (role === "admin" || role === "user") && (
              <Route path='/profile' element={
                <Sidebar>
                  <Userprofile />
                </Sidebar>} />
            )}

          {loggedin &&
            (role === "admin" || role === "user") && (
              <Route path='/profile/edit-profile' element={
                <Sidebar>
                  <Editprofile />
                </Sidebar>} />
            )}

          {loggedin &&
            (role === "admin" || role === "user") && (
              <Route path='/profile/calculate-fuel' element={
                <Sidebar>
                  <Calculatefuel />
                </Sidebar>} />
            )}

          {loggedin &&
            (role === "admin" || role === "user") && (
              <Route path='/profile/fuel-details' element={
                <Sidebar>
                  <GetFuel />
                </Sidebar>} />
            )}

          {loggedin &&
            (role === "admin" || role === "user") && (
              <Route path='/profile/monthly-fuel' element={
                <Sidebar>
                  <Monthlyemission />
                </Sidebar>} />
            )}

          {loggedin &&
            (role === "admin" || role === "user") && (
              <Route path='/profile/goal-details' element={
                <Sidebar>
                  <Goaldetails />
                </Sidebar>} />
            )}

          {loggedin &&
            (role === "admin" || role === "user") && (
              <Route path='/profile/set-goal' element={
                <Sidebar>
                  <SetGoal />
                </Sidebar>} />
            )}


          {loggedin &&
            (role === "admin" || role === "user") && (
              <Route path='/profile/goal-difference' element={
                <Sidebar>
                  <GoalDifference />
                </Sidebar>} />
            )}

          {loggedin &&
            (role === "admin" || role === "user") && (
              <Route path='/profile/favourite-tips' element={
                <Sidebar>
                  <Favtips />
                </Sidebar>} />
            )}

          {loggedin &&
            (role === "admin" || role === "user") && (
              <Route path='/profile/leaderboard' element={
                <Sidebar>
                  <EmissionLeaderboard />
                </Sidebar>} />
            )}

          {loggedin &&
            (role === "admin" || role === "user") && (
              <Route path='/about' element={
                <Sidebar>
               <About />
                </Sidebar>} />
            )}

          {/* {loggedin &&
            (role === "admin" || role === "user") && (
              <Route path='/' element={
                <Sidebar>
                  <Logout />
                </Sidebar>} />
            )} */}
          {/* <Route path='/profile/calculate-fuel' element={<Calculatefuel />} /> */}
          {/* <Route path='/profile/fuel-details' element={<GetFuel></GetFuel>} /> */}
          {/* <Route path='/profile/monthly-fuel' element={<Monthlyemission />} /> */}
          {/* <Route path='/profile/goal-details' element={<Goaldetails />} /> */}
          {/* <Route path='/profile/set-goal' element={<SetGoal />} /> */}
          {/* <Route path='/profile/favourite-tips' element={<Favtips />} /> */}
          {/* <Route path='/profile/leaderboard' element={<EmissionLeaderboard />} /> */}

          {loggedin &&
            (role === "admin") && (
              <Route path='/admin/emission-tips' element={
                <Sidebar>
                  <Emissiontips />
                </Sidebar>} />
            )
          }
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
