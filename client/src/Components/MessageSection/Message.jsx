import React, { useState } from 'react'

const Message = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello, how are you?', sender: 'other', time: '10:30 AM' },
    { id: 2, text: 'I am good, thanks for asking!', sender: 'me', time: '10:31 AM' },
    { id: 3, text: 'What about our meeting tomorrow?', sender: 'other', time: '10:32 AM' },
    { id: 4, text: 'Yes, it is at 2 PM in the office', sender: 'me', time: '10:33 AM' },
  ])
  
  const [newMessage, setNewMessage] = useState('')
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return
    
    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages([...messages, message])
    setNewMessage('')
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="p-3 border-b border-gray-300 bg-white flex items-center">
        <img 
          src="https://avatar.iran.liara.run/public/boy" 
          alt="User"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="font-semibold text-gray-800">Muhammad hassan</h3>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`mb-4 flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'me' 
                ? 'bg-blue-500 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 rounded-tl-none shadow'}`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                {message.time}
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