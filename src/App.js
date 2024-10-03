import React from 'react';
import { Routes, Route } from 'react-router-dom';


import AdminSidebar from "./Sidebar/AdminSidebar";
import Deptsidebar from './Sidebar/Deptsidebar';
import UserSidebar from "./Sidebar/UserSidebar";
import Sidebar from './Sidebar/Sidebar';
import LocSidebar from './Sidebar/LocSidebar';



import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import UserLogin from "./Pages/UserLogin";
import Profile from "./Profile";

import UserProfile from "./UserProfile";
import AMS from "./AMS";
import Departments from "./Departments";
import Location from "./Location";
import Cards from "./Cards";
import Cards1 from "./Cards1";
import Usermng from "./Usermng";
import DynamicForm from './DynamicForm';


function App() {
  return (
    <div className='Main'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/UserLogin' element={<UserLogin />} />
        
        
        <Route path='/Adminsidebar' element={<AdminSidebar />} />
        <Route path='/UserSidebar' element={<UserSidebar />} />
        <Route path='/Deptsidebar' element={<Deptsidebar/>}/>
        <Route path='/LocSidebar' element={<LocSidebar />} /> 
        <Route path='/Sidebar' element={<Sidebar />} /> 


        <Route path="/Profile" element={<Profile />} />
        <Route path='/AMS' element={<AMS />} />
        <Route path='/UserProfile' element={<UserProfile />} />
        <Route path='/Departments' element={<Departments />} />
        <Route path='/Location' element={<Location/>} />
        <Route path='/Cards' element={<Cards />} />
        <Route path='/Cards1' element={<Cards1 />} />
        <Route path='/Usermng' element={<Usermng />} /> 
        <Route path='/DynamicForm' element={<DynamicForm />} />
      </Routes>
    </div>
  );
}

export default App;
