// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaUser, FaBox } from 'react-icons/fa';
// import logo from './Logo.png';

// const Sidebar = () => {
//     return (
//         <div className="w-52 border bg-white p-5 rounded-lg ml-5 mt-6 h-screen  flex flex-col overflow-hidden">
//             <div>
//                 <img src={logo} alt="logo" className='mb-10 mt-15  '/>
//             </div>
//             <ul className="flex-grow list-none p-0">
//                 <li className="mb-2">
//                     <Link to="/Departments" className="flex items-center p-2 text-black rounded transition-colors hover:bg-blue-600 hover:text-white">
//                         <FaUser className="mr-2" /> Department
//                     </Link>
//                 </li>
//                 <li className="mb-2">
//                     <Link to="" className="flex items-center p-2 text-black rounded transition-colors hover:bg-blue-600 hover:text-white">
//                         <FaBox className="mr-2" /> Audit Logs
//                     </Link>
//                 </li>
//             </ul>
//         </div>
//     );
// };
// export default Sidebar;



// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaUser} from 'react-icons/fa';
// import logo from '../assests/Logo.png';

// const Sidebar = () => {
//     return (
//         <div className="w-[15%] border bg-white p-5 rounded-lg ml-5 mt-5 h-screen  flex flex-col overflow-hidden">
//             <div className='border-b border-gray-300 pb-4 mb-4'>
//                 <img src={logo} alt="logo" className=' w-full '/>
//             </div>
//             <ul className="flex-grow list-none p-0">
//                 <li className="mt-3">
//                     <Link to="/Departments" className="flex items-center p-2 text-black rounded transition-colors hover:bg-blue-600 hover:text-white">
//                         <FaUser className="mr-2" /> Department
//                     </Link>
//                 </li>
//                 <li className="mt-3">
//                     <Link to="/Location" className="flex items-center p-2 text-black rounded transition-colors hover:bg-blue-600 hover:text-white">
//                         <FaUser className="mr-2" /> Location
//                     </Link>
//                 </li>
//                 <li className="mt-3">
//                     <Link to="/Usermng" className="flex items-center p-2 text-black rounded transition-colors hover:bg-blue-600 hover:text-white">
//                         <FaUser className="mr-2" /> Users
//                     </Link>
//                 </li>
//                 <li className="mt-3">
//                     <Link to="/Designation" className="flex items-center p-2 text-black rounded transition-colors hover:bg-blue-600 hover:text-white">
//                         <FaUser className="mr-2" /> Designation
//                     </Link>
//                 </li>
//             </ul>
//         </div>
//     );
// };
// export default Sidebar;


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import logo from '../assests/Logo.png';

const Sidebar = () => { 
    const location = useLocation();

    return (
        <div className="w-[15%] border bg-white p-5 rounded-lg ml-5 mt-5 h-screen flex flex-col overflow-hidden">
            <div className='border-b border-gray-300 pb-4 mb-4'>
                <img src={logo} alt="logo" className='w-full' />
            </div>
            <ul className="flex-grow list-none p-0">
                <li className="mt-3">
                    <Link
                        to="/Departments"
                        className={`flex items-center p-2 text-black rounded transition-colors ${location.pathname === '/Departments' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}>
                        <FaUser className="mr-2" /> Department
                    </Link>
                </li>
                <li className="mt-3">
                    <Link
                        to="/Location"
                        className={`flex items-center p-2 text-black rounded transition-colors ${location.pathname === '/Location' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}>
                        <FaUser className="mr-2" /> Location
                    </Link>
                </li>
                <li className="mt-3">
                    <Link
                        to="/Designation"
                        className={`flex items-center p-2 text-black rounded transition-colors ${location.pathname === '/Designation' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}>
                        <FaUser className="mr-2" /> Designation
                    </Link>
                </li>
                <li className="mt-3">
                    <Link
                        to="/Role"
                        className={`flex items-center p-2 text-black rounded transition-colors ${location.pathname === '/Role' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}>
                        <FaUser className="mr-2" /> Role
                    </Link>
                </li>
                <li className="mt-3">
                    <Link
                        to="/Domain"
                        className={`flex items-center p-2 text-black rounded transition-colors ${location.pathname === '/Domain' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}>
                        <FaUser className="mr-2" /> Domain
                    </Link>
                </li>
                <li className="mt-3">
                    <Link
                        to="/Usermng"
                        className={`flex items-center p-2 text-black rounded transition-colors ${location.pathname === '/Usermng' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}>
                        <FaUser className="mr-2" /> Users
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
