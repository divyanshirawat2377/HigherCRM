// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaEye, FaEyeSlash, FaHome, FaSignOutAlt } from 'react-icons/fa';
// import Sidebar from './Sidebar/Sidebar';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faHome } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
// import {
//     validateFirstName,
//     validateLastName,
//     validatePhone,
//     validateEmail,
//     validatePassword,
//     validateRole
// } from './Components/validate';

// const UserTable = () => {
//     const [departments, setDepartments] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [notification, setNotification] = useState({ message: '', color: '' });
//     const navigate = useNavigate();
//     const [userData, setUserData] = useState(null);
//     const userId = localStorage.getItem('userId');
//     const token = localStorage.getItem('token');

//     const [formErrors, setFormErrors] = useState({
//         first_name: null,
//         last_name: null,
//         phone_no: null,
//         email: null,
//         password: null,
//         dept_id: null,
//         role: null,
//         location: null,
//         emp_id: null,
//         user_status: null,
//     });

//     const [formData, setFormData] = useState({
//         first_name: '',
//         last_name: '',
//         phone_no: '',
//         email: '',
//         password: '',
//         dept_id: '',
//         dept_name: '',
//         role: '',
//         location: '',
//         emp_id: '',
//         user_status: 'active',

//     });

//     const handleDelete = async (user_id) => {
//         try {
//             const response = await fetch('https://highersystem.onrender.com/users', {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 method: 'DELETE',
//                 body: JSON.stringify({ id: user_id }),
//             });
//             const data = await response.json();
//             if (data.message === 'Deleted successfully') {
//                 setUsers(users.filter(user => user.user_id !== user_id));
//             } else {
//                 console.error('Unexpected response:', data);
//                 alert('Failed to delete user.');
//             }
//         } catch (error) {
//             console.error('Error deleting user:', error);
//             alert('Failed to delete user.');
//         }
//     };

//     const verifyToken = async () => {
//         if (!token) {
//             navigate('/');
//             return;
//         }
//         try {
//             const response = await axios.post('https://highersystem.onrender.com/verify-token', {
//                 token: token
//             });
//             console.log('Token is valid:', response.data);
//             navigate('/Usermng');
//         } catch (error) {
//             console.error('Token verification failed:', error.response ? error.response.data : error.message);
//             localStorage.removeItem('token');
//             localStorage.removeItem('tokenExpiry');
//             navigate('/');
//         }
//     };

//     useEffect(() => {
//         verifyToken();
//     }, []);

//     useEffect(() => {
//         const handlePopState = () => {
//             navigate('/Cards');
//         };
//         window.addEventListener('popstate', handlePopState);
//         return () => {
//             window.removeEventListener('popstate', handlePopState);
//         };
//     }, [navigate]);

//     useEffect(() => {
//         fetchDepartments();
//         fetchUsers();
//     }, []);

//     const fetchDepartments = async () => {
//         try {
//             const response = await axios.get('https://highersystem.onrender.com/departments');
//             setDepartments(response.data);
//         } catch (error) {
//             console.error('Error fetching departments:', error);
//         }
//     };

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const response = await axios.get(`https://highersystem.onrender.com/users`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 const user = response.data[0];
//                 setUserData(user);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };
//         if (userId) {
//             fetchUserData();
//         }
//     }, [userId, token]);

//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get('https://highersystem.onrender.com/getusers');
//             setUsers(response.data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { id, value } = e.target;
//         setFormErrors((prevErrors) => ({
//             ...prevErrors,
//             [id]: (() => {
//                 switch (id) {
//                     case 'first_name':
//                         return validateFirstName(value);
//                     case 'last_name':
//                         return validateLastName(value);
//                     case 'phone_no':
//                         return validatePhone(value);
//                     case 'email':
//                         return validateEmail(value);
//                     case 'password':
//                         return validatePassword(value);
//                     case 'role':
//                         return validateRole(value);
//                     default:
//                         return null;
//                 }
//             })(),
//         }));
//         setFormData((prevData) => ({
//             ...prevData,
//             [id]: value,
//         }));
//     };

//     const handleSignUp = async (e) => {
//         e.preventDefault();

//         if (!isFormValid()) {
//             setNotification({ message: 'Please provide all required details.', color: 'red' });
//             return;
//         }
//         try {
//             const selectedDept = departments.find(dept => dept.dept_id === formData.dept_id);
//             const dept_name = selectedDept ? selectedDept.dept_name : '';
//             const payload = {
//                 first_name: formData.first_name,
//                 last_name: formData.last_name,
//                 phone_no: formData.phone_no,
//                 email: formData.email,
//                 password: formData.password,
//                 dept_name: formData.dept_name,
//                 role: formData.role,
//                 location: formData.location,
//                 dept_id: formData.dept_id,
//                 emp_id: formData.emp_id,
//                 user_status: formData.user_status,
//                 // api_access: formData.api_access || [],
//             };
//             console.log('Sending payload:', payload);
//             const response = await axios.post('https://highersystem.onrender.com/signup', payload);
//             if (response.data.message === 'User registered successfully.') {
//                 setNotification({ message: 'Registration successful.', color: 'green' });
//                 setUsers((prevUsers) => [
//                     ...prevUsers,
//                     {
//                         ...formData,
//                         dept_name: dept_name,
//                     }
//                 ]);
//                 setTimeout(() => {
//                     window.location.reload();
//                 }, 2000);
//             } else if (response.data.message === 'Email already exists.') {
//                 setNotification({ message: 'Email already exists.', color: 'red' });
//             } else {
//                 setNotification({ message: 'Registration failed. Please try again.', color: 'red' });
//             }
//         } catch (error) {
//             console.error('Error during registration:', error);
//             // Optional: Log the error response for debugging
//             if (error.response) {
//                 console.error('Error response data:', error.response.data);
//             }
//             setNotification({ message: 'Network error. Please try again later.', color: 'red' });
//         }
//     };

//     const isFormValid = () => {
//         return (
//             formData.first_name &&
//             formData.last_name &&
//             formData.phone_no &&
//             formData.email &&
//             formData.password &&
//             formData.dept_id &&
//             !Object.values(formErrors).some((error) => error !== null)
//         );
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleDepartmentChange = (e) => {
//         const selectedDeptId = parseInt(e.target.value, 10);
//         const selectedDept = departments.find(dept => dept.dept_id === selectedDeptId);

//         setFormData({
//             ...formData,
//             dept_id: selectedDeptId,
//             dept_name: selectedDept ? selectedDept.dept_name : '',
//         });

//         setFormErrors((prevErrors) => ({
//             ...prevErrors,
//             dept_id: selectedDeptId ? null : 'Department is required.',
//         }));
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("userId");
//         localStorage.removeItem("tokenExpiry");
//         console.log('Token:', localStorage.getItem("token"));
//         console.log('User ID:', localStorage.getItem("userId"));
//         console.log('Token Expiry:', localStorage.getItem("tokenExpiry"));
//         navigate('/');
//     };

//     const handleStatusChange = (e) => {
//         const { value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             user_status: value,
//         }));
//     };

//     return (
//         <div className='flex'>
//             <Sidebar />
//             <div className='w-[100%] ml-5'>

//                 {/*************************  Header Start  ******************************/}
//                 <div className="bg-custome-blue rounded-lg  mt-5 w-full h-[82px] p-3 flex justify-between items-center shadow-lg">
//                     <h1 className="text-white text-3xl font-bold">User Management</h1>
//                     {userData && (
//                         <div className="ml-auto flex items-center gap-4">
//                             <div className=" rounded-lg p-2 flex items-center">
//                                 <div className="flex flex-col">
//                                     <h3 className="text-xl font-semibold text-white">
//                                         {userData.first_name} {userData.last_name}
//                                     </h3>
//                                 </div>
//                             </div>
//                             <button
//                                 onClick={handleLogout}
//                                 type="button"
//                                 className="flex items-center p-3 rounded-full transition-all duration-300 ease-in-out ">
//                                 <FaSignOutAlt className="text-white mr-2" size={30} />
//                             </button>
//                         </div>
//                     )}
//                 </div>
//                 {/*************************  Header End  ******************************/}

//                 <button
//                     onClick={() => setIsAddModalOpen(true)}
//                     className="bg-custome-blue text-white px-4 py-2 rounded-2xl mb-4 ml-[40%] mt-4"
//                 >
//                     Add User
//                 </button>

//                 {isAddModalOpen && (
//                     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//                         <div className="bg-white p-6 rounded-3xl w-[553px]">
//                             {notification.message && (
//                                 <div
//                                     className={`mb-4 p-3 text-center text-${notification.color}-500 bg-${notification.color}-100 border border-${notification.color}-300 rounded`}
//                                 >
//                                     {notification.message}
//                                 </div>
//                             )}
//                             <div>
//                                 <h2 className="text-xl font-bold mb-4">Add User</h2>
//                             </div>

//                             <form onSubmit={handleSignUp}>
//                                 {/* First Name and Last Name */}
//                                 <div className="grid gap-4 mb-4 md:grid-cols-2">
//                                     {/* First Name */}
//                                     <div>
//                                         <label htmlFor="first_name">
//                                             First Name <span className="text-red-500">*</span>
//                                         </label>
//                                         <input
//                                             id="first_name"
//                                             value={formData.first_name}
//                                             onChange={handleInputChange}
//                                             className="w-full border border-gray-700 bg-gray-200 rounded-md p-2"
//                                             placeholder="First Name"
//                                         />
//                                         {formErrors.first_name && (
//                                             <span className="text-red-500">{formErrors.first_name}</span>
//                                         )}
//                                     </div>

//                                     {/* Last Name */}
//                                     <div>
//                                         <label htmlFor="last_name">
//                                             Last Name <span className="text-red-500">*</span>
//                                         </label>
//                                         <input
//                                             id="last_name"
//                                             value={formData.last_name}
//                                             onChange={handleInputChange}
//                                             className="w-full border border-gray-700 bg-gray-200 rounded-md p-2"
//                                             placeholder="Last Name"
//                                         />
//                                         {formErrors.last_name && (
//                                             <span className="text-red-500">{formErrors.last_name}</span>
//                                         )}
//                                     </div>
//                                 </div>
//                                 {/* Phone Number and E-mail*/}
//                                 <div className="grid gap-4 mb-4 md:grid-cols-2">
//                                     <div>
//                                         <label htmlFor="phone_no">
//                                             Phone Number <span className="text-red-500">*</span>
//                                         </label>
//                                         <input
//                                             id="phone_no"
//                                             value={formData.phone_no}
//                                             onChange={handleInputChange}
//                                             className="w-full border border-gray-700 bg-gray-200 rounded-md p-2"
//                                             placeholder="Phone Number"
//                                         />
//                                         {formErrors.phone_no && (
//                                             <span className="text-red-500">{formErrors.phone_no}</span>
//                                         )}
//                                     </div>
//                                     <div>
//                                         <label htmlFor="email">
//                                             Email <span className="text-red-500">*</span>
//                                         </label>
//                                         <input
//                                             id="email"
//                                             value={formData.email}
//                                             onChange={handleInputChange}
//                                             className="w-full border border-gray-700 bg-gray-200 rounded-md p-2"
//                                             placeholder="Email"
//                                         />
//                                         {formErrors.email && (
//                                             <span className="text-red-500">{formErrors.email}</span>
//                                         )}
//                                     </div>
//                                 </div>
//                                 {/* Password  and Location */}
//                                 <div className="grid gap-4 mb-4 md:grid-cols-2">
//                                     <div>
//                                         <label htmlFor="password">
//                                             Password <span className="text-red-500">*</span>
//                                         </label>
//                                         <div className="relative">
//                                             <input
//                                                 id="password"
//                                                 type={showPassword ? 'text' : 'password'}
//                                                 value={formData.password}
//                                                 onChange={handleInputChange}
//                                                 className="w-full border border-gray-700 bg-gray-200 rounded-md p-2"
//                                                 placeholder="Password"
//                                             />
//                                             <button
//                                                 type="button"
//                                                 onClick={togglePasswordVisibility}
//                                                 className="absolute right-3 top-3"
//                                             >
//                                                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                             </button>
//                                         </div>
//                                         {formErrors.password && (
//                                             <span className="text-red-500">{formErrors.password}</span>
//                                         )}
//                                     </div>
//                                     <div>
//                                         <label htmlFor="location">
//                                             Location <span className="text-red-500">*</span>
//                                         </label>
//                                         <input
//                                             id="location"
//                                             value={formData.location}
//                                             onChange={handleInputChange}
//                                             className="w-full border border-gray-700 bg-gray-200 rounded-md p-2"
//                                             placeholder="Location"
//                                         />
//                                         {formErrors.location && (
//                                             <span className="text-red-500">{formErrors.location}</span>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* Role and Department*/}
//                                 <div className="grid gap-4 mb-4 md:grid-cols-2">
//                                     <div>
//                                         <label htmlFor="role">
//                                             Role <span className="text-red-500">*</span>
//                                         </label>
//                                         <input
//                                             id="role"
//                                             value={formData.role}
//                                             onChange={handleInputChange}
//                                             className="w-full border border-gray-700 bg-gray-200 rounded-md p-2"
//                                             placeholder="Role"
//                                         />
//                                         {formErrors.role && (
//                                             <span className="text-red-500">{formErrors.role}</span>
//                                         )}
//                                     </div>
//                                     <div>
//                                         <label htmlFor="dept_id">Department <span className="text-red-500">*</span></label>
//                                         <select
//                                             id="dept_id"
//                                             value={formData.dept_id} // Use department_id for the value
//                                             onChange={handleDepartmentChange} // Handle department change
//                                             className="w-full border border-gray-700 bg-gray-200 rounded-md p-2"
//                                         >
//                                             <option value="">Select Department</option>
//                                             {departments.map((dept) => (
//                                                 <option key={dept.dept_id} value={dept.dept_id}>
//                                                     {dept.dept_name}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         {formErrors.dept_id && (
//                                             <span className="text-red-500">{formErrors.dept_id}</span>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* employee_id and status */}
//                                 <div className="grid gap-4 mb-4 md:grid-cols-2">
//                                     <div >
//                                         <label htmlFor="emp_id">
//                                             Employee ID <span className="text-red-500">*</span>
//                                         </label>
//                                         <input
//                                             id="emp_id"
//                                             value={formData.emp_id}
//                                             onChange={handleInputChange}
//                                             className="w-full border border-gray-700 bg-gray-200 rounded-md p-2"
//                                             placeholder="Employee ID"
//                                         />
//                                         {formErrors.emp_id && (
//                                             <span className="text-red-500">{formErrors.emp_id}</span>
//                                         )}
//                                     </div>
//                                     <div >
//                                         <label htmlFor="user_status">
//                                             User Status <span className="text-red-500">*</span>
//                                         </label>
//                                         <div className="flex items-center">
//                                             <label className="mr-4">
//                                                 <input
//                                                     type="radio"
//                                                     name="user_status"
//                                                     value="active"
//                                                     checked={formData.user_status === "active"}
//                                                     onChange={handleStatusChange}
//                                                     className="mr-2"
//                                                 />
//                                                 Active
//                                             </label>
//                                             <label>
//                                                 <input
//                                                     type="radio"
//                                                     name="user_status"
//                                                     value="inactive"
//                                                     checked={formData.user_status === "inactive"}
//                                                     onChange={handleStatusChange}
//                                                     className="mr-2"
//                                                 />
//                                                 Inactive
//                                             </label>
//                                         </div>
//                                         {formErrors.user_status && (
//                                             <span className="text-red-500">{formErrors.user_status}</span>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* Submit Button */}
//                                 <div className="grid gap-4 mb-4 md:grid-cols-2">
//                                     <button
//                                         onClick={() => setIsAddModalOpen(false)}
//                                         className="mt-4 bg-gray-200 text-gray-600 px-4 py-2 rounded-lg w-2/3"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         className="mt-4 bg-blue-600 text-gray-600 px-4 py-2 rounded-lg w-2/3"
//                                     >
//                                         add User
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 )}

//                 <div className="overflow-x-auto">
//                     <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
//                         <thead className="bg-gray-200 text-black">
//                             <tr>
//                                 <th className="py-2 px-4">Employee ID</th>
//                                 <th className="py-2 px-4">First Name</th>
//                                 <th className="py-2 px-4">Last Name</th>
//                                 <th className="py-2 px-4">Phone Number</th>
//                                 <th className="py-2 px-4">Email</th>
//                                 <th className="py-2 px-4">Department</th>
//                                 <th className="py-2 px-4">User Role</th>
//                                 <th className="py-2 px-4">Location</th>
//                                 <th className="py-2 px-4">User Status</th>
//                                 <th className="py-2 px-4">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="6" className="py-4 text-center">No users found</td>
//                                 </tr>
//                             ) : (
//                                 users.map((user) => (
//                                     <tr key={user.email}>
//                                         <td className="py-2 px-4">{user.emp_id}</td>
//                                         <td className="py-2 px-4">{user.first_name}</td>
//                                         <td className="py-2 px-4">{user.last_name}</td>
//                                         <td className="py-2 px-4">{user.phone_no}</td>
//                                         <td className="py-2 px-4">{user.email}</td>
//                                         <td className="py-2 px-4">{user.dept_name}</td>
//                                         <td className="px-4 py-2">{user.role}</td>
//                                         <td className="py-2 px-4">{user.location}</td>
//                                         <td className="py-2 px-4">{user.user_status}</td>
//                                         <td className="py-2 px-4">
//                                             <button
//                                                 className="text-red-500 hover:text-red-700 mr-2"
//                                                 onClick={() => handleDelete(user.user_id)}
//                                             >
//                                                 <FontAwesomeIcon icon={faTrash} />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default UserTable;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaHome, FaSignOutAlt } from 'react-icons/fa';
import Sidebar from './Sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import {
    validateFirstName,
    validateLastName,
    validatePhone,
    validateEmail,
    validatePassword,
    validateRole
} from './Components/validate';

const UserTable = () => {
    const [departments, setDepartments] = useState([]);
    const [locations, setLocations] = useState([]);
    const [users, setUsers] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [notification, setNotification] = useState({ message: '', color: '' });
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const [formErrors, setFormErrors] = useState({
        first_name: null,
        last_name: null,
        phone_no: null,
        email: null,
        password: null,
        dept_id: null,
        locality: null,
        role: null,
        location: null,
        emp_id: null,
        user_status: null,
    });

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_no: '',
        email: '',
        password: '',
        locality: '',
        dept_id: '',
        dept_name: '',
        role: '',
        location: '',
        emp_id: '',
        user_status: 'active',

    });

    const handleDelete = async (user_id) => {
        try {
            const response = await fetch('https://highersystem.onrender.com/users', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'DELETE',
                body: JSON.stringify({ id: user_id }),
            });
            const data = await response.json();
            if (data.message === 'Deleted successfully') {
                setUsers(users.filter(user => user.user_id !== user_id));
            } else {
                console.error('Unexpected response:', data);
                alert('Failed to delete user.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user.');
        }
    };

    const verifyToken = async () => {
        if (!token) {
            navigate('/');
            return;
        }
        try {
            const response = await axios.post('https://highersystem.onrender.com/verify-token', {
                token: token
            });
            console.log('Token is valid:', response.data);
            navigate('/Usermng');
        } catch (error) {
            console.error('Token verification failed:', error.response ? error.response.data : error.message);
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiry');
            navigate('/');
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);

    useEffect(() => {
        const handlePopState = () => {
            navigate('/Cards1');
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    useEffect(() => {
        fetchDepartments();
        fetchLocation();
        fetchUsers();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('https://highersystem.onrender.com/departments');
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const fetchLocation = async () => {
        try {
            const response = await axios.get('https://highersystem.onrender.com/loc');
            setLocations(response.data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://highersystem.onrender.com/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const user = response.data[0];
                setUserData(user);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        if (userId) {
            fetchUserData();
        }
    }, [userId, token]);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await axios.get(`https://highersystem.onrender.com/users`, {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });
    //             const user = response.data[0]; // Adjust this to your user data structure
    //             setUserData(user);
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //         }
    //     };

    //     // Get userId from localStorage
    //     const userId = localStorage.getItem('userId');

    //     if (userId) {
    //         fetchUserData();
    //     }
    // }, [token]); // Remove userId from dependencies if it's static from localStorage

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://highersystem.onrender.com/getusers');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [id]: (() => {
                switch (id) {
                    case 'first_name':
                        return validateFirstName(value);
                    case 'last_name':
                        return validateLastName(value);
                    case 'phone_no':
                        return validatePhone(value);
                    case 'email':
                        return validateEmail(value);
                    case 'password':
                        return validatePassword(value);
                    case 'role':
                        return validateRole(value);
                    default:
                        return null;
                }
            })(),
        }));
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            setNotification({ message: 'Please provide all required details.', color: 'red' });
            return;
        }

        try {
            // Find the selected department and location
            const selectedDept = departments.find(dept => dept.dept_id === formData.dept_id);
            const selectedLocation = locations.find(location => location.location_id === formData.location_id); // Assuming `location_id` is the key for location

            // Extract department name and locality
            const dept_name = selectedDept ? selectedDept.dept_name : '';
            const locality = selectedLocation ? selectedLocation.locality : '';

            // Create the payload including locality
            const payload = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                phone_no: formData.phone_no,
                email: formData.email,
                password: formData.password,
                dept_name: dept_name,
                role: formData.role,
                location: locality, // Add locality to the location field
                dept_id: formData.dept_id,
                emp_id: formData.emp_id,
                user_status: formData.user_status,
                // api_access: formData.api_access || [],
            };

            console.log('Sending payload:', payload);

            const response = await axios.post('https://highersystem.onrender.com/signup', payload);

            if (response.data.message === 'User registered successfully.') {
                setNotification({ message: 'Registration successful.', color: 'green' });

                setUsers((prevUsers) => [
                    ...prevUsers,
                    {
                        ...formData,
                        dept_name: dept_name,
                        location: locality, // Set locality for user data
                    }
                ]);

                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            } else if (response.data.message === 'Email already exists.') {
                setNotification({ message: 'Email already exists.', color: 'red' });
            } else {
                setNotification({ message: 'Registration failed. Please try again.', color: 'red' });
            }

        } catch (error) {
            console.error('Error during registration:', error);

            if (error.response) {
                console.error('Error response data:', error.response.data);
            }

            setNotification({ message: 'Network error. Please try again later.', color: 'red' });
        }
    };

    const isFormValid = () => {
        return (
            formData.first_name &&
            formData.last_name &&
            formData.phone_no &&
            formData.email &&
            formData.password &&
            formData.dept_id &&
            formData.emp_id &&
            formData.user_status &&
            formData.role &&
            formData.location_id &&
            !Object.values(formErrors).some((error) => error !== null)
        );
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleDepartmentChange = (e) => {
        const selectedDeptId = parseInt(e.target.value, 10);
        const selectedDept = departments.find(dept => dept.dept_id === selectedDeptId);

        setFormData({
            ...formData,
            dept_id: selectedDeptId,
            dept_name: selectedDept ? selectedDept.dept_name : '',
        });

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            dept_id: selectedDeptId ? null : 'Department is required.',
        }));
    };

    const handleLocationChange = (e) => {
        const selectedLocationId = parseInt(e.target.value, 10);
        const selectedLocation = locations.find(location => location.location_id === selectedLocationId);

        setFormData({
            ...formData,
            location_id: selectedLocationId,
            location: selectedLocation ? selectedLocation.locality : '', // Assuming locality is stored in the 'locality' field
        });

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            location_id: selectedLocationId ? null : 'Location is required.',
        }));
    };


    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("tokenExpiry");
        console.log('Token:', localStorage.getItem("token"));
        console.log('User ID:', localStorage.getItem("userId"));
        console.log('Token Expiry:', localStorage.getItem("tokenExpiry"));
        navigate('/');
    };

    const handleHome = () => {
        navigate('/Cards1');
    };

    const handleStatusChange = (e) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            user_status: value,
        }));
    };

    return (
        <div className='flex'>
            <Sidebar />
            <div className='p-6 w-full'>

                {/*************************  Header Start  ******************************/}
                <div className="bg-custome-blue rounded-lg w-full p-3 flex justify-between items-center shadow-lg">
                    <button
                        onClick={handleHome}
                        type="button"
                        className="flex items-center p-2 rounded-full ">
                        <FaHome className="text-white mr-2" size={25} />
                    </button>
                    <h1 className="text-white text-2xl font-bold">User Management</h1>
                    {userData && (
                        <div className="ml-auto flex items-center gap-4">
                            <div className="bg-white rounded-3xl p-2 flex items-center">
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-semibold text-custome-black">
                                        {userData.first_name} {userData.last_name}
                                    </h3>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                type="button"
                                className="bg-white flex items-center p-2 rounded-full ">
                                <FaSignOutAlt className="text-black mr-2" size={20} />
                                <span className="text-black font-semibold"></span>
                            </button>
                        </div>
                    )}
                </div>
                {/*************************  Header End  ******************************/}
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-custome-blue w-[17%] text-white px-4 py-2 rounded-2xl mb-4 mt-4 "
                >
                    Add User
                </button>

                {isAddModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-3xl w-[553px]">
                            {notification.message && (
                                <div
                                    className={`mb-4 p-3 text-center text-${notification.color}-500 bg-${notification.color}-100 border border-${notification.color}-300 rounded`}
                                >
                                    {notification.message}
                                </div>
                            )}
                            <div>
                                <h2 className="text-xl font-bold mb-4">Add User</h2>
                            </div>

                            <form onSubmit={handleSignUp}>
                                {/* First Name and Last Name */}
                                <div className="grid gap-4 mb-4 md:grid-cols-2">
                                    {/* First Name */}
                                    <div>
                                        <label htmlFor="first_name">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="first_name"
                                            value={formData.first_name}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-700 bg-gray-200 rounded-md p-2"
                                            placeholder="First Name"
                                        />
                                        {formErrors.first_name && (
                                            <span className="text-red-500">{formErrors.first_name}</span>
                                        )}
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label htmlFor="last_name">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="last_name"
                                            value={formData.last_name}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-700 bg-gray-200 rounded-md p-2"
                                            placeholder="Last Name"
                                        />
                                        {formErrors.last_name && (
                                            <span className="text-red-500">{formErrors.last_name}</span>
                                        )}
                                    </div>
                                </div>
                                {/* Phone Number and E-mail*/}
                                <div className="grid gap-4 mb-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="phone_no">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="phone_no"
                                            value={formData.phone_no}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-700 bg-gray-200 rounded-md p-2"
                                            placeholder="Phone Number"
                                        />
                                        {formErrors.phone_no && (
                                            <span className="text-red-500">{formErrors.phone_no}</span>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="email">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-700 bg-gray-200 rounded-md p-2"
                                            placeholder="Email"
                                        />
                                        {formErrors.email && (
                                            <span className="text-red-500">{formErrors.email}</span>
                                        )}
                                    </div>
                                </div>
                                {/* Password  and Location */}
                                <div className="grid gap-4 mb-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="password">
                                            Password <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-700 bg-gray-200 rounded-md p-2"
                                                placeholder="Password"
                                            />
                                            <button
                                                type="button"
                                                onClick={togglePasswordVisibility}
                                                className="absolute right-3 top-3"
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                        {formErrors.password && (
                                            <span className="text-red-500">{formErrors.password}</span>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="location_id">Location <span className="text-red-500">*</span></label>
                                        <select
                                            id="location_id"
                                            value={formData.location_id} // Use location_id for the value
                                            onChange={handleLocationChange} // Handle location change
                                            className="w-full border border-gray-700 bg-gray-200 rounded-md p-2"
                                        >
                                            <option value="">Select Location</option>
                                            {locations.map((location) => (
                                                <option key={location.location_id} value={location.location_id}>
                                                    {location.city},{location.state},{location.country}
                                                </option>
                                            ))}
                                        </select>
                                        {formErrors.location_id && (
                                            <span className="text-red-500">{formErrors.location_id}</span>
                                        )}
                                    </div>
                                </div>
                                {/* Role and Department*/}
                                <div className="grid gap-4 mb-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="role">
                                            Role <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-700 bg-gray-200 rounded-md p-2"
                                            placeholder="Role"
                                        />
                                        {formErrors.role && (
                                            <span className="text-red-500">{formErrors.role}</span>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="dept_id">Department <span className="text-red-500">*</span></label>
                                        <select
                                            id="dept_id"
                                            value={formData.dept_id} // Use department_id for the value
                                            onChange={handleDepartmentChange} // Handle department change
                                            className="w-full border border-gray-700 bg-gray-200 rounded-md p-2"
                                        >
                                            <option value="">Select Department</option>
                                            {departments.map((dept) => (
                                                <option key={dept.dept_id} value={dept.dept_id}>
                                                    {dept.dept_name}
                                                </option>
                                            ))}
                                        </select>
                                        {formErrors.dept_id && (
                                            <span className="text-red-500">{formErrors.dept_id}</span>
                                        )}
                                    </div>
                                </div>

                                {/* employee_id and status */}
                                <div className="grid gap-4 mb-4 md:grid-cols-2">
                                    <div >
                                        <label htmlFor="emp_id">
                                            Employee ID <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="emp_id"
                                            value={formData.emp_id}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-700 bg-gray-200 rounded-md p-2"
                                            placeholder="Employee ID"
                                        />
                                        {formErrors.emp_id && (
                                            <span className="text-red-500">{formErrors.emp_id}</span>
                                        )}
                                    </div>
                                    <div >
                                        <label htmlFor="user_status">
                                            User Status <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex items-center">
                                            <label className="mr-4">
                                                <input
                                                    type="radio"
                                                    name="user_status"
                                                    value="active"
                                                    checked={formData.user_status === "active"}
                                                    onChange={handleStatusChange}
                                                    className="mr-2"
                                                />
                                                Active
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="user_status"
                                                    value="inactive"
                                                    checked={formData.user_status === "inactive"}
                                                    onChange={handleStatusChange}
                                                    className="mr-2"
                                                />
                                                Inactive
                                            </label>
                                        </div>
                                        {formErrors.user_status && (
                                            <span className="text-red-500">{formErrors.user_status}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="grid gap-4 mb-4 md:grid-cols-2">
                                    <button
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="mt-4 bg-gray-200 text-gray-600 px-4 py-2 rounded-lg w-2/3"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="mt-4 bg-blue-600 text-gray-600 px-4 py-2 rounded-lg w-2/3"
                                    >
                                        add User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
                        <thead className="bg-gray-200 text-black">
                            <tr>
                                <th className="py-2 px-4">Employee ID</th>
                                <th className="py-2 px-4">First Name</th>
                                <th className="py-2 px-4">Last Name</th>
                                <th className="py-2 px-4">Phone Number</th>
                                <th className="py-2 px-4">Email</th>
                                <th className="py-2 px-4">Department</th>
                                <th className="py-2 px-4">User Role</th>
                                <th className="py-2 px-4">Location</th>
                                <th className="py-2 px-4">User Status</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-4 text-center">No users found</td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.email}>
                                        <td className="py-2 px-4">{user.emp_id}</td>
                                        <td className="py-2 px-4">{user.first_name}</td>
                                        <td className="py-2 px-4">{user.last_name}</td>
                                        <td className="py-2 px-4">{user.phone_no}</td>
                                        <td className="py-2 px-4">{user.email}</td>
                                        <td className="py-2 px-4">{user.dept_name}</td>
                                        <td className="px-4 py-2">{user.role}</td>
                                        <td className="py-2 px-4">{user.location}</td>
                                        <td className="py-2 px-4">{user.user_status}</td>
                                        <td className="py-2 px-4">
                                            <button
                                                className="text-red-500 hover:text-red-700 mr-2"
                                                onClick={() => handleDelete(user.user_id)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default UserTable;