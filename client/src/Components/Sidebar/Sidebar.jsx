import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice.jsx';

const Sidebar = () => {
    // Sample users data (more users added for scroll testing)
    // const [users, setUsers] = useState([
    //     { id: 1, name: 'Ali Khan', image: 'https://avatar.iran.liara.run/public/boy', lastMessage: 'Hello there!', time: '10:30 AM' },
    //     { id: 2, name: 'Sana Ahmed', image: 'https://avatar.iran.liara.run/public/boy', lastMessage: 'Meeting at 5', time: '9:15 AM' },
    //     { id: 3, name: 'Usman Malik', image: 'https://avatar.iran.liara.run/public/boy', lastMessage: 'Send me the files', time: 'Yesterday' },
    //     { id: 4, name: 'Fatima Raza', image: 'https://avatar.iran.liara.run/public/boy', lastMessage: 'Thanks for help', time: 'Yesterday' },
    //     { id: 5, name: 'Bilal Arif', image: 'https://avatar.iran.liara.run/public/boy', lastMessage: 'Call me later', time: 'Monday' },
    //     { id: 6, name: 'Hassan Raza', image: 'https://avatar.iran.liara.run/public/boy', lastMessage: 'Project submitted', time: 'Monday' },
    //     { id: 7, name: 'Ayesha Khan', image: 'https://avatar.iran.liara.run/public/boy', lastMessage: 'See you tomorrow', time: 'Sunday' },
    //     { id: 8, name: 'Imran Shah', image: 'https://avatar.iran.liara.run/public/boy', lastMessage: 'Payment received', time: 'Saturday' },
    //     { id: 9, name: 'Zainab Ali', image: 'https://avatar.iran.liara.run/public/boy', lastMessage: 'Lunch at 1 PM', time: 'Friday' },
    //     { id: 10, name: 'Kamran Butt', image: 'https://avatar.iran.liara.run/public/boy', lastMessage: 'Documents attached', time: 'Thursday' },
    // ])

    const [searchTerm, setSearchTerm] = useState("")
    const [users, setusers] = useState([])
    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/auth/get-all-users`);
                console.log("response: ", response.data.users);
                setusers(response.data.users)
            } catch {
                toast.error(error.response.data.message)
            }
        }

        getAllUsers()

    }, [])


    const navigate = useNavigate();
    const dispatch = useDispatch();


    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleLogout = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/auth/logout`);
            if (response.status === 200) {
                dispatch(logout()); // Redux state clear karo
                toast.success(response.data.message)
                navigate("/login")
            }
        } catch (error) {
            toast.error(error.response.data.message || "Logout failed")

        }
    }

    return (
        <div className="w-1/3 border-r border-gray-300 bg-[#F6F5F4] flex flex-col h-screen">
            {/* Header with Search */}
            <div className="p-3 bg-[#F6F5F4]">
                <div className="flex items-center bg-white rounded-full px-4 py-2 w-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full outline-none text-gray-700 bg-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Users List with Scrollbar */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                {filteredUsers.map(user => (
                    <div key={user._id} className="flex items-center p-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer bg-white">
                        <img
                            src={user.profilePicture}
                            alt={user.name}
                            className="w-12 h-12 rounded-full object-cover mr-3"
                        />
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-gray-800">{user.name}</h3>
                                {/* <span className="text-xs text-gray-500">{user.time}</span> */}
                            </div>
                            {/* <p className="text-sm text-gray-600 truncate">{user.lastMessage}</p> */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Logout Button at Bottom */}
            <div className="p-3 bg-[#F6F5F4] border-t border-gray-300">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Sidebar