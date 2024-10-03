// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaTachometerAlt, FaUser, FaBox, FaSignOutAlt } from 'react-icons/fa';
// import './UserSidebar.css';

// const Sidebar = () => {
//     return (
//         <div className="sidebar">
//             <h2>HIGH<span>ER</span> INDIA</h2>
//             <ul>
//                 <li><Link to="/UserDashboard"><FaTachometerAlt className="icon" />  Dashboard</Link></li>
//                 <li><Link to="/UserProfile"><FaUser className="icon" /> Profile</Link></li>
//                 <li><Link to="/UserProduct"><FaBox className="icon" /> Purchase Order Details </Link></li>
//                 {/* <li><Link to="/UserTDS"><FaBox className="icon"/> TDS Certificate</Link></li> */}
//                 <li><Link to="/Login"><FaSignOutAlt className="icon" /> Log Out </Link></li>
//             </ul>
//         </div>
//     );
// };
// export default Sidebar;

import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser} from 'react-icons/fa';
import logo from '../assests/Logo.png';

const Sidebar = () => {
    return (
        <div className="w-[15%] border bg-white p-5 rounded-lg ml-5 mt-5 h-screen  flex flex-col overflow-hidden">
            <div className='border-b border-gray-300 pb-4 mb-4'>
                <img src={logo} alt="logo" className=' w-full '/>
            </div>
            <ul className="flex-grow list-none p-0">
                <li className="mt-3">
                    <Link to="/UserPRofile" className="flex items-center p-2 text-black rounded transition-colors hover:bg-blue-600 hover:text-white">
                        <FaUser className="mr-2" /> Profile
                    </Link>
                </li>
            </ul>
        </div>
    );
};
export default Sidebar;