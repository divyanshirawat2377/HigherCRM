// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaSignOutAlt } from 'react-icons/fa';
// import logo from './LOGO1.png';
// import axios from 'axios';
// // const Card = ({ title, icon, bgColor, onClick }) => (
// //     <button
// //         className={`flex flex-col items-center justify-center w-[20%] h-[20%] rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95 cursor-pointer ${bgColor} text-white p-4`}
// //         onClick={() => onClick(title,)}
// //     >
// //         <div className="text-2xl mb-2">
// //             {icon}
// //         </div>
// //         <h3 className="text-lg font-semibold">{title}</h3>
// //     </button>
// // );

// const Card = ({ title, icon, bgColor, onClick }) => (
//     <button
//         className={`flex flex-col items-center justify-center w-[20%] h-[20%] rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95 cursor-pointer ${bgColor} text-white p-4`}
//         onClick={() => onClick(title)}
//     >
//         <div className="text-3xl mb-2">
//             {icon}
//         </div>
//         <h3 className="text-lg font-semibold">{title}</h3>
//     </button>
// );

// const CardPage = () => {
//     const [userData, setUserData] = useState(null);
//     const userId = localStorage.getItem('userId');
//     const token = localStorage.getItem('token');
//     const [availableBtn, setAvailableBtn] = useState();
//     const navigate = useNavigate();

//     const cardTitles = ['CRM', 'Dept', 'ASM', 'update_access'];

//     useEffect(() => {
//         const getUserAccessibleCard = async () => {
//             try {
//                 console.log(cardTitles, userId);
//                 let response = await fetch("https://highersystem.onrender.com/verify-access", {
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

//     useEffect(() => {
//         const handlePopState = () => {
//             localStorage.removeItem('token');
//             navigate('/');
//         };

//         window.addEventListener('popstate', handlePopState);

//         return () => {
//             window.removeEventListener('popstate', handlePopState);
//         };
//     }, [navigate]);


//     const getTitle = (value) => {
//         switch (value) {
//             case "CRM": return "CRM"
//             case "update_access": return "Access Management"
//             case "ASM": return "Asset Management"
//             case "Dept": return "Department"
//             default: return "None"
//         }
//     }

//     const getPageName = (value) => {
//         switch (value) {
//             case "CRM": return "Profile"
//             case "update_access": return "AMS"
//             // case "ASM": return "Asset Management"
//             case "Dept": return "Departments"
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
//         <div className="p-6">
//             <div className="bg-custome-blue rounded-lg ml-5 mt-5 w-[98%] p-6 flex justify-between items-center shadow-lg">
//                 <h1 className="text-white text-3xl font-bold"></h1>

//                 {userData && (
//                     <div className="ml-auto flex items-center gap-4">
//                         {/* <div className="bg-white shadow-md rounded-lg p-2 flex items-center">
//                             <div className="flex flex-col">
//                                 <h3 className="text-xs font-semibold text-gray-900">
//                                     {userData.first_name} {userData.last_name}
//                                 </h3>
//                             </div>
//                         </div> */}
//                         <div className=" rounded-lg p-2 flex items-center">
//                             <div className="flex flex-col">
//                                 <h3 className="text-xl font-semibold text-white">
//                                     {userData.first_name} {userData.last_name}
//                                 </h3>
//                             </div>
//                         </div>

//                         <button
//                             onClick={handleLogout}
//                             type="button"
//                             className="flex items-center p-3 rounded-full hover:bg-gray-200 transition-all duration-300 ease-in-out ">
//                             <FaSignOutAlt className="text-white mr-2" size={30} />
//                             <span className="text-black font-semibold"></span>
//                         </button>
//                     </div>
//                 )}
//             </div>




//             {/* <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-6">
//                 <div className="flex justify-between items-center mb-6">
//                     <div className="w-[30%]">
//                         <img src={logo} alt="logo" className="h-10 w-[30%] mb-5 mt-15" />
//                     </div>

//                     <div className="relative">
//                         {userData && (
//                             <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4">
//                                 <div>
//                                     <h3 className="text-xl font-semibold">
//                                         {userData.first_name} {userData.last_name}
//                                     </h3>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div> */}

//             <div className="bg-white shadow-lg rounded-lg p-6">
//                 <div className="flex flex-wrap justify-center gap-6">
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
        title: 'CRM',
        icon: <i className="fas fa-chart-line"></i>,
        image: 'path-to-crm-image.jpg'
    },
    {
        title: 'Asset Management',
        icon: <i className="fas fa-cogs"></i>,
        image: 'path-to-asset-management-image.jpg'
    },
    {
        title: 'HRMS',
        icon: <i className="fas fa-cogs"></i>,
        image: 'path-to-asset-management-image.jpg'
    },
    {
        title: 'UCS',
        icon: <i className="fas fa-chart-line"></i>,
        image: 'path-to-ucs-image.jpg'
    },

];

const CardPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const [availableBtn, setAvailableBtn] = useState();
    const cardTitles = ['CRM', 'HRMS', 'ASM','UCS'];

    useEffect(() => {
        const getUserAccessibleCard = async () => {
            try {
                console.log(cardTitles, userId);
                let response = await fetch("https://highersystem.onrender.com/verify-access", {
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
        const handlePopState = () => {
            navigate('/');
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
            const response = await axios.post('https://highersystem.onrender.com/verify-token', {
                token: token
            });
            console.log('Token is valid:', response.data);
            navigate('/Cards');
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
            case "CRM": return "CRM"
            case "ASM": return "Asset Management"
            case "HRMS": return "HRMS"
            case "UCS": return "UCS"
            default: return "None"
        }
    }

    const getPageName = (value) => {
        switch (value) {
            case "CRM": return "Profile"
            case "HRMS": return "Cards1"
            case "ASM": return "Asset Management"
            case "UCS": return "UCS"
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
                <h1 className="text-white text-3xl font-bold ml-[35%]"></h1>
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
