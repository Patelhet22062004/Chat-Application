import React from "react"
import Sidebar from "../component/sidebar/Sidebar"
import MessageContainer from "../component/messages/MessageContainer"

const Home = () => {
  return (
    
    <div className="flex flex-wrap sm:h-[450px] md:h-[550px] shadow-xl rounded-lg overflow-hidden bg-gradient-to-b from-blue-100 to-white">

      <Sidebar />

      <MessageContainer />
    </div>
  )
}

export default Home
