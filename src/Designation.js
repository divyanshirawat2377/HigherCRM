import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar/HRMSidebar';
import excel from './assests/excel.png';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const DesignationTable = () => {
    const navigate = useNavigate();
    const [designations, setDesignations] = useState([]);
    const [newDesignationName, setNewDesignationName] = useState('');
    const [newDesignationDescription, setNewDesignationDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [designationToDelete, setDesignationToDelete] = useState(null);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        fetchDesignations();
    }, []);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`http://43.204.140.118:3001/users/id_user/${userId}`, {
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
    }, [token, userId]);

    const fetchDesignations = async () => {
        try {
            const response = await axios.get('http://43.204.140.118:3001/designation');
            setDesignations(response.data);
        } catch (error) {
            console.error('Error fetching designations:', error);
        }
    };

    const handleAddDesignation = async () => {
        if (!newDesignationName || !newDesignationDescription) {
            alert('Both name and description are required');
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post('http://43.204.140.118:3001/designation', {
                designation: newDesignationName,
            description: newDesignationDescription,
            });
            setDesignations([...designations, response.data.designation]);
            setNewDesignationName('');
            setNewDesignationDescription('');
            setIsAddModalOpen(false);
        } catch (error) {
            console.error('Error adding designation:', error);
            alert('Failed to add designation.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
          await axios({
            method: 'delete',
            url: 'http://43.204.140.118:3001/designation',
            data: { id},
          });
          setDesignations(designations.filter(designation => designation.desig_id !== id));
          setIsDeleteModalOpen(false);
        } catch (error) {
          console.error('Error deleting designation:', error);
          alert('Failed to delete designation.');
        }
      };

    // const handleDelete = async (desig_id) => {
    //     try {
    //         await axios.delete(`http://43.204.140.118:3001/designation/${desig_id}`);
    //         setDesignations(designations.filter((designation) => designation.desig_id !== desig_id));
    //         setIsDeleteModalOpen(false);
    //     } catch (error) {
    //         console.error('Error deleting designation:', error);
    //         alert('Failed to delete designation.');
    //     }
    // };

    const confirmDelete = (designation) => {
        setDesignationToDelete(designation);
        setIsDeleteModalOpen(true);
    };

    const handleDownloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(designations);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Designations');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'Designations.xlsx');
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
        navigate('/Cards');
    };

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
                    <h1 className="text-white text-2xl font-bold">Designation</h1>
                    {userData && (
                        <div className="ml-auto flex items-center gap-4">
                            <div className="bg-white rounded-3xl p-2 flex items-center">
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-semibold text-black">
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

                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-gray-700 text-white px-4 py-2 rounded-2xl">
                        Add Designation
                    </button>
                    <button onClick={handleDownloadExcel} className="text-green-500">
                        <img src={excel} alt="logo" className="mr-5 w-8 h-8" />
                    </button>
                </div>

                {isAddModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg w-1/3">
                            <h2 className="text-xl font-bold mb-4">Add Designation</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleAddDesignation();
                                }}>
                                <div className="mb-4">
                                    <label htmlFor="designation_name">Designation Name *</label>
                                    <input
                                        type="text"
                                        id="designation_name"
                                        value={newDesignationName}
                                        onChange={(e) => setNewDesignationName(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        placeholder="Enter Designation Name"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="designation_description">Description *</label>
                                    <input
                                        type="text"
                                        id="designation_description"
                                        value={newDesignationDescription}
                                        onChange={(e) => setNewDesignationDescription(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        placeholder="Enter Designation Description"
                                        required
                                    />
                                </div>
                                <div className="flex">
                                    <button
                                        type="submit"
                                        className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${loading ? 'opacity-50' : ''}`}
                                        disabled={loading}>
                                        {loading ? 'Adding...' : 'Add Designation'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-5">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {isDeleteModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg w-1/3">
                            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                            <p>
                                Are you sure you want to delete the designation: <strong>{designationToDelete?.designation}</strong>?
                            </p>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded">
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(designationToDelete.desig_id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="py-2 px-4 border-b">ID</th>
                                <th className="py-2 px-4 border-b">Designation</th>
                                <th className="py-2 px-4 border-b">Description</th>
                                <th className="py-2 px-4 text-center border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {designations.map((designation, index) => (
                                <tr key={index} className={`bg-${index % 2 === 0 ? 'blue-50' : 'white'} border-t`}>
                                    <td className="py-2 px-4 border-b">{designation.desig_id}</td>
                                    <td className="py-2 px-4 border-b">{designation.designation}</td>
                                    <td className="py-2 px-4 border-b">{designation.description}</td>
                                    <td className="py-2 px-4 text-center border-b">
                                        <button
                                            className="text-red-500 hover:text-red-700 mr-2"
                                            onClick={() => confirmDelete(designation)}>
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
export default DesignationTable;
