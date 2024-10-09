import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FaSignOutAlt, FaHome } from 'react-icons/fa';
Modal.setAppElement('#root');

const UpdateAccess = () => {
    const navigate = useNavigate();
    const [emails, setEmails] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState('');
    const [apiAccess, setApiAccess] = useState([]);
    const [hasAmsAccess, setHasAmsAccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const isCustomerApiSelected = (apiName) => apiAccess.includes(apiName);
    const isContactApiSelected = (apiName) => apiAccess.includes(apiName);
    const [isCrmChecked, setIsCrmChecked] = useState(false);
    const [isDeptChecked, setIsDeptChecked] = useState(false);
    const [isAsmChecked, setIsAsmChecked] = useState(false);
    const [userData, setUserData] = useState(null);
    const userId = localStorage.getItem('userId');


    const customerApis = [
        { name: 'create_customer', label: 'Add Customer' },
        { name: 'update_customer', label: 'Update Customer' },
        { name: 'delete_customer', label: 'Delete Customer' },
        { name: 'all_customer', label: 'View Customers' },
    ];

    const contactApis = [
        { name: 'create_contact', label: 'Add Contact' },
        { name: 'update_contact', label: 'Update Contact' },
        { name: 'delete_contact', label: 'Delete Contact' },
        { name: 'all_contact', label: 'View Contacts' },
    ];

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await axios.get('http://43.204.140.118:3001/users/email_users', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setEmails(response.data);
            } catch (error) {
                showModal('Error fetching emails.');
            }
        };
        fetchEmails();
    }, []);

    const getToken = () => {
        const token = localStorage.getItem('token');
        return token;
    };
    const token = getToken();
    console.log('Retrieved token:', token);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }
            try {
                await axios.post('http://43.204.140.118:3001/verify-token', { token });
            } catch (error) {
                showModal('Token verification failed.');
                navigate('/');
            }
        };
        verifyToken();
    }, [navigate]);

    const handleEmailChange = async (e) => {
        const userId = e.target.value;
        setSelectedEmail(userId);
        if (userId) {
            try {
                const response = await axios.get('http://43.204.140.118:3001/access', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const filteredAccess = response.data.filter(access => access.user_id === parseInt(userId));
                const apiAccessNames = filteredAccess.map(access => access.api_name);
                setApiAccess(apiAccessNames);
                setHasAmsAccess(apiAccessNames.includes('update_access'));
                setIsCrmChecked(apiAccessNames.includes('CRM'));
                setIsDeptChecked(apiAccessNames.includes('Dept'));
                setIsAsmChecked(apiAccessNames.includes('ASM'));
            } catch (error) {
                showModal('Error fetching API access for the selected user.');
            }
        } else {
            setApiAccess([]);
            setHasAmsAccess(false);
            setIsCrmChecked(false);
            setIsDeptChecked(false);
            setIsAsmChecked(false);
        }
    };

    const handleApiAccessChange = async (apiName) => {
        if (apiName === 'update_access') {
            setHasAmsAccess(!hasAmsAccess);

            try {
                if (!hasAmsAccess) {
                    await axios.get('http://43.204.140.118:3001/access', {
                        // user_id: selectedEmail,
                        // api_name: 'update_access',
                    }, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                }
            } catch (error) {
                console.error('Error updating API access for update_access:', error.response ? error.response.data : error.message);
                showModal('Error updating API access for update_access.');
            }
        } else {
            setApiAccess((prev) =>
                prev.includes(apiName)
                    ? prev.filter((name) => name !== apiName)
                    : [...prev, apiName]
            );
            try {
                if (!apiAccess.includes(apiName)) {
                    await axios.get('http://43.204.140.118:3001/access', {
                        user_id: selectedEmail,
                        api_name: apiName,
                    }, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    if (apiName === 'CRM') {
                        setIsCrmChecked(prev => !prev);
                    } else if (apiName === 'Dept') {
                        setIsDeptChecked(prev => !prev);
                    } else if (apiName === 'ASM') {
                        setIsAsmChecked(prev => !prev);
                    }
                }
                else {

                    if (apiName === 'CRM') {
                        setIsCrmChecked(prev => !prev);
                    } else if (apiName === 'Dept') {
                        setIsDeptChecked(prev => !prev);
                    } else if (apiName === 'ASM') {
                        setIsAsmChecked(prev => !prev);
                    }
                }
            } catch (error) {
                console.error(`Error updating API access for ${apiName}:`, error.response ? error.response.data : error.message);
                showModal('Error updating API access.');
            }
        }
    };

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

    const handleSelectAll = (apis, selectAll) => {
        const newAccess = selectAll ? apis.map(api => api.name) : [];
        setApiAccess(prev => [
            ...prev.filter(name => !apis.some(api => api.name === name)),
            ...newAccess
        ]);
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
        navigate('/HRMS');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            showModal('Token does not exist.');
            return;
        }
        try {
            console.log(token)
            const response = await axios.put('http://43.204.140.118:3001/access/update_access',
                {
                    user_id: selectedEmail,
                    api_access: [...apiAccess, ...(hasAmsAccess ? ['update_access'] : [])],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                showModal('User Updated Successfully!');
            } else if (response.data.error === "User not found. Please check the email entered.") {
                showModal('User not found. Please check the email entered.');
            } else {
                showModal(`Error: ${response.data.error}`);
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                showModal('You do not have permission to perform this action.');
            } else if (error.response && error.response.status === 404) {
                showModal('User not found. Please check the email entered.');
            } else {
                showModal('Error updating API access.');
            }
        }
    };

    const addUser = () => {
        navigate('/Signup');
    };

    const back = () => {
        navigate('/HRMS');
    };

    const showModal = (message) => {
        setModalMessage(message);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage('');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            {/*************************  Header Start  ******************************/}
            <div className="bg-custome-blue rounded-lg w-full p-3 flex justify-between items-center shadow-lg">
                <button
                    onClick={handleHome}
                    type="button"
                    className="flex items-center p-2 rounded-full ">
                    <FaHome className="text-white mr-2" size={25} />
                </button>
                <h1 className="text-white text-2xl font-bold">Access Management</h1>
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

            <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-evenly">
                            <div className="mr-[10%]">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Email:
                                </label>
                                <select
                                    id="email"
                                    value={selectedEmail}
                                    onChange={handleEmailChange}
                                    required
                                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select an email</option>
                                    {emails.map((user, index) => (
                                        <option key={index} value={user.user_id}>
                                            {user.email}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleApiAccessChange('update_access')}
                                        checked={hasAmsAccess}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <span className="ml-2">Access Management</span>
                                </label>
                            </div>

                            <div>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-left"
                                    onClick={addUser}
                                >
                                    Add User
                                </button>
                            </div>
                        </div>
                        <div className="mt-[3%] mb-[2%]">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    onChange={() => handleApiAccessChange('CRM')}
                                    checked={isCrmChecked}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <span className="text-blue-600 text-lg font-bold ml-5">CRM</span>
                            </label>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h2 className="text-blue-600 text-lg font-medium">Customer Table:</h2>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => handleSelectAll(customerApis, e.target.checked)}
                                        checked={customerApis.every(api => isCustomerApiSelected(api.name))}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <span className="ml-2">Select All</span>
                                </label>
                                {customerApis.map((api, index) => (
                                    <label key={index} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value={api.name}
                                            onChange={() => handleApiAccessChange(api.name)}
                                            checked={isCustomerApiSelected(api.name)}
                                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                        <span className="ml-2">{api.label}</span>
                                    </label>
                                ))}
                            </div>

                            <h2 className="text-blue-600 text-lg font-medium">Contact Table:</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => handleSelectAll(contactApis, e.target.checked)}
                                        checked={contactApis.every(api => isContactApiSelected(api.name))}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <span className="ml-2">Select All</span>
                                </label>
                                {contactApis.map((api, index) => (
                                    <label key={index} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value={api.name}
                                            onChange={() => handleApiAccessChange(api.name)}
                                            checked={isContactApiSelected(api.name)}
                                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                        <span className="ml-2">{api.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="mt-[3%]">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    onChange={() => handleApiAccessChange('Dept')}
                                    checked={isDeptChecked}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <span className="text-indigo-500 text-lg font-bold ml-5">Department</span>
                            </label>
                        </div>
                        <div className="mt-[3%]">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    onChange={() => handleApiAccessChange('ASM')}
                                    checked={isAsmChecked}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <span className="text-indigo-500 text-lg font-bold ml-5">Asset Management System</span>
                            </label>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none"
                            >
                                Submit
                            </button>
                            <button
                                onClick={back}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md ml-4 focus:outline-none"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Modal"
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            >
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                    <h2 className="text-lg font-bold mb-4">{modalMessage}</h2>
                    <button
                        onClick={closeModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};
export default UpdateAccess;