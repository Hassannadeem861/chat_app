import React, { useState, useEffect } from 'react'
import { getAllMessages, SendMessage } from "../../Services/Api.js";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'

const Message = () => {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const selectedUser = useSelector((state) => state.auth.selectedUser?.users);
  const currentUserId = useSelector((state) => state.auth.user._id);
  const selectedUserMessage = useSelector((state) => state?.message?.message?.message);
  // console.log("selectedUserMessage: ", selectedUserMessage);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser?._id) {
        try {
          const allMessages = await getAllMessages(selectedUser, token, dispatch);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };
    fetchMessages();
  }, [selectedUser])



  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = async () => {
  const res =  await SendMessage(selectedUser, newMessage, token, dispatch);
  console.log("res: ", res);
  
    setNewMessage('')
  }

  return (
    <div className="flex-1 flex flex-col">

      {/* Chat Header */}
      <div className="p-3 border-b border-gray-300 bg-white flex items-center">
        <img
          src={selectedUser?.profilePicture}
          alt="User"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{selectedUser?.name}</h3>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {selectedUserMessage
          ?.filter(msg =>
            (msg.senderId === currentUserId && msg.receiverId === selectedUser?._id) ||
            (msg.senderId === selectedUser?._id && msg.receiverId === currentUserId)
          )
          .map(messages => (
            <div
              key={messages?._id}
              className={`mb-4 flex ${messages.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${messages.senderId === currentUserId
                  ? 'bg-blue-500 text-white rounded-tr-none'
                  : 'bg-white text-gray-800 rounded-tl-none shadow'
                  }`}
              >
                <p>{messages.message}</p>
                <p className="text-xs text-gray-600 mt-1 text-right">
                  {new Date(messages.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

            </div>
          ))}
      </div>


      {/* Message Input */}
      <div className="p-3 bg-white border-t border-gray-300 flex">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>

    </div>
  )
}

export default Message