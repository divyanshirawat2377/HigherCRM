// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import React, { useState, useEffect } from 'react';
// import { FaHome, FaSignOutAlt } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from './Sidebar/LocSidebar';
// import axios from 'axios';

// const LocationsTable = () => {
//     const navigate = useNavigate();
//     const [locations, setLocations] = useState([]);
//     const [newLocality, setNewLocality] = useState('');
//     const [newCountry, setNewCountry] = useState('');
//     const [newState, setNewState] = useState('');
//     const [newCity, setNewCity] = useState('');
//     const [newCode, setNewCode] = useState('');
//     const [newRemarks, setNewRemarks] = useState('');
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//     const [locationToDelete, setLocationToDelete] = useState(null);
//     const userId = localStorage.getItem('userId');
//   const token = localStorage.getItem('token');

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('userId');
//         localStorage.removeItem('tokenExpiry');
//         navigate('/');
//     };

//     const handleHome = () => {
//         navigate('/Cards1');
//     };

//     const confirmDelete = (location) => {
//         setLocationToDelete(location);
//         setIsDeleteModalOpen(true);
//     };

//     const handleAddLocation = async () => {
//         if (!newLocality || !newCountry || !newState || !newCity || !newCode) {
//             alert('All fields except remarks are required');
//             return;
//         }
//         try {
//             setLoading(true);
//             const response = await axios.post('http://43.204.140.118:3001/loc', {
//                 locality: newLocality,
//                 country: newCountry,
//                 state: newState,
//                 city: newCity,
//                 code: newCode,
//                 remarks: newRemarks,
//             });
//             setLocations([...locations, response.data.location]);
//             setNewLocality('');
//             setNewCountry('');
//             setNewState('');
//             setNewCity('');
//             setNewCode('');
//             setNewRemarks('');
//             setIsAddModalOpen(false);
//         } catch (error) {
//             console.error('Error adding location:', error);
//             alert('Failed to add location.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const userId = localStorage.getItem('userId');
//         if (userId) {
//             const fetchUserData = async () => {
//                 try {
//                     const response = await axios.get(`http://43.204.140.118:3001/id_user/${userId}`, {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     });
//                     const user = response.data[0];
//                     setUserData(user);
//                 } catch (error) {
//                     console.error('Error fetching user data:', error);
//                 }
//             };
//             fetchUserData();
//         }
//     }, [token,userId]);

//     useEffect(() => {
//         fetchLocation();
//     }, []);

//     const fetchLocation = async () => {
//         try {
//             const response = await axios.get('http://43.204.140.118:3001/loc');
//             setLocations(response.data);
//         } catch (error) {
//             console.error('Error fetching locations:', error);
//         }
//     };
//     const handleDelete = async (id) => {
//         try {
//             await axios({
//                 method: 'delete',
//                 url: 'http://43.204.140.118:3001/loc',
//                 data: { id },
//             });
//             setLocations(locations.filter(location => location.location_id !== id));
//             setIsDeleteModalOpen(false);
//         } catch (error) {
//             console.error('Error deleting department:', error);
//             alert('Failed to delete department.');
//         }
//     };

//     useEffect(() => {
//         const handlePopState = () => {
//             navigate('/Cards1');
//         };
//         window.addEventListener('popstate', handlePopState);
//         return () => {
//             window.removeEventListener('popstate', handlePopState);
//         };
//     }, [navigate]);

//     return (
//         <div className="flex">
//             <Sidebar />
//             <div className="p-6 w-full">
//                 {/*************************  Header Start  ******************************/}
//                 <div className="bg-custome-blue rounded-lg w-full p-3 flex justify-between items-center shadow-lg">
//                     <button
//                         onClick={handleHome}
//                         type="button"
//                         className="flex items-center p-2 rounded-full ">
//                         <FaHome className="text-white mr-2" size={25} />
//                     </button>
//                     <h1 className="text-white text-2xl font-bold">Location</h1>
//                     {userData && (
//                         <div className="ml-auto flex items-center gap-4">
//                             <div className="bg-white rounded-3xl p-2 flex items-center">
//                                 <div className="flex flex-col">
//                                     <h3 className="text-lg font-semibold text-custome-black">
//                                         {userData.first_name} {userData.last_name}
//                                     </h3>
//                                 </div>
//                             </div>
//                             <button
//                                 onClick={handleLogout}
//                                 type="button"
//                                 className="bg-white flex items-center p-2 rounded-full ">
//                                 <FaSignOutAlt className="text-black mr-2" size={20} />
//                                 <span className="text-black font-semibold"></span>
//                             </button>
//                         </div>
//                     )}
//                 </div>
//                 {/*************************  Header End  ******************************/}
//                 <button
//                     onClick={() => setIsAddModalOpen(true)}
//                     className="bg-custome-blue w-[17%] text-white px-4 py-2 rounded-2xl mb-4 mt-4 "
//                 >
//                     Add Location
//                 </button>

//                 {isAddModalOpen && (
//                     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//                         <div className="bg-white p-6 rounded-lg w-1/3">
//                             <h2 className="text-xl font-bold mb-4">Add Location</h2>
//                             <form onSubmit={(e) => { e.preventDefault(); handleAddLocation(); }}>
//                                 <div className="mb-4">
//                                     <label htmlFor="locality">
//                                         Locality <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="locality"
//                                         value={newLocality}
//                                         onChange={(e) => setNewLocality(e.target.value)}
//                                         className="w-full border border-gray-300 rounded-md p-2"
//                                         placeholder="Enter Locality"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="city">
//                                         City <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="city"
//                                         value={newCity}
//                                         onChange={(e) => setNewCity(e.target.value)}
//                                         className="w-full border border-gray-300 rounded-md p-2"
//                                         placeholder="Enter City"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="state">
//                                         State <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="state"
//                                         value={newState}
//                                         onChange={(e) => setNewState(e.target.value)}
//                                         className="w-full border border-gray-300 rounded-md p-2"
//                                         placeholder="Enter State"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="country">
//                                         Country <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="country"
//                                         value={newCountry}
//                                         onChange={(e) => setNewCountry(e.target.value)}
//                                         className="w-full border border-gray-300 rounded-md p-2"
//                                         placeholder="Enter Country"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="code">
//                                         Code <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="code"
//                                         value={newCode}
//                                         onChange={(e) => setNewCode(e.target.value)}
//                                         className="w-full border border-gray-300 rounded-md p-2"
//                                         placeholder="Enter Code"
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="remarks">Remarks</label>
//                                     <input
//                                         type="text"
//                                         id="remarks"
//                                         value={newRemarks}
//                                         onChange={(e) => setNewRemarks(e.target.value)}
//                                         className="w-full border border-gray-300 rounded-md p-2"
//                                         placeholder="Enter Remarks"
//                                     />
//                                 </div>
//                                 <div className="flex justify-end">
//                                     <button
//                                         type="button"
//                                         onClick={() => setIsAddModalOpen(false)}
//                                         className="mr-4 text-gray-500 hover:text-gray-700"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         className="bg-blue-500 text-white px-4 py-2 rounded"
//                                     >
//                                         {loading ? 'Adding...' : 'Add Location'}
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 )}

//                 {isDeleteModalOpen && locationToDelete && (
//                     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//                         <div className="bg-white p-6 rounded-lg w-1/3">
//                             <h2 className="text-xl font-bold mb-4">Delete Location</h2>
//                             <p>Are you sure you want to delete the location: {locationToDelete.locality}?</p>
//                             <div className="flex justify-end mt-4">
//                                 <button
//                                     onClick={() => setIsDeleteModalOpen(false)}
//                                     className="mr-4 text-gray-500 hover:text-gray-700"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={() => handleDelete(locationToDelete.location_id)}
//                                     className="bg-red-500 text-white px-4 py-2 rounded"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 <table className="min-w-full bg-white rounded-lg shadow-lg mt-6">
//                     <thead>
//                         <tr>
//                             <th className="py-3 px-6 bg-gray-200 text-left">Location ID</th>
//                             <th className="py-3 px-6 bg-gray-200 text-left">Locality</th>
//                             <th className="py-3 px-6 bg-gray-200 text-left">Country</th>
//                             <th className="py-3 px-6 bg-gray-200 text-left">State</th>
//                             <th className="py-3 px-6 bg-gray-200 text-left">City</th>
//                             <th className="py-3 px-6 bg-gray-200 text-left">Code</th>
//                             <th className="py-3 px-6 bg-gray-200 text-left">Remarks</th>
//                             <th className="py-3 px-6 bg-gray-200 text-left">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {locations.map((location) => (
//                             <tr key={location.location_id}>
//                                 <td className="py-3 px-6">{location.location_id}</td>
//                                 <td className="py-3 px-6">{location.locality}</td>
//                                 <td className="py-3 px-6">{location.country}</td>
//                                 <td className="py-3 px-6">{location.state}</td>
//                                 <td className="py-3 px-6">{location.city}</td>
//                                 <td className="py-3 px-6">{location.code}</td>
//                                 <td className="py-3 px-6">{location.remarks}</td>
//                                 <td className="py-3 px-6">


//                                     <button
//                                         className="text-red-500 hover:text-red-700 mr-2"
//                                         onClick={() => confirmDelete(location)}
//                                     >
//                                         <FontAwesomeIcon icon={faTrash} />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };
// export default LocationsTable;



//http://43.204.140.118:3001/loc
//http://43.204.140.118:3001/id_user/${userId}

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import React, { useState, useEffect } from 'react';
// import { FaHome, FaSignOutAlt, } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from './Sidebar/HRMSidebar';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import excel from './assests/excel.png'

// const LocationsTable = () => {
//     const navigate = useNavigate();
//     const [locations, setLocations] = useState([]);
//     const [newLocationData, setNewLocationData] = useState({
//         locality: '',
//         country: '',
//         state: '',
//         city: '',
//         code: '',
//         remarks: ''
//     });
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//     const [locationToDelete, setLocationToDelete] = useState(null);
//     const userId = localStorage.getItem('userId');
//     const token = localStorage.getItem('token');

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('userId');
//         localStorage.removeItem('tokenExpiry');
//         navigate('/');
//     };

//     const handleHome = () => {
//         navigate('/Cards1');
//     };

//     const confirmDelete = (location) => {
//         setLocationToDelete(location);
//         setIsDeleteModalOpen(true);
//     };

//     const handleAddLocation = async () => {
//         const { locality, country, state, city, code } = newLocationData;
//         if (!locality || !country || !state || !city || !code) {
//             alert('All fields except remarks are required');
//             return;
//         }
//         try {
//             setLoading(true);
//             const response = await axios.post('http://43.204.140.118:3001/loc', newLocationData);
//             setLocations([...locations, response.data.location]);
//             setNewLocationData({ locality: '', country: '', state: '', city: '', code: '', remarks: '' });
//             setIsAddModalOpen(false);
//         } catch (error) {
//             console.error('Error adding location:', error);
//             alert('Failed to add location.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDownloadExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(locations);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Locations');

//         // Create a buffer and save it as an Excel file
//         const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//         const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
//         saveAs(data, 'locations.xlsx');
//     };

//     useEffect(() => {
//         const fetchUserData = async () => {
//             if (userId) {
//                 try {
//                     const response = await axios.get(`http://43.204.140.118:3001/id_user/${userId}`, {
//                         headers: { Authorization: `Bearer ${token}` },
//                     });
//                     setUserData(response.data[0]);
//                 } catch (error) {
//                     console.error('Error fetching user data:', error);
//                 }
//             }
//         };
//         fetchUserData();
//     }, [token, userId]);

//     useEffect(() => {
//         const fetchLocation = async () => {
//             try {
//                 const response = await axios.get('http://43.204.140.118:3001/loc');
//                 setLocations(response.data);
//             } catch (error) {
//                 console.error('Error fetching locations:', error);
//             }
//         };
//         fetchLocation();
//     }, []);

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete('http://43.204.140.118:3001/loc', { data: { id } });
//             setLocations(locations.filter(location => location.location_id !== id));
//             setIsDeleteModalOpen(false);
//         } catch (error) {
//             console.error('Error deleting location:', error);
//             alert('Failed to delete location.');
//         }
//     };

//     useEffect(() => {
//         const handlePopState = () => {
//             navigate('/Cards1');
//         };
//         window.addEventListener('popstate', handlePopState);
//         return () => {
//             window.removeEventListener('popstate', handlePopState);
//         };
//     }, [navigate]);

//     return (
//         <div className="flex">
//             <Sidebar />
//             <div className="p-6 w-full">
//                 {/* Header */}
//                 <div className="bg-custome-blue rounded-lg w-full p-3 flex justify-between items-center shadow-lg">
//                     <button onClick={handleHome} type="button" className="flex items-center p-2 rounded-full">
//                         <FaHome className="text-white mr-2" size={25} />
//                     </button>
//                     <h1 className="text-white text-2xl font-bold">Location</h1>
//                     {userData && (
//                         <div className="ml-auto flex items-center gap-4">
//                             <div className="bg-white rounded-3xl p-2 flex items-center">
//                                 <div className="flex flex-col">
//                                     <h3 className="text-lg font-semibold text-custome-black">
//                                         {userData.first_name} {userData.last_name}
//                                     </h3>
//                                 </div>
//                             </div>
//                             <button onClick={handleLogout} type="button" className="bg-white flex items-center p-2 rounded-full">
//                                 <FaSignOutAlt className="text-black mr-2" size={20} />
//                                 <span className="text-black font-semibold"></span>
//                             </button>
//                         </div>
//                     )}
//                 </div>
//                 {/* Add Location Button */}
//                 <div className='justify-between flex'>
//                     <button
//                         onClick={() => setIsAddModalOpen(true)}
//                         className="bg-gray-700 w-[13%] text-white px-4 py-2 rounded-2xl mb-4 mt-4"
//                     >
//                         Add Location
//                     </button>

//                     <button
//                         onClick={handleDownloadExcel}
//                         className="text-green-500 hover:text-green-500 items-center"
//                     >
//                       <img src={excel} alt="logo" className='mr-5 w-8 h-8'/>
//                     </button>
//                 </div>


//                 {/* Add Location Modal */}
//                 {isAddModalOpen && (
//                     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//                         <div className="bg-white p-6 rounded-lg w-1/3">
//                             <h2 className="text-xl font-bold mb-4">Add Location</h2>
//                             <form onSubmit={(e) => { e.preventDefault(); handleAddLocation(); }}>
//                                 {Object.entries(newLocationData).map(([key, value]) => (
//                                     <div className="mb-4" key={key}>
//                                         <label htmlFor={key}>
//                                             {key.charAt(0).toUpperCase() + key.slice(1)} {key !== 'remarks' && <span className="text-red-500">*</span>}
//                                         </label>
//                                         <input
//                                             type="text"
//                                             id={key}
//                                             value={value}
//                                             onChange={(e) => setNewLocationData({ ...newLocationData, [key]: e.target.value })}
//                                             className="w-full border border-gray-300 rounded-md p-2"
//                                             placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
//                                         />
//                                     </div>
//                                 ))}
//                                 <div className="flex justify-end">
//                                     <button
//                                         type="button"
//                                         onClick={() => setIsAddModalOpen(false)}
//                                         className="mr-4 text-gray-500 hover:text-gray-700"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         className="bg-blue-500 text-white px-4 py-2 rounded"
//                                     >
//                                         {loading ? 'Adding...' : 'Add Location'}
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 )}

//                 {/* Delete Location Modal */}
//                 {isDeleteModalOpen && locationToDelete && (
//                     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//                         <div className="bg-white p-6 rounded-lg w-1/3">
//                             <h2 className="text-xl font-bold mb-4">Delete Location</h2>
//                             <p>Are you sure you want to delete the location: {locationToDelete.locality}?</p>
//                             <div className="flex justify-end mt-4">
//                                 <button
//                                     onClick={() => setIsDeleteModalOpen(false)}
//                                     className="mr-4 text-gray-500 hover:text-gray-700"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={() => handleDelete(locationToDelete.location_id)}
//                                     className="bg-red-500 text-white px-4 py-2 rounded"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Locations Table */}
//                 <div className="overflow-x-auto shadow-md rounded-lg">
//                     <table className="min-w-full border-collapse bg-white">
//                         <thead>
//                             <tr className="bg-gray-200 text-left">
//                                 {['Locality', 'Country', 'State', 'City', 'Code', 'Remarks', 'Actions'].map(header => (
//                                     <th key={header} className="p-4 border-b">{header}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {locations.length > 0 ? (
//                                 locations.map(location => (
//                                     <tr key={location.location_id}>
//                                         <td className="p-4 border-b">{location.locality}</td>
//                                         <td className="p-4 border-b">{location.country}</td>
//                                         <td className="p-4 border-b">{location.state}</td>
//                                         <td className="p-4 border-b">{location.city}</td>
//                                         <td className="p-4 border-b">{location.code}</td>
//                                         <td className="p-4 border-b">{location.remarks || 'N/A'}</td>
//                                         <td className="p-4 border-b">
//                                             <button
//                                                 onClick={() => confirmDelete(location)}
//                                                 className="text-red-500 hover:text-red-700"
//                                             >
//                                                 <FontAwesomeIcon icon={faTrash} />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="7" className="text-center p-4">No locations found</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default LocationsTable;





import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar/HRMSidebar';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import excel from './assests/excel.png';
import { Country, State, City } from 'country-state-city';

const LocationsTable = () => {
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [newLocationData, setNewLocationData] = useState({
        locality: '',
        country: '',
        state: '',
        city: '',
        code: '',
        remarks: ''
    });
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [locationToDelete, setLocationToDelete] = useState(null);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiry');
        navigate('/');
    };

    const handleHome = () => {
        navigate('/Cards');
    };

    const confirmDelete = (location) => {
        setLocationToDelete(location);
        setIsDeleteModalOpen(true);
    };

    const handleAddLocation = async () => {
        const { locality, country, state, city, code } = newLocationData;
        if (!locality || !country || !state || !city || !code) {
            alert('All fields except remarks are required');
            return;     
        }
        try {
            setLoading(true);
            const response = await axios.post('http://43.204.140.118:3001/loc', newLocationData);
            setLocations([...locations, response.data.location]);
            setNewLocationData({ locality: '', country: '', state: '', city: '', code: '', remarks: '' });
            setIsAddModalOpen(false);
        } catch (error) {
            console.error('Error adding location:', error);
            alert('Failed to add location.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(locations);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Locations');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'locations.xlsx');
    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://43.204.140.118:3001/users/id_user/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUserData(response.data[0]);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };
        fetchUserData();
    }, [token, userId]);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await axios.get('http://43.204.140.118:3001/loc');
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };
        fetchLocation();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete('http://43.204.140.118:3001/loc', { data: { id } });
            setLocations(locations.filter(location => location.location_id !== id));
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error('Error deleting location:', error);
            alert('Failed to delete location.');
        }
    };

    useEffect(() => {
        const handlePopState = () => {
            navigate('/Cards1');
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    const handleCountryChange = (selectedCountry) => {
        setNewLocationData({ ...newLocationData, country: selectedCountry.name });
    };

    const handleStateChange = (selectedState) => {
        setNewLocationData({ ...newLocationData, state: selectedState.name });
    };

    const handleCityChange = (selectedCity) => {
        setNewLocationData({ ...newLocationData, city: selectedCity.name });
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-6 w-full">
                {/* Header */}
                <div className="bg-custome-blue rounded-lg w-full p-3 flex justify-between items-center shadow-lg">
                    <button onClick={handleHome} type="button" className="flex items-center p-2 rounded-full">
                        <FaHome className="text-white mr-2" size={25} />
                    </button>
                    <h1 className="text-white text-2xl font-bold">Location</h1>
                    {userData && (
                        <div className="ml-auto flex items-center gap-4">
                            <div className="bg-white rounded-3xl p-2 flex items-center">
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-semibold text-custome-black">
                                        {userData.first_name} {userData.last_name}
                                    </h3>
                                </div>
                            </div>
                            <button onClick={handleLogout} type="button" className="bg-white flex items-center p-2 rounded-full">
                                <FaSignOutAlt className="text-black mr-2" size={20} />
                                <span className="text-black font-semibold"></span>
                            </button>
                        </div>
                    )}

                </div>
                {/* Add Location Button */}
                <div className='justify-between flex'>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-gray-700 w-[13%] text-white px-4 py-2 rounded-2xl mb-4 mt-4"
                    >
                        Add Location
                    </button>

                    <button
                        onClick={handleDownloadExcel}
                        className="text-green-500 hover:text-green-500 items-center"
                    >
                      <img src={excel} alt="logo" className='mr-5 w-8 h-8'/>
                    </button>
                </div>


                {/* Add Location Modal */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg w-1/3">
                            <h2 className="text-xl font-bold mb-4">Add Location</h2>
                            <form onSubmit={(e) => { e.preventDefault(); handleAddLocation(); }}>
                                <div className="mb-4">
                                    <label htmlFor="locality">Locality <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        id="locality"
                                        value={newLocationData.locality}
                                        onChange={(e) => setNewLocationData({ ...newLocationData, locality: e.target.value })}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        placeholder="Enter Locality"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="country">Country <span className="text-red-500">*</span></label>
                                    <select
                                        id="country"
                                        value={newLocationData.country}
                                        onChange={(e) => handleCountryChange(Country.getCountryByCode(e.target.value))}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    >
                                        <option value="">Select Country</option>
                                        {Country.getAllCountries().map((country) => (
                                            <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="state">State <span className="text-red-500">*</span></label>
                                    <select
                                        id="state"
                                        value={newLocationData.state}
                                        onChange={(e) => handleStateChange(State.getStateByCodeAndCountry(e.target.value, newLocationData.country))}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        disabled={!newLocationData.country}
                                    >
                                        <option value="">Select State</option>
                                        {State.getStatesOfCountry(newLocationData.country).map((state) => (
                                            <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="city">City <span className="text-red-500">*</span></label>
                                    <select
                                        id="city"
                                        value={newLocationData.city}
                                        onChange={(e) => handleCityChange(City.getCityByCodeAndState(e.target.value, newLocationData.state))}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        disabled={!newLocationData.state}
                                    >
                                        <option value="">Select City</option>
                                        {City.getCitiesOfState(newLocationData.state).map((city) => (
                                            <option key={city.isoCode} value={city.isoCode}>{city.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="code">Code <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        id="code"
                                        value={newLocationData.code}
                                        onChange={(e) => setNewLocationData({ ...newLocationData, code: e.target.value })}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        placeholder="Enter Code"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="remarks">Remarks</label>
                                    <textarea
                                        id="remarks"
                                        value={newLocationData.remarks}
                                        onChange={(e) => setNewLocationData({ ...newLocationData, remarks: e.target.value })}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        placeholder="Enter Remarks (Optional)"
                                    ></textarea>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-custome-blue text-white px-4 py-2 rounded-md"
                                        disabled={loading}
                                    >
                                        {loading ? 'Adding...' : 'Add'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg w-1/3">
                            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                            <p>Are you sure you want to delete this location?</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(locationToDelete.location_id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Locations Table */}
                <div className="overflow-x-auto">
                    <table className="w-full bg-white shadow-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4">Locality</th>
                                <th className="py-2 px-4">Country</th>
                                <th className="py-2 px-4">State</th>
                                <th className="py-2 px-4">City</th>
                                <th className="py-2 px-4">Code</th>
                                <th className="py-2 px-4">Remarks</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.map((location, index) => (
                                <tr key={location.location_id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="py-2 px-4">{location.locality}</td>
                                    <td className="py-2 px-4">{location.country}</td>
                                    <td className="py-2 px-4">{location.state}</td>
                                    <td className="py-2 px-4">{location.city}</td>
                                    <td className="py-2 px-4">{location.code}</td>
                                    <td className="py-2 px-4">{location.remarks}</td>
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => confirmDelete(location)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LocationsTable;
