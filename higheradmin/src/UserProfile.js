// import React, { useEffect, useState } from 'react';
// import { FaSignOutAlt } from 'react-icons/fa';
// import UserSidebar from './UserSidebar';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const UserProfile = () => {
//     const navigate = useNavigate();
//     const [profile, setProfile] = useState({
//         customerID: '',
//         customerName: '',
//         contactPerson: '',
//         phone: '',
//         gstNumber: '',
//         email: '',
//         addressLine1: '',
//         city: '',
//         state: '',
//         pincode: '',
//         country: ''
//     });

//     useEffect(() => {
//         axios.get('https://highersystem.onrender.com/customerprofile')
//             .then(response => setProfile(response.data))
//             .catch(error => console.error('Error fetching profile', error));
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("userId");
//         localStorage.removeItem("tokenExpiry");
//         navigate('/');
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             <UserSidebar />
//             <div className="p-6 w-full">

//                 {/*************************  Header Start  ******************************/}
//                 <div className="bg-blue-600 rounded-lg  w-full p-3 flex justify-between items-center shadow-lg">
//                     <h1 className="text-white text-xl font-bold">Profile</h1>
//                     <button
//                         onClick={handleLogout}
//                         type="button"
//                         className="flex items-center p-3 rounded-full hover:bg-blue-500 transition-all duration-300 ease-in-out">
//                         <FaSignOutAlt className="text-white mr-2" size={30} />
//                     </button>
//                 </div>
//                 {/*************************  Header End  ******************************/}

//                 <div className="bg-white rounded-lg p-6 mt-6 shadow-md">

//                     <div className="mb-8">
//                         <h3 className="text-lg font-medium mb-4">CUSTOMER DETAILS:</h3>

//                         <div className="mb-4">
//                             <label className="block text-gray-700 font-semibold">Customer ID</label>
//                             <p className="text-gray-600">{profile.customerID}</p>
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700 font-semibold">Customer Name</label>
//                             <p className="text-gray-600">{profile.customerName}</p>
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700 font-semibold">GST Number</label>
//                             <p className="text-gray-600">{profile.gstNumber}</p>
//                         </div>
//                     </div>

//                     <div>
//                         <h3 className="text-lg font-medium mb-4">CONTACT DETAILS:</h3>

//                         <div className="mb-4">
//                             <label className="block text-gray-700 font-semibold">Contact Person</label>
//                             <p className="text-gray-600">{profile.contactPerson}</p>
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700 font-semibold">Phone Number</label>
//                             <p className="text-gray-600">{profile.phone}</p>
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700 font-semibold">Email ID</label>
//                             <p className="text-gray-600">{profile.email}</p>
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700 font-semibold">Address</label>
//                             <p className="text-gray-600">{profile.addressLine1}</p>
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700 font-semibold">City</label>
//                             <p className="text-gray-600">{profile.city}</p>
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700 font-semibold">State</label>
//                             <p className="text-gray-600">{profile.state}</p>
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700 font-semibold">Pincode</label>
//                             <p className="text-gray-600">{profile.pincode}</p>
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700 font-semibold">Country</label>
//                             <p className="text-gray-600">{profile.country}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default UserProfile;


import React, { useEffect, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import UserSidebar from './Sidebar/UserSidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        customerID: '',
        customerName: '',
        contactPerson: '',
        phone: '',
        gstNumber: '',
        email: '',
        addressLine1: '',
        city: '',
        state: '',
        pincode: '',
        country: ''
    });

    // Fetch the user profile data based on the stored user ID
    useEffect(() => {
        const userId = localStorage.getItem("userId"); // Get user ID from localStorage
        if (userId) {
            axios.get(`https://highersystem.onrender.com/customerprofile/${userId}`) // Send user ID in the request
                .then(response => setProfile(response.data))
                .catch(error => console.error('Error fetching profile', error));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("tokenExpiry");
        navigate('/');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <UserSidebar />
            <div className="p-6 w-full">

                {/*************************  Header Start  ******************************/}
                <div className="bg-blue-600 rounded-lg  w-full p-3 flex justify-between items-center shadow-lg">
                    <h1 className="text-white text-xl font-bold">Profile</h1>
                    <button
                        onClick={handleLogout}
                        type="button"
                        className="flex items-center p-3 rounded-full hover:bg-blue-500 transition-all duration-300 ease-in-out">
                        <FaSignOutAlt className="text-white mr-2" size={30} />
                    </button>
                </div>
                {/*************************  Header End  ******************************/}

                <div className="bg-white rounded-lg p-6 mt-6 shadow-md">

                    <div className="mb-8">
                        <h3 className="text-lg font-medium mb-4">CUSTOMER DETAILS:</h3>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Customer ID</label>
                            <p className="text-gray-600">{profile.customerID}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Customer Name</label>
                            <p className="text-gray-600">{profile.customerName}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">GST Number</label>
                            <p className="text-gray-600">{profile.gstNumber}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium mb-4">CONTACT DETAILS:</h3>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Contact Person</label>
                            <p className="text-gray-600">{profile.contactPerson}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Phone Number</label>
                            <p className="text-gray-600">{profile.phone}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Email ID</label>
                            <p className="text-gray-600">{profile.email}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Address</label>
                            <p className="text-gray-600">{profile.addressLine1}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">City</label>
                            <p className="text-gray-600">{profile.city}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">State</label>
                            <p className="text-gray-600">{profile.state}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Pincode</label>
                            <p className="text-gray-600">{profile.pincode}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold">Country</label>
                            <p className="text-gray-600">{profile.country}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

