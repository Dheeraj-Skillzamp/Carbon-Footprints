
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <div>
     
      <BrowserRouter>
      <Routes>

        <Route index element={ <Registration/>}/>
        <Route path='/login' element={<Login></Login>}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Userprofile/>}/>       
        <Route path='/profile/edit-profile' element={<Editprofile />} />
        <Route path='/profile/calculate-fuel' element={<Calculatefuel />} />
        <Route path='/profile/fuel-details' element={<GetFuel></GetFuel>}/>
        <Route path='/profile/monthly-fuel' element= {<Monthlyemission />} />
        <Route path='/profile/goal-details' element={<Goaldetails />} />
        <Route path='/profile/set-goal' element={<SetGoal />} />

        </Routes>
        </BrowserRouter>
    </div>
   
  );
}

export default App;
