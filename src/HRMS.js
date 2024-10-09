// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import logo from './assests/Logo.png';
// import { FaSignOutAlt } from 'react-icons/fa';
// import axios from 'axios';

// const Card = ({ title, icon, onClick }) => (
//     <button
//         className="relative flex flex-col items-center justify-center w-[200px] h-[150px] bg-blue-500 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95 cursor-pointer text-gray-700"
//         onClick={() => onClick(title)}
//     >
//         <div className="absolute top-0 right-0 w-full h-full rounded-tl-[100px] shadow-lg bg-gradient-to-r bg-white">
//         </div>
//         <div className="relative z-10 flex flex-col items-center">
//             <div className="text-4xl mb-2 text-black">{icon}</div>
//             <h3 className="text-lg font-semibold">{title}</h3>
//         </div>
//     </button>
// );

// const cardData = [
//     {
//         title: 'User Management',
//         icon: <i className="fas fa-user"></i>,
//         image: 'path-to-user-management-image.jpg'
//     },
//     {
//         title: 'Access Privileges',
//         icon: <i className="fas fa-lock"></i>,
//         image: 'Department'
//     },

//     {
//         title: 'Department',
//         icon: <i className="fas fa-building"></i>,
//         image: 'path-to-department-image.jpg'
//     },
//     {
//         title: 'Location',
//         icon: <i className="fas fa-cogs"></i>,
//         image: 'path-to-location-management-image.jpg'
//     }
// ];

// const CardPage = () => {
//     const navigate = useNavigate();
//     const [userData, setUserData] = useState(null);
//     const userId = localStorage.getItem('userId');
//     const token = localStorage.getItem('token');
//     const [availableBtn, setAvailableBtn] = useState();
//     const cardTitles = ['Dept', 'update_access', 'UM', 'Location'];

//     useEffect(() => {
//         const getUserAccessibleCard = async () => {
//             try {
//                 console.log(cardTitles, userId);
//                 let response = await fetch("http://43.204.140.118:3001/verify-access", {
//                     method: 'POST',
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify({
//                         user_id: parseInt(userId),
//                         pages: cardTitles
//                     })
//                 })
//                 let data = await response.json();
//                 let availableButton = {};
//                 Object.entries(data).forEach(([key, value]) => {
//                     if (value) {
//                         availableButton[key] = key;
//                     }
//                 })
//                 console.log("Available:", availableButton);
//                 setAvailableBtn(availableButton);
//             } catch (error) {
//                 alert(error.message)
//             }
//         }
//         getUserAccessibleCard();
//     }, [])

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
//         const handlePopState = () => {
//             navigate('/Cards');
//         };
//         window.addEventListener('popstate', handlePopState);
//         return () => {
//             window.removeEventListener('popstate', handlePopState);
//         };
//     }, [navigate]);

//     const verifyToken = async () => {
//         if (!token) {
//             navigate('/');
//             return;
//         }
//         try {
//             const response = await axios.post('http://43.204.140.118:3001/verify-token', {
//                 token: token
//             });
//             console.log('Token is valid:', response.data);
//             navigate('/Cards1');
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

//     const getTitle = (value) => {
//         switch (value) {
//             case "update_access": return "Access Privileges"
//             case "Dept": return "Department"
//             case "UM": return "User Management"
//             case "Location": return "Location"
//             default: return "None"
//         }
//     }
//     const getPageName = (value) => {
//         switch (value) {
//             case "update_access": return "AMS"
//             case "Dept": return "Departments"
//             case "UM": return "Usermng"
//             case "Location": return "Location"
//             default: return null
//         }
//     }

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("userId");
//         localStorage.removeItem("tokenExpiry");
//         console.log('Token:', localStorage.getItem("token"));
//         console.log('User ID:', localStorage.getItem("userId"));
//         console.log('Token Expiry:', localStorage.getItem("tokenExpiry"));
//         navigate('/');
//     };

//     return (
//         <div className="p-6 bg-white min-h-screen">
//             {/*************************  Header Start  ******************************/}
//             <div className="bg-custome-blue rounded-lg w-full p-3 flex justify-between items-center shadow-lg">
//                 <h1 className="text-white text-3xl font-bold">
//                     <div>
//                         <img src={logo} alt="Logo" className="w-30 h-10" />
//                     </div>
//                 </h1>
//                 <h1 className="text-white text-3xl font-bold ml-[35%]">HRMS</h1>
//                 {userData && (
//                     <div className="bg-white rounded-3xl p-2 flex ml-[30%]">
//                         <div className="flex flex-col">
//                             <h3 className="text-lg font-semibold text-black">
//                                 {userData.first_name} {userData.last_name}
//                             </h3>
//                         </div>
//                     </div>
//                 )}
//                 <button
//                     onClick={handleLogout}
//                     type="button"
//                     className="bg-white flex items-center p-3 rounded-full ">
//                     <FaSignOutAlt className="text-black mr-2" size={30} />
//                     <span className="text-black font-semibold"></span>
//                 </button>
//             </div>
//             {/*************************  Header End  ******************************/}

//             <div className="bg-white rounded-lg p-6">
//                 <div className="flex flex-wrap gap-6">
//                     {availableBtn && Object.entries(availableBtn).map(([key, value]) => {
//                         return <Card
//                             title={getTitle(value)}
//                             icon={<i className="fas fa-users"></i>}
//                             bgColor="bg-blue-500"
//                             onClick={() => navigate(`/${getPageName(value)}`)}
//                         />
//                     })
//                     }
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default CardPage;


//http://43.204.140.118:3001/verify-access
//http://43.204.140.118:3001/id_user/${userId}
//http://43.204.140.118:3001/verify-token

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import logo from './assests/Logo.png';
import axios from 'axios';

const Card = ({ title, icon, onClick }) => (
    <button
        className="relative flex flex-col items-center justify-center w-[200px] h-[150px] bg-blue-500 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95 cursor-pointer text-gray-700"
        onClick={() => onClick(title)}
    >
        <div className="absolute top-0 right-0 w-full h-full rounded-tl-[100px] shadow-lg bg-gradient-to-r bg-white">
        </div>
        <div className="relative z-10 flex flex-col items-center">
            <div className="text-4xl mb-2 text-black">{icon}</div>
            <h3 className="text-lg font-semibold">{title}</h3>
        </div>
    </button>
);

const cardData = [
    {
        title: 'Organization Set Up',
        icon: <i className="fas fa-chart-line"></i>,
        image: 'path-to-crm-image.jpg'
    },
    {
        title: 'Access Management',
        icon: <i className="fas fa-cogs"></i>,
        image: 'path-to-asset-management-image.jpg'
    },
];

const CardPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const [availableBtn, setAvailableBtn] = useState();
    const cardTitles = ['ORG', 'update_access'];

    useEffect(() => {
        const getUserAccessibleCard = async () => {
            try {
                console.log(cardTitles, userId);
                let response = await fetch("http://43.204.140.118:3001/access/verify-access", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user_id: parseInt(userId),
                        pages: cardTitles
                    })
                })
                let data = await response.json();
                let availableButton = {};
                Object.entries(data).forEach(([key, value]) => {
                    if (value) {
                        availableButton[key] = key;
                    }
                })
                console.log("Available:", availableButton);
                setAvailableBtn(availableButton);
            } catch (error) {
                alert(error.message)
            }
        }
        getUserAccessibleCard();
    }, [])

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
    }, [token]);

    useEffect(() => {
        const handlePopState = () => {
            navigate('/Cards');
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    const verifyToken = async () => {
        if (!token) {
            navigate('/');
            return;
        }
        try {
            const response = await axios.post('http://43.204.140.118:3001/verify-token', {
                token: token
            });
            console.log('Token is valid:', response.data);
            navigate('/HRMS');
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

    const getTitle = (value) => {
        switch (value) {
            case "ORG": return "Organization"
            case "update_access": return "Access Management"
            default: return "None"
        }
    }

    const getPageName = (value) => {
        switch (value) {
            case "ORG": return "Cards1"
             case "update_access": return "AMS"
            default: return null
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("tokenExpiry");
        console.log('Token:', localStorage.getItem("token"));
        console.log('User ID:', localStorage.getItem("userId"));
        console.log('Token Expiry:', localStorage.getItem("tokenExpiry"));
        navigate('/');
    };

    return (
        <div className="p-6 bg-white min-h-screen">
            {/*************************  Header Start  ******************************/}
            <div className="bg-custome-blue rounded-lg w-full p-3 flex justify-between items-center shadow-lg">
                <h1 className="text-white text-3xl font-bold">
                    <div>
                        <img src={logo} alt="Logo" className="w-30 h-10" />
                    </div>
                </h1>
                <h1 className="text-white text-3xl font-bold ml-[35%]">HRMS</h1>
                {userData && (
                    <div className="bg-white rounded-3xl p-2 flex ml-[30%]">
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold text-black">
                                {userData.first_name} {userData.last_name}
                            </h3>
                        </div>
                    </div>
                )}
                <button
                    onClick={handleLogout}
                    type="button"
                    className="bg-white flex items-center p-3 rounded-full ">
                    <FaSignOutAlt className="text-black mr-2" size={30} />
                    <span className="text-black font-semibold"></span>
                </button>
            </div>
            {/*************************  Header End  ******************************/}


            <div className="bg-white rounded-lg p-6">
                <div className="flex flex-wrap justify-center gap-6">
                    {availableBtn && Object.entries(availableBtn).map(([key, value]) => {
                        return <Card
                            title={getTitle(value)}
                            icon={<i className="fas fa-users"></i>}
                            bgColor="bg-blue-500"
                            onClick={() => navigate(`/${getPageName(value)}`)}
                        />
                    })
                    }
                </div>
            </div>
        </div>
    );
};
export default CardPage;