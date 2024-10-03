import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar/Deptsidebar';
import axios from 'axios';

const DepartmentsTable = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptDesc, setNewDeptDesc] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('https://highersystem.onrender.com/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
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

  const handleAddDepartment = async () => {
    if (!newDeptName) {
      alert('Department name is required');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('https://highersystem.onrender.com/departments', {
        dept_name: newDeptName,
        dept_data: newDeptDesc,
      });
      setDepartments([...departments, response.data.department]);
      setNewDeptName('');
      setNewDeptDesc('');
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding department:', error);
      alert('Failed to add department.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios({
        method: 'delete',
        url: 'https://highersystem.onrender.com/departments',
        data: { id },
      });
      setDepartments(departments.filter(department => department.dept_id !== id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting department:', error);
      alert('Failed to delete department.');
    }
  };

  const confirmDelete = (department) => {
    setDepartmentToDelete(department);
    setIsDeleteModalOpen(true);
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
      navigate('/Departments');
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

  return (
    <div className='flex'>
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
          <h1 className="text-white text-2xl font-bold">Department</h1>
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
        <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-custome-blue w-[17%] text-white px-4 py-2 rounded-2xl mb-4 mt-4 "
                >
                    Add Department
                </button>

        
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Add Department</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleAddDepartment(); }}>
                <div className="mb-4">
                  <label htmlFor="dept_name">
                    Department Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="dept_name"
                    value={newDeptName}
                    onChange={(e) => setNewDeptName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter Department Name"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="dept_data">Department Description</label>
                  <textarea
                    id="dept_data"
                    value={newDeptDesc}
                    onChange={(e) => setNewDeptDesc(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter Department Description"
                  />
                </div>
                <div className="flex">
                  <button
                    type="submit"
                    className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${loading ? 'opacity-50' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Adding...' : 'Add Department'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-5"
                  >
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
              <p>Are you sure you want to delete the department: <strong>{departmentToDelete?.dept_name}</strong>?</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(departmentToDelete.dept_id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Department Name</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4 text-center">Created At</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">{department.dept_id}</td>
                  <td className="py-2 px-4">{department.dept_name}</td>
                  <td className="py-2 px-4">{department.dept_data || 'No description'}</td>
                  <td className="py-2 px-4 text-center">
                    {new Date(department.created_at).toLocaleString()}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="text-red-500 hover:text-red-700 mr-2"
                      onClick={() => confirmDelete(department)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Department Name</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 text-center border-b">Created At</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department, index) => (
                <tr key={index} className={`bg-${index % 2 === 0 ? 'blue-50' : 'white'} border-t`}>
                  <td className="py-2 px-4 border-b">{department.dept_id}</td>
                  <td className="py-2 px-4 border-b">{department.dept_name}</td>
                  <td className="py-2 px-4 border-b">{department.dept_data || 'No description'}</td>
                  <td className="py-2 px-4 text-center border-b">
                    {new Date(department.created_at).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 text-center border-b">
                    <button
                      className="text-red-500 hover:text-red-700 mr-2"
                      onClick={() => confirmDelete(department)}
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
export default DepartmentsTable;