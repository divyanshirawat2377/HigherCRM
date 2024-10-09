// import React, { useState, useEffect } from 'react';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import axios from 'axios';
// import {
//   validateFirstName,
//   validateLastName,
//   validatePhone,
//   validateEmail,
//   validatePassword,
//   validateRole
// } from '../Components/validate';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     phone_no: '',
//     email: '',
//     password: '',
//     dept_id: '',
//     role: '',
//     location: '',
//     emp_id: '',
//   });
//   const [formErrors, setFormErrors] = useState({
//     first_name: null,
//     last_name: null,
//     phone_no: null,
//     email: null,
//     password: null,
//     dept_id: null,
//     role: null,
//     location: null,
//     emp_id: null,
//     user_status: null,
//   });
//   const [departments, setDepartments] = useState([]);
//   const [showPassword, setShowPassword] = useState(false);
//   const [user, setUser] = useState({ status: 'active' }); 
//   const [notification, setNotification] = useState({ message: '', color: '' });

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await axios.get('http://43.204.140.118:3001/departments', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setDepartments(response.data || []);
//       } catch (error) {
//         console.error('Error fetching departments:', error);
//       }
//     };
//     fetchDepartments();
//   }, []);

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormErrors((prevErrors) => ({
//       ...prevErrors,
//       [id]: (() => {
//         switch (id) {
//           case 'first_name':
//             return validateFirstName(value);
//           case 'last_name':
//             return validateLastName(value);
//           case 'phone_no':
//             return validatePhone(value);
//           case 'email':
//             return validateEmail(value);
//           case 'password':
//             return validatePassword(value);
//           case 'role':
//             return validateRole(value);
//           default:
//             return null;
//         }
//       })(),
//     }));
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const handleDepartmentChange = (e) => {
//     const selectedDeptId = e.target.value;
//     setFormData({
//       ...formData,
//       dept_id: selectedDeptId,
//     });
//   };

//   const isFormValid = () => {
//     return (
//       formData.first_name &&
//       formData.last_name &&
//       formData.phone_no &&
//       formData.email &&
//       formData.password &&
//       formData.dept_id &&
//       formData.role &&
//       formData.location &&
//       formData.emp_id &&
//       formData.user_status &&
//       !Object.values(formErrors).some((error) => error !== null)
//     );
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     if (!isFormValid()) {
//       setNotification({ message: 'Please provide all required details.', color: 'red' });
//       return;
//     }
//     try {
//       const response = await axios.post('http://43.204.140.118:3001/signup', {
//         first_name: formData.first_name,
//         last_name: formData.last_name,
//         phone_no: formData.phone_no,
//         email: formData.email,
//         password: formData.password,
//         dept_id: formData.dept_id,
//         role: formData.role,
//         location: formData.location,
//         emp_id: formData.emp_id,
//         user_status: formData.user_status,
//       });

//       if (response.data.message === 'User registered successfully.') {
//         setNotification({ message: 'Registration successful.', color: 'green' });
//         setTimeout(() => {
//           window.location.reload();
//         }, 2000);
//       } else if (response.data.message === 'Email already exists.') {
//         setNotification({ message: 'Email already exists.', color: 'red' });
//       } else {
//         setNotification({ message: 'Registration failed. Please try again.', color: 'red' });
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       setNotification({ message: 'Network error. Please try again later.', color: 'red' });
//     }
//   };

//   const handleChange1 = (e) => {
//     const { value } = e.target;
//     setUser((prevUser) => ({
//       ...prevUser,
//       status: value,
//     }));
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="flex min-h-screen">
//       <div className="flex-1 flex items-center justify-center p-4 bg-gray-100">
//         <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
//           {notification.message && (
//             <div
//               className={`mb-4 p-3 text-center text-${notification.color}-500 bg-${notification.color}-100 border border-${notification.color}-300 rounded`}
//             >
//               {notification.message}
//             </div>
//           )}
//           <form onSubmit={handleSignUp}>
//             <div className="mb-4">
//               <label htmlFor="emp_id">
//                 Employee ID <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="emp_id"
//                 value={formData.emp_id}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-md p-2"
//                 placeholder="Employee ID"
//               />
//               {formErrors.emp_id && (
//                 <span className="text-red-500">{formErrors.emp_id}</span>
//               )}
//             </div>

//             <div className="grid gap-4 mb-4 md:grid-cols-2">
//               <div>
//                 <label htmlFor="first_name">
//                   First Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   id="first_name"
//                   value={formData.first_name}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-300 rounded-md p-2"
//                   placeholder="First Name"
//                 />
//                 {formErrors.first_name && (
//                   <span className="text-red-500">{formErrors.first_name}</span>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="last_name">
//                   Last Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   id="last_name"
//                   value={formData.last_name}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-300 rounded-md p-2"
//                   placeholder="Last Name"
//                 />
//                 {formErrors.last_name && (
//                   <span className="text-red-500">{formErrors.last_name}</span>
//                 )}
//               </div>
//             </div>

//             <div className="mb-4">
//               <label htmlFor="phone_no">
//                 Phone Number <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="phone_no"
//                 value={formData.phone_no}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-md p-2"
//                 placeholder="Phone Number"
//               />
//               {formErrors.phone_no && (
//                 <span className="text-red-500">{formErrors.phone_no}</span>
//               )}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="email">
//                 Email <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-md p-2"
//                 placeholder="Email"
//               />
//               {formErrors.email && (
//                 <span className="text-red-500">{formErrors.email}</span>
//               )}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="password">
//                 Password <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   type={showPassword ? 'text' : 'password'}
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-300 rounded-md p-2"
//                   placeholder="Password"
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-3 top-3"
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </button>
//               </div>
//               {formErrors.password && (
//                 <span className="text-red-500">{formErrors.password}</span>
//               )}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="dept_id">Department <span className="text-red-500">*</span></label>
//               <select
//                 id="dept_id"
//                 value={formData.dept_id} // Use department_id for the value
//                 onChange={handleDepartmentChange} // Handle department change
//                 className="w-full border border-gray-300 rounded-md p-2"
//               >
//                 <option value="">Select Department</option>
//                 {departments.map((dept) => (
//                   <option key={dept.dept_id} value={dept.dept_id}>
//                     {dept.dept_name}
//                   </option>
//                 ))}
//               </select>
//               {formErrors.dept_id && (
//                 <span className="text-red-500">{formErrors.dept_id}</span>
//               )}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="role">
//                 Role <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="role"
//                 value={formData.role}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-md p-2"
//                 placeholder="Role"
//               />
//               {formErrors.role && (
//                 <span className="text-red-500">{formErrors.role}</span>
//               )}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="location">
//                 Location <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="location"
//                 value={formData.location}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-md p-2"
//                 placeholder="Location"
//               />
//               {formErrors.location && (
//                 <span className="text-red-500">{formErrors.location}</span>
//               )}
//             </div>

//             <div className="flex flex-col mb-3">
//               <label className="mb-2">Status:<span className='text-red-500'>*</span></label>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   name="status"
//                   value="active"
//                   checked={user.status === 'active'}
//                   onChange={handleChange1}
//                   className="mr-2"
//                 />
//                 <label className="mr-4">Active</label>
//                 <input
//                   type="radio"
//                   name="status"
//                   value="inactive"
//                   checked={user.status === 'inactive'}
//                   onChange={handleChange1}
//                   className="mr-2"
//                 />
//                 <label>Inactive</label>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white p-3 rounded-md"
//               disabled={!isFormValid()}
//             >
//               Register
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Register;






import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import {
  validateFirstName,
  validateLastName,
  validatePhone,
  validateEmail,
  validatePassword,
  validateRole
} from '../Components/validate';

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_no: '',
    email: '',
    password: '',
    dept_id: '',
    role: '',
    location: '',
    emp_id: '',
    user_status: 'active', // Added default user_status
  });

  const [formErrors, setFormErrors] = useState({
    first_name: null,
    last_name: null,
    phone_no: null,
    email: null,
    password: null,
    dept_id: null,
    role: null,
    location: null,
    emp_id: null,
    user_status: null,
  });
  const [departments, setDepartments] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({ message: '', color: '' });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://43.204.140.118:3001/departments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setDepartments(response.data || []);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    fetchDepartments();
  }, []);

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

  const handleDepartmentChange = (e) => {
    const selectedDeptId = e.target.value;
    setFormData({
      ...formData,
      dept_id: selectedDeptId,
    });
  };

  const isFormValid = () => {
    return (
      formData.first_name &&
      formData.last_name &&
      formData.phone_no &&
      formData.email &&
      formData.password &&
      formData.dept_id &&
      formData.role &&
      formData.location &&
      formData.emp_id &&
      formData.user_status && // Added user_status validation
      !Object.values(formErrors).some((error) => error !== null)
    );
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setNotification({ message: 'Please provide all required details.', color: 'red' });
      return;
    }
    try {
      const response = await axios.post('http://43.204.140.118:3001/signup', formData);
      if (response.data.message === 'User registered successfully.') {
        setNotification({ message: 'Registration successful.', color: 'green' });
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
      setNotification({ message: 'Network error. Please try again later.', color: 'red' });
    }
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      user_status: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center p-4 bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          {notification.message && (
            <div
              className={`mb-4 p-3 text-center text-${notification.color}-500 bg-${notification.color}-100 border border-${notification.color}-300 rounded`}
            >
              {notification.message}
            </div>
          )}
          <form onSubmit={handleSignUp}>
            {/* Employee ID */}
            <div className="mb-4">
              <label htmlFor="emp_id">
                Employee ID <span className="text-red-500">*</span>
              </label>
              <input
                id="emp_id"
                value={formData.emp_id}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Employee ID"
              />
              {formErrors.emp_id && (
                <span className="text-red-500">{formErrors.emp_id}</span>
              )}
            </div>

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
                  className="w-full border border-gray-300 rounded-md p-2"
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
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Last Name"
                />
                {formErrors.last_name && (
                  <span className="text-red-500">{formErrors.last_name}</span>
                )}
              </div>
            </div>


            {/* Phone Number */}
            <div className="mb-4">
              <label htmlFor="phone_no">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone_no"
                value={formData.phone_no}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Phone Number"
              />
              {formErrors.phone_no && (
                <span className="text-red-500">{formErrors.phone_no}</span>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Email"
              />
              {formErrors.email && (
                <span className="text-red-500">{formErrors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
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

            {/* Location */}
            <div className="mb-4">
              <label htmlFor="location">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                id="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Location"
              />
              {formErrors.location && (
                <span className="text-red-500">{formErrors.location}</span>
              )}
            </div>

            {/* Role */}
            <div className="mb-4">
              <label htmlFor="role">
                Role <span className="text-red-500">*</span>
              </label>
              <input
                id="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Role"
              />
              {formErrors.role && (
                <span className="text-red-500">{formErrors.role}</span>
              )}
            </div>

            {/* Department */}
            <div className="mb-4">
              <label htmlFor="dept_id">Department <span className="text-red-500">*</span></label>
              <select
                id="dept_id"
                value={formData.dept_id} // Use department_id for the value
                onChange={handleDepartmentChange} // Handle department change
                className="w-full border border-gray-300 rounded-md p-2"
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

            {/* User Status */}
            <div className="mb-4">
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md py-2"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;