import React from 'react'
import Sidebar from '../Sidebar/Sidebar.jsx'
import Message from '../MessageSection/Message.jsx'

const Home = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar/>
      <Message/>
    </div>
  )
}

export default Home