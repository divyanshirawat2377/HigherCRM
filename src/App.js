import React from 'react';
import { Routes, Route } from 'react-router-dom';


import AdminSidebar from "./Sidebar/AdminSidebar";
import HRMSidebar from './Sidebar/HRMSidebar';
import UserSidebar from "./Sidebar/UserSidebar";
import Sidebar from './Sidebar/Sidebar';
import Designation from "./Designation";



import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import UserLogin from "./Pages/UserLogin";
import Profile from "./Profile";
import Role from "./Role";
import Login1 from "./Pages/Login1";
import Button from "./Login/Button";
import Inputfield from './Login/Inputfield';
import Loginform from './Login/Loginform';

import UserProfile from "./UserProfile";
import AMS from "./AMS";
import Departments from "./Departments";
import Location from "./Location";
import Cards from "./Cards";
import Cards1 from "./Cards1";
import UCS from "./UCS";
import HRMS from "./HRMS";
import Domain from "./Domain";
import Usermng from "./Usermng";
import DynamicForm from './DynamicForm';
import Verify from "./Pages/Verify";
import Password from "./Pages/Password";


function App() {
  return (
    <div className='Main'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Login1' element={<Login1 />} />
        <Route path='/UserLogin' element={<UserLogin />} />
        
        <Route path='/Adminsidebar' element={<AdminSidebar />} />
        <Route path='/UserSidebar' element={<UserSidebar />} />
        <Route path='/HRMSidebar' element={<HRMSidebar/>}/>
        <Route path='/Sidebar' element={<Sidebar />} /> 
        <Route path='/Designation' element={<Designation />}/>
        <Route path='/Role' element={<Role />} />
        <Route path='/Button' element={<Button/>} />
        <Route path='/Loginform' element={<Loginform />} />
        <Route path='/Inputfield' element={<Inputfield />} />
        <Route path='/Password' element={<Password />} />

        <Route path="/Profile" element={<Profile />} />
        <Route path='/AMS' element={<AMS />} />
        <Route path='/UserProfile' element={<UserProfile />} />
        <Route path='/Departments' element={<Departments />} />
        <Route path='/Location' element={<Location/>} />
        <Route path='/Cards' element={<Cards />} />
        <Route path='/HRMS' element={<HRMS/>} />
        <Route path='/Cards1' element={<Cards1 />} />
        <Route path='/Domain' element={<Domain />} />
        <Route path='/Usermng' element={<Usermng />} /> 
        <Route path='/DynamicForm' element={<DynamicForm />} />
        <Route path='/UCS' element={<UCS />} />
        <Route path='/Verify' element={<Verify />} />
      </Routes>
    </div>
  );
}

export default App;
