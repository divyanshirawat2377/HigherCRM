
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import login from '../assests/login.jpg';

// const PasswordResetPopup = ({ email, onSendOtp, onClose }) => {
//   const [showPasswordResetPopup, setShowPasswordResetPopup] = useState(false);
//   const [showOtpVerificationPopup, setShowOtpVerificationPopup] = useState(false);

//   const handleSendOtp = async () => {
//     try {
//       const response = await axios.post('http://43.204.140.118:3001/request-otp', { email });
//       if (response.status) {
//         alert('OTP sent to your email');
//         onSendOtp(email); // Call the onSendOtp function to update the state in the Login component
//       }
//     } catch (err) {
//       console.error('Error sending OTP:', err);
//       alert('Failed to send OTP. Please try again.');
//     } finally {
//       onClose();
//     }
//   };
//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//       <div className="bg-white p-8 rounded-md shadow-lg">
//         <h3 className="text-2xl font-bold mb-4">Password Reset Required</h3>
//         <p className="mb-4">Please reset your password. Enter your email to receive an OTP.</p>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="text"
//             value={email}
//             disabled
//             className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
//           />
//         </div>
//         <div className="flex justify-end">
//           <button
//             type="button"
//             onClick={onClose}
//             className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mr-2"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => handleSendOtp(email)}
//             className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
//           >
//             Send OTP
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// };

// const OtpVerificationPopup = ({ email, onVerifyOtp, onClose }) => {
//   const [otp, setOtp] = useState('');
//   const [ showPasswordConfirmPopup, setShowPasswordConfirmPopup] = useState(false);

//   const handleVerifyOtp = async (email, otp) => {
//     try {
//       const response = await axios.post('http://43.204.140.118:3001/verify-otp', { email, otp });
//       if (response.status) {
//         alert('OTP verified successfully');
//         // setShowOtpVerificationPopup(false);
//          setShowPasswordConfirmPopup(true);
//         onVerifyOtp(email, otp);
//       }
//     } catch (err) {
//       console.error('Error verifying OTP:', err);
//       alert('Failed to verify OTP. Please try again.');
//     } finally {
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//       <div className="bg-white p-8 rounded-md shadow-lg">
//         <h3 className="text-2xl font-bold mb-4">Enter OTP</h3>
//         <p className="mb-4">An OTP has been sent to your email. Please enter it below to verify your email.</p>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="text"
//             value={email}
//             disabled
//             className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">OTP</label>
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//             placeholder="Enter OTP"
//           />
//         </div>
//         <div className="flex justify-end">
//           <button
//             type="button"
//             onClick={onClose}
//             className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mr-2"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleVerifyOtp}
//             className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
//           >
//             Verify OTP
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PasswordConfirmPopup = ({ email, onResetPassword, onClose }) => {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleResetPassword = async () => {
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
//     try {
//       const response = await axios.post('http://43.204.140.118:3001/reset-password', {
//         email,
//         password,
//       });
//       if (response.status) {
//         alert('Password reset successfully');
//         onResetPassword();
//       }
//     } catch (err) {
//       console.error('Error resetting password:', err);
//       alert('Failed to reset password. Please try again.');
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//       <div className="bg-white p-8 rounded-md shadow-lg">
//         <h3 className="text-2xl font-bold mb-4">Reset Password</h3>
//         <p className="mb-4">Please enter your new password and confirm it.</p>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="text"
//             value={email}
//             disabled
//             className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//             placeholder="Enter Password"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Confirm Password</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//             placeholder="Confirm Password"
//           />
//         </div>
//         {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
//         <div className="flex justify-end">
//           <button
//             type="button"
//             onClick={onClose}
//             className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mr-2"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleResetPassword}
//             className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
//           >
//             Reset Password
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const[confirmPassword, setConfirmPassword] = useState('');
//   const[onResetPassword, setOnResetPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPasswordResetPopup, setShowPasswordResetPopup] = useState(false);
//   const [showOtpVerificationPopup, setShowOtpVerificationPopup] = useState(false);
//   const [showPasswordConfirmPopup, setShowPasswordConfirmPopup] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedEmail = localStorage.getItem('email');
//     if (storedEmail) {
//       setEmail(storedEmail);
//     }
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (loading) return;
//     if (!email) {
//       setError('Email is required');
//       return;
//     }
//     if (!validateEmail(email)) {
//       setError('Please enter a valid email address');
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.post('http://43.204.140.118:3001/login', {
//         email,
//         password,
//       });
//       const { token, userId } = response.data;
//       if (token && userId) {
//         localStorage.setItem('token', token);
//         localStorage.setItem('userId', userId);
//         if (rememberMe) {
//           localStorage.setItem('email', email);
//         } else {
//           localStorage.removeItem('email');
//         }
//         setSuccess('Login successful!');
//         setError('');
//         setTimeout(() => {
//           navigate('/Cards');
//         }, 1000);
//       } else {
//         throw new Error('Token or User ID not received');
//       }
//     } catch (err) {
//       console.error('Error during login:', err);
//       if (err.response && err.response.data && err.response.data.message) {
//         const previewMessage = err.response.data.message;
//         if (previewMessage === 'Password reset required. Please change your password.') {
//           setShowPasswordResetPopup(true);
//         } else {
//           setError(previewMessage);
//         }
//       } else {
//         setError('Invalid email or password. Please try again.');
//       }
//       setSuccess('');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSendOtp = async (email) => {
//     try {
//       const response = await axios.post('http://43.204.140.118:3001/request-otp', { email });
//       if (response.status) {
//         alert('OTP sent to your email');
//         // setShowPasswordResetPopup(false);
//         setShowOtpVerificationPopup(true);
//       }
//     } catch (err) {
//       console.error('Error sending OTP:', err);
//       alert('Failed to send OTP. Please try again.');
//     }
//   };

//   const handleVerifyOtp = async (email, otp) => {
//     try {
//       const response = await axios.post('http://43.204.140.118:3001/verify-otp', { email, otp });
//       if (response.status) {
//         alert('OTP verified successfully');
//         //setShowOtpVerificationPopup(false);
//         setShowPasswordConfirmPopup(true);
//       }
//     } catch (err) {
//       console.error('Error verifying OTP:', err);
//       alert('Failed to verify OTP. Please try again.');
//     } 
//   };

//   const handleResetPassword = async () => {
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
//     try {
//       const response = await axios.post('http://43.204.140.118:3001/reset-password', {
//         email,
//         password,
//       });
//       if (response.status) {
//         alert('Password reset successfully');
//         onResetPassword();
//       }
//     } catch (err) {
//       console.error('Error resetting password:', err);
//       alert('Failed to reset password. Please try again.');
//     }
//   };

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="h-screen flex">
//       <div className="w-1/2 flex justify-center items-center">
//         <img src={login} alt="Login Illustration" className="object-cover h-[100%]" />
//       </div>

//       <div className="w-1/2 bg-custom-gray flex justify-center items-center">
//         <div className="p-8 rounded-lg w-full max-w-md">
//           <h2 className="text-5xl font-bold text-center text-custome-blue mb-6">Welcome</h2>
//           <form onSubmit={handleLogin}>
//             {/* Email Input */}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                   <i className="fas fa-envelope text-black-500"></i>
//                 </span>
//                 <input
//                   type="text"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   placeholder="Enter Email"
//                 />
//               </div>
//             </div>

//             {/* Password Input */}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                   <i className="fas fa-lock text-black-500"></i>
//                 </span>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   placeholder="Enter Password"
//                 />
//                 <span
//                   className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
//                   onClick={togglePasswordVisibility}
//                 >
//                   {showPassword ? <FaEye /> : <FaEyeSlash />}
//                 </span>
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={() => setRememberMe(!rememberMe)}
//                   className="form-checkbox text-blue-600"
//                 />
//                 <span className="ml-2 text-gray-700">Remember me</span>
//               </label>
//             </div>

//             {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
//             {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

//             <button
//               type="submit"
//               className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//               disabled={loading}
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Password Reset Popup */}
//       {showPasswordResetPopup && (
//         <PasswordResetPopup
//           email={email}
//           onSendOtp={handleSendOtp}
//           onClose={() => setShowPasswordResetPopup(false)}
//         />
//       )}

//       {/* OTP Verification Popup */}
//       {showOtpVerificationPopup && (
//         <OtpVerificationPopup
//           email={email}
//           onVerifyOtp={handleVerifyOtp}
//           onClose={() => setShowOtpVerificationPopup(false)}
//         />
//       )}

//       {showPasswordConfirmPopup && (
//         <PasswordConfirmPopup
//           email={email}
//           onResetPassword={handleResetPassword}
//           onClose={() => setShowPasswordConfirmPopup(false)}
//         />
//       )}
//     </div>
//   );
// };
// export default Login;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import login from '../assests/login.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPasswordResetPopup, setShowPasswordResetPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://43.204.140.118:3001/login', {
        email,
        password,
      });
      const { token, userId } = response.data;
      if (token && userId) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        if (rememberMe) {
          localStorage.setItem('email', email);
        } else {
          localStorage.removeItem('email');
        }
        setSuccess('Login successful!');
        setError('');
        setTimeout(() => {
          navigate('/Cards');
        }, 1000);
      } else {
        throw new Error('Token or User ID not received');
      }
    } catch (err) {
      console.error('Error during login:', err);
      if (err.response && err.response.data && err.response.data.message) {
        const previewMessage = err.response.data.message;
        if (previewMessage === 'Password reset required. Please change your password.') {
          setShowPasswordResetPopup(true);
        } else {
          setError(previewMessage);
        }
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen flex">
      <div className="w-1/2 flex justify-center items-center">
        <img src={login} alt="Login Illustration" className="object-cover h-[100%]" />
      </div>

      <div className="w-1/2 bg-custom-gray flex justify-center items-center">
        <div className="p-8 rounded-lg w-full max-w-md">
          <h2 className="text-5xl font-bold text-center text-custome-blue mb-6">Welcome</h2>
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="fas fa-envelope text-black-500"></i>
                </span>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter Email"
                />
              </div>
            </div>
            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="fas fa-lock text-black-500"></i>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter Password"
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="form-checkbox text-blue-600"
                />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
            </div>

            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

            <button
              type="submit"
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;