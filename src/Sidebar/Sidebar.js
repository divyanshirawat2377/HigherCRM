import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import logo from '../assests/Logo.png';

const Sidebar = () => {
    return (
        <div className="w-[15%] border bg-white p-5 rounded-lg ml-5 mt-5 h-screen  flex flex-col overflow-hidden">
            <div className='border-b border-gray-300 pb-4 mb-4'>
                <img src={logo} alt="logo" className=' w-full '/>
            </div>
            <ul className="flex-grow list-none p-0">
                <li className="mt-3">
                    <Link to="/Usermng" className="flex items-center p-2 text-black rounded transition-colors hover:bg-blue-600 hover:text-white">
                        <FaUser className="mr-2" /> Users
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