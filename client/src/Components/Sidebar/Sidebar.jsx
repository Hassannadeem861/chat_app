import React, { useState, useEffect } from "react";
import { handleLogout, getAllUsers } from "../../Services/Api.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [users, setusers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers(dispatch);
      setusers(users);
    };
    fetchUsers();
  }, []);

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
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center p-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer bg-white"
          >
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
          onClick={() => handleLogout(navigate, dispatch)}
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
  );
};

export default Sidebar;
