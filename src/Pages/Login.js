// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (loading) return; 
//     if (!email || !password) {
//       setError('Both fields are required');
//       return;
//     }
//     if (!validateEmail(email)) {
//       setError('Please enter a valid email address');
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.post('https://highersystem.onrender.com/login', {
//         email,
//         password,
//       });
//       const { token, userId } = response.data;
//       if (token && userId) {
//         localStorage.setItem('token', token);
//         localStorage.setItem('userId', userId);
//         setSuccess('Login successful!');
//         setError('');
//         setTimeout(() => {
//           navigate('/Profile');
//         }, 1000);
//       } else {
//         throw new Error('Token or User ID not received');
//       }
//     } catch (err) {
//       console.error('Error during login:', err);
//       if (err.response && err.response.data && err.response.data.error) {
//         setError(err.response.data.error);
//       } else {
//         setError('Invalid email or password. Please try again.');
//       }
//       setSuccess('');
//     } finally {
//       setLoading(false); 
//     }
//   };

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 rounded-lg focus:outline-none focus:ring-2 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//         {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
//         {success && <p className="mt-4 text-green-600 text-center">{success}</p>}
//       </div>
//     </div>
//   );
// };
// export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';
// import login from '../loginimg.jpg';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (loading) return;
//     if (!email || !password) {
//       setError('Both fields are required');
//       return;
//     }
//     if (!validateEmail(email)) {
//       setError('Please enter a valid email address');
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.post('https://highersystem.onrender.com/login', {
//         email,
//         password,
//       });
//       const { token, userId } = response.data;
//       if (token && userId) {
//         localStorage.setItem('token', token);
//         localStorage.setItem('userId', userId);
//         setSuccess('Login successful!');
//         setError('');
//         setTimeout(() => {
//           navigate('/Profile');
//         }, 1000);
//       } else {
//         throw new Error('Token or User ID not received');
//       }
//     } catch (err) {
//       console.error('Error during login:', err);
//       if (err.response && err.response.data && err.response.data.error) {
//         setError(err.response.data.error);
//       } else {
//         setError('Invalid email or password. Please try again.');
//       }
//       setSuccess('');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   return (
//     <div className="h-screen flex">
//       {/* Left side with image */}
//       <div className="w-1/2 bg-#79DFEE-200 flex justify-center items-center ">
//         <img src={login} alt="Login Illustration" className="object-cover w-[90%] h-full" />
//       </div>

//       {/* Right side with login form */}
//       <div className="w-1/2 bg-yellow-100 flex justify-center items-center">
//         <div className= "p-8 rounded-lg  w-full max-w-md">
//           <h2 className="text-2xl font-bold text-center mb-6">Welcome Back!</h2>
//           <form onSubmit={handleLogin}>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Enter email:
//               </label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-2">
//                   <i className="fas fa-user text-gray-400"></i>
//                 </span>
//                 <input
//                   type="text"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   placeholder="Enter Email"
//                 />
//               </div>
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-2">
//                   <i className="fas fa-lock text-gray-400"></i>
//                 </span>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   placeholder="password"
//                 />
//                 <span className="absolute inset-y-0 right-0 flex items-center pr-2">
//                   <i className="fas fa-eye-slash text-gray-400"></i>
//                 </span>
//               </div>
//               {/* <div className="text-right mt-2">
//                 <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Forgot Password?</a>
//               </div> */}
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-2 rounded-lg focus:outline-none focus:ring-2 ${loading ? 'bg-gray-400' : 'bg-teal-500 hover:bg-teal-600'} text-white`}
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//           </form>
//           {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
//           {success && <p className="mt-4 text-green-600 text-center">{success}</p>}
//           {/* <div className="mt-6 flex items-center justify-center">
//             <div className="border-t border-gray-300 w-24"></div>
//             <span className="mx-4 text-sm text-gray-500">or login with</span>
//             <div className="border-t border-gray-300 w-24"></div>
//           </div> */}
//           {/* <button className="mt-4 flex items-center justify-center w-full py-2 rounded-lg bg-white border border-gray-300 text-gray-500 hover:bg-gray-50">
//             <img src="path_to_google_logo.png" alt="Google Logo" className="w-5 h-5 mr-3" />
//             Login with Google
//           </button> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import login from '../login.jpg';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (loading) return;
//     if (!email || !password) {
//       setError('Both fields are required');
//       return;
//     }
//     if (!validateEmail(email)) {
//       setError('Please enter a valid email address');
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.post('https://highersystem.onrender.com/login', {
//         email,
//         password,
//       });
//       const { token, userId } = response.data;
//       if (token && userId) {
//         localStorage.setItem('token', token);
//         localStorage.setItem('userId', userId);
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
//       if (err.response && err.response.data && err.response.data.error) {
//         setError(err.response.data.error);
//       } else {
//         setError('Invalid email or password. Please try again.');
//       }
//       setSuccess('');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   return (
//     <div className="h-screen flex">
//       <div className="w-1/2 bg-79DFEE-200 flex justify-center items-center ">
//         <img src={login} alt="Login Illustration" className="object-cover h-[100%]" />
//       </div>

//       <div className="w-1/2 bg-blue-100 flex justify-center items-center">
//         <div className= "p-8 rounded-lg  w-full max-w-md">
//           <h2 className="text-3xl font-bold text-center mb-6">Welcome</h2>
//           <form onSubmit={handleLogin}>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Enter email:
//               </label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-2">
//                   <i className="fas fa-user text-gray-400"></i>
//                 </span>
//                 <input
//                   type="text"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   placeholder="Enter Email"
//                 />
//               </div>
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-2">
//                   <i className="fas fa-lock text-gray-400"></i>
//                 </span>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   placeholder="password"
//                 />
//                 <span className="absolute inset-y-0 right-0 flex items-center pr-2">
//                   <i className="fas fa-eye-slash text-gray-400"></i>
//                 </span>
//               </div>
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-2 rounded-lg focus:outline-none focus:ring-2 ${loading ? 'bg-gray-400' : 'bg-teal-500 hover:bg-teal-600'} text-white`}
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//           </form>
//           {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
//           {success && <p className="mt-4 text-green-600 text-center">{success}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';
// import login from '../login.jpg'; // Your uploaded image path
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (loading) return;
//     if (!email || !password) {
//       setError('Both fields are required');
//       return;
//     }
//     if (!validateEmail(email)) {
//       setError('Please enter a valid email address');
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.post('https://highersystem.onrender.com/login', {
//         email,
//         password,
//       });
//       const { token, userId } = response.data;
//       if (token && userId) {
//         localStorage.setItem('token', token);
//         localStorage.setItem('userId', userId);
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
//       if (err.response && err.response.data && err.response.data.error) {
//         setError(err.response.data.error);
//       } else {
//         setError('Invalid email or password. Please try again.');
//       }
//       setSuccess('');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   return (
//     <div className="h-screen flex">
//       {/* Left Section */}
//       <div className="w-1/2 bg-blue-500 flex justify-center items-center">
//         <img src={login} alt="Login Illustration" className="object-cover h-[80%]" />
//       </div>

//       {/* Right Section */}
//       <div className="w-1/2 bg-gray-100 flex justify-center items-center">
//         <div className="p-8 rounded-lg w-full max-w-md">
//           <h2 className="text-4xl font-bold text-center mb-6">Welcome</h2>
//           <form onSubmit={handleLogin}>
//             {/* Email Input */}
//             <div className="mb-4">
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                   <i className="fas fa-user text-gray-400"></i>
//                 </span>
//                 <input
//                   type="text"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   placeholder="Email, Username, Phone"
//                 />
//               </div>
//             </div>

//             {/* Password Input */}
//             <div className="mb-4">
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                   <i className="fas fa-lock text-gray-400"></i>
//                 </span>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   placeholder="Password"
//                 />
//                 <span className="absolute inset-y-0 right-0 flex items-center pr-3">
//                   <i className="fas fa-eye-slash text-gray-400"></i>
//                 </span>
//               </div>
//               <div className="flex justify-between items-center mt-2">
//                 <label className="text-sm">
//                   <input type="checkbox" className="mr-1" />
//                   Remember me
//                 </label>
//                 {/* <a href="#" className="text-sm text-blue-600">Forgot Password?</a> */}
//               </div>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-3 rounded-lg focus:outline-none focus:ring-2 ${loading ? 'bg-gray-400' : 'bg-gray-700 hover:bg-gray-800'} text-white`}
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </button>

//             <div className="flex items-center justify-center my-4">
//               <span className="border-t w-1/3"></span>
//               <span className="px-2 text-sm text-gray-500">or</span>
//               <span className="border-t w-1/3"></span>
//             </div>

//             {/* Google Login */}
//             <button
//               type="button"
//               className="w-full py-3 flex items-center justify-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-700 bg-white hover:bg-gray-100"
//             >
//               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google Logo" className="w-5 h-5 mr-2" />
//               Login with Google
//             </button>

//           </form>

//           {/* Error & Success Messages */}
//           {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
//           {success && <p className="mt-4 text-green-600 text-center">{success}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Login;



// import React, { useState } from 'react';
// import axios from 'axios';
// import login from '../login.jpg'; // Your uploaded image path
// import { useNavigate } from 'react-router-dom';


// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (loading) return;
//     if (!email || !password) {
//       setError('Both fields are required');
//       return;
//     }
//     if (!validateEmail(email)) {
//       setError('Please enter a valid email address');
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.post('https://highersystem.onrender.com/login', {
//         email,
//         password,
//       });
//       const { token, userId } = response.data;
//       if (token && userId) {
//         localStorage.setItem('token', token);
//         localStorage.setItem('userId', userId);
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
//       if (err.response && err.response.data && err.response.data.error) {
//         setError(err.response.data.error);
//       } else {
//         setError('Invalid email or password. Please try again.');
//       }
//       setSuccess('');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   return (
//     <div className="h-screen flex">
//       {/* Left Section */}
//       <div className="w-1/2 bg-blue-500 flex justify-center items-center">
//         <img src={login} alt="Login Illustration" className="object-cover h-[80%]" />
//       </div>

//       {/* Right Section */}
//       <div className="w-1/2 bg-gray-100 flex justify-center items-center">
//         <div className="p-8 rounded-lg w-full max-w-md">
//           <h2 className="text-4xl font-bold text-center mb-6">Welcome</h2>
//           <form onSubmit={handleLogin}>
//             {/* Email Input */}
//             <div className="mb-4">
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                   <i className="fas fa-envelope text-gray-400"></i> {/* Email Icon */}
//                 </span>
//                 <input
//                   type="text"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   placeholder="Email"
//                 />
//               </div>
//             </div>

//             {/* Password Input */}
//             <div className="mb-4">
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                   <i className="fas fa-lock text-gray-400"></i> {/* Password Icon */}
//                 </span>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   placeholder="Password"
//                 />
//               </div>
//               <div className="flex justify-between items-center mt-2">
//                 <label className="text-sm">
//                   <input type="checkbox" className="mr-1" />
//                   Remember me
//                 </label>
//                 <a href="#" className="text-sm text-blue-600">Forgot Password?</a>
//               </div>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-3 rounded-lg focus:outline-none focus:ring-2 ${loading ? 'bg-gray-400' : 'bg-gray-700 hover:bg-gray-800'} text-white`}
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </button>

//             <div className="flex items-center justify-center my-4">
//               <span className="border-t w-1/3"></span>
//               <span className="px-2 text-sm text-gray-500">or</span>
//               <span className="border-t w-1/3"></span>
//             </div>

//             {/* Google Login */}
//             <button
//               type="button"
//               className="w-full py-3 flex items-center justify-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-700 bg-white hover:bg-gray-100"
//             >
//               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google Logo" className="w-5 h-5 mr-2" />
//               Login with Google
//             </button>

//           </form>

//           {/* Error & Success Messages */}
//           {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
//           {success && <p className="mt-4 text-green-600 text-center">{success}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';
// import login from '../login.jpg';
// import { useNavigate } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (loading) return;
//     if (!email || !password) {
//       setError('Both fields are required');
//       return;
//     }
//     if (!validateEmail(email)) {
//       setError('Please enter a valid email address');
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.post('https://highersystem.onrender.com/login', {
//         email,
//         password,
//       });
//       const { token, userId } = response.data;
//       if (token && userId) {
//         localStorage.setItem('token', token);
//         localStorage.setItem('userId', userId);
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
//       if (err.response && err.response.data && err.response.data.error) {
//         setError(err.response.data.error);
//       } else {
//         setError('Invalid email or password. Please try again.');
//       }
//       setSuccess('');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   return (
//     <div className="h-screen flex">
//       <div className="w-1/2  flex justify-center items-center">
//         <img src={login} alt="Login Illustration" className="object-cover h-[100%]" />
//       </div>

//       <div className="w-1/2 bg-custom-gray flex justify-center items-center">
//         <div className="p-8 rounded-lg w-full max-w-md">
//           <h2 className="text-5xl font-bold text-center text-custome-blue mb-6">Welcome</h2>
//           <form onSubmit={handleLogin}>

//             <div className="mb-4">
//               {/* Email Label and Input */}
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Email
//               </label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                   <i className="fas fa-envelope text-black-500"></i> {/* Email Icon */}
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

//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                   <i className="fas fa-key text-black-500"></i>
//                 </span>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="w-full pl-10 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   placeholder="Password"
//                 />
//               </div>

//               <div className="flex justify-between items-center mt-2">
//                 <label className="text-sm">
//                   <input type="checkbox" className="mr-1" />
//                   Remember me
//                 </label>
//                 <a href="#" className="text-sm text-blue-600">Forgot Password?</a>
//               </div>
//             </div>


//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-3 rounded-full focus:outline-none focus:ring-2 ${loading ? 'bg-custom-dark-gray' : 'bg-gray-700 hover:bg-custome-blue'} text-white`}
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </button>

//             {/* <div className="flex items-center justify-center my-4">
//                 <span className="border-t w-1/3"></span>
//                 <span className="px-2 text-sm text-gray-500">or</span>
//                 <span className="border-t w-1/3"></span>
//               </div>


//               <button
//                 type="button"
//                 className="w-full py-3 flex items-center justify-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-700 bg-white hover:bg-gray-100"
//               >
//                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google Logo" className="w-5 h-5 mr-2" />
//                 Login with Google
//               </button> */}

//           </form>

//           {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
//           {success && <p className="mt-4 text-green-600 text-center">{success}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import axios from 'axios';
import login from '../assests/login.jpg';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('https://highersystem.onrender.com/login', {
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
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
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
      <div className="w-1/2  flex justify-center items-center">
        <img src={login} alt="Login Illustration" className="object-cover h-[100%]" />
      </div>

      <div className="w-1/2 bg-custom-gray flex justify-center items-center">
        <div className="p-8 rounded-lg w-full max-w-md">
          <h2 className="text-5xl font-bold text-center text-custome-blue mb-6">Welcome</h2>
          <form onSubmit={handleLogin}>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="fas fa-envelope text-black-500"></i> {/* Email Icon */}
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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="fas fa-key text-black-500"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
            </div>


            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-full focus:outline-none focus:ring-2 ${loading ? 'bg-custom-dark-gray' : 'bg-gray-700 hover:bg-custome-blue'} text-white`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
            {success && <p className="mt-4 text-green-600 text-center">{success}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;