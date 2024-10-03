import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar/LocSidebar';
import axios from 'axios';

const LocationsTable = () => {
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [newLocality, setNewLocality] = useState('');
    const [newCountry, setNewCountry] = useState('');
    const [newState, setNewState] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newCode, setNewCode] = useState('');
    const [newRemarks, setNewRemarks] = useState('');
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
        navigate('/Cards1');
    };

    const confirmDelete = (location) => {
        setLocationToDelete(location);
        setIsDeleteModalOpen(true);
    };

    const handleAddLocation = async () => {
        if (!newLocality || !newCountry || !newState || !newCity || !newCode) {
            alert('All fields except remarks are required');
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post('https://highersystem.onrender.com/loc', {
                locality: newLocality,
                country: newCountry,
                state: newState,
                city: newCity,
                code: newCode,
                remarks: newRemarks,
            });
            setLocations([...locations, response.data.location]);
            setNewLocality('');
            setNewCountry('');
            setNewState('');
            setNewCity('');
            setNewCode('');
            setNewRemarks('');
            setIsAddModalOpen(false);
        } catch (error) {
            console.error('Error adding location:', error);
            alert('Failed to add location.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`https://highersystem.onrender.com/id_user/${userId}`, {
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
            fetchUserData();
        }
    }, [token]);

    useEffect(() => {
        fetchLocation();
    }, []);

    const fetchLocation = async () => {
        try {
            const response = await axios.get('https://highersystem.onrender.com/loc');
            setLocations(response.data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };
    const handleDelete = async (id) => {
        try {
            await axios({
                method: 'delete',
                url: 'https://highersystem.onrender.com/loc',
                data: { id },
            });
            setLocations(locations.filter(location => location.location_id !== id));
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error('Error deleting department:', error);
            alert('Failed to delete department.');
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

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-6 w-full">
                {/*************************  Header Start  ******************************/}
                <div className="bg-custome-blue rounded-lg w-full p-3 flex justify-between items-center shadow-lg">
                    <button
                        onClick={handleHome}
                        type="button"
                        className="flex items-center p-2 rounded-full ">
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
                    Add Location
                </button>

                {isAddModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg w-1/3">
                            <h2 className="text-xl font-bold mb-4">Add Location</h2>
                            <form onSubmit={(e) => { e.preventDefault(); handleAddLocation(); }}>
                                <div className="mb-4">
                                    <label htmlFor="locality">
                                        Locality <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="locality"
                                        value={newLocality}
                                        onChange={(e) => setNewLocality(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        placeholder="Enter Locality"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="city">
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        value={newCity}
                                        onChange={(e) => setNewCity(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        placeholder="Enter City"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="state">
                                        State <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="state"
                                        value={newState}
                                        onChange={(e) => setNewState(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        placeholder="Enter State"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="country">
                                        Country <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        value={newCountry}
                                        onChange={(e) => setNewCountry(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        placeholder="Enter Country"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="code">
                                        Code <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="code"
                                        value={newCode}
                                        onChange={(e) => setNewCode(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        placeholder="Enter Code"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="remarks">Remarks</label>
                                    <input
                                        type="text"
                                        id="remarks"
                                        value={newRemarks}
                                        onChange={(e) => setNewRemarks(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        placeholder="Enter Remarks"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="mr-4 text-gray-500 hover:text-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        {loading ? 'Adding...' : 'Add Location'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {isDeleteModalOpen && locationToDelete && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg w-1/3">
                            <h2 className="text-xl font-bold mb-4">Delete Location</h2>
                            <p>Are you sure you want to delete the location: {locationToDelete.locality}?</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="mr-4 text-gray-500 hover:text-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(locationToDelete.location_id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <table className="min-w-full bg-white rounded-lg shadow-lg mt-6">
                    <thead>
                        <tr>
                            <th className="py-3 px-6 bg-gray-200 text-left">Location ID</th>
                            <th className="py-3 px-6 bg-gray-200 text-left">Locality</th>
                            <th className="py-3 px-6 bg-gray-200 text-left">Country</th>
                            <th className="py-3 px-6 bg-gray-200 text-left">State</th>
                            <th className="py-3 px-6 bg-gray-200 text-left">City</th>
                            <th className="py-3 px-6 bg-gray-200 text-left">Code</th>
                            <th className="py-3 px-6 bg-gray-200 text-left">Remarks</th>
                            <th className="py-3 px-6 bg-gray-200 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations.map((location) => (
                            <tr key={location.location_id}>
                                <td className="py-3 px-6">{location.location_id}</td>
                                <td className="py-3 px-6">{location.locality}</td>
                                <td className="py-3 px-6">{location.country}</td>
                                <td className="py-3 px-6">{location.state}</td>
                                <td className="py-3 px-6">{location.city}</td>
                                <td className="py-3 px-6">{location.code}</td>
                                <td className="py-3 px-6">{location.remarks}</td>
                                <td className="py-3 px-6">


                                    <button
                                        className="text-red-500 hover:text-red-700 mr-2"
                                        onClick={() => confirmDelete(location)}
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
    );
};

export default LocationsTable;
