/****************NEW CODE*****************/
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaUser, FaBox, FaSignOutAlt } from 'react-icons/fa';
// import logo from './Logo.png';
// import axios from 'axios';

// const AdminSidebar = () => {
//     const navigate = useNavigate();
//     const [hasAMSAccess, setHasAMSAccess] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [userId, setUserId] = useState(null);

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("userId");
//         localStorage.removeItem("tokenExpiry");

//         console.log('Token:', localStorage.getItem("token"));
//         console.log('User ID:', localStorage.getItem("userId"));
//         console.log('Token Expiry:', localStorage.getItem("tokenExpiry"));
//         navigate('/');
//     };

//     const checkTokenExpiry = () => {
//         const tokenExpiry = localStorage.getItem('tokenExpiry');
//         if (new Date().getTime() > tokenExpiry) {
//             navigate('/');
//         } else {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const checkAMSAccess = async () => {
//             setLoading(true);
//             try {
//                 let user_id = localStorage.getItem('userId');
//                 setUserId(user_id);
//                 const response = await axios.get('https://highersystem.onrender.com/access', {
//                     headers: {
//                         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 const userAccess = response.data;
//                 let userIdData = userAccess.filter(item => item.user_id == user_id);
//                 const hasAccess = userIdData.some(access => access.api_name === 'update_access');
//                 setHasAMSAccess(hasAccess);
//             } catch (error) {
//                 console.error('Error fetching access rights:', error);
//                 setHasAMSAccess(false);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         checkAMSAccess();
//     }, []);

//     const handleButtonClick = () => {
//         checkTokenExpiry();
//         navigate('/AMS');
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="w-52 bg-white p-5 shadow-lg h-screen flex flex-col">
//             <div>
//                 <img src={logo} alt="logo" className='mb-5 mt-15' />
//             </div>
//             <ul className="flex-grow list-none p-0">
//                 <li className="mb-2">
//                     <Link to="/Profile" className="flex items-center p-2 text-black rounded transition-colors hover:bg-blue-600 hover:text-white">
//                         <FaUser className="mr-2" /> Profile
//                     </Link>
//                 </li>
//             </ul>

          
//         </div>
//     );
// };
// export default AdminSidebar;






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
                    <Link to="/Profile" className="flex items-center p-2 text-black rounded transition-colors hover:bg-blue-600 hover:text-white">
                        <FaUser className="mr-2" /> Profile
                    </Link>
                </li>
                {/* <li className="mt-3">
                    <Link to="" className="flex items-center p-2 text-black rounded transition-colors hover:bg-blue-600 hover:text-white">
                        <FaBox className="mr-2" /> Audit Logs
                    </Link>
                </li> */}
            </ul>
        </div>
    );
};
export default Sidebar;