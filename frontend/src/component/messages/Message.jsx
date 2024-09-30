import React from "react";
import userAvatar from "../../assets/user.png"; // Default user avatar
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { formatTime } from "../../utils/formatTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const messageFromMe = message.senderId === authUser._id;
  const chatClassName = messageFromMe ? "justify-end" : "justify-start";
  const profilePic = messageFromMe ? authUser.profilePic || userAvatar : selectedConversation?.profilePic || userAvatar;
  const msgBgColor = messageFromMe ? "bg-green-500 text-white" : "bg-gray-300 text-black";

  const formattedTime = formatTime(message.createdAt);

  return (
    <div className={`flex items-end ${chatClassName} my-2`}>
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
        <img src={profilePic} alt="User Avatar" className="object-cover" />
      </div>

      {/* Message Bubble */}
      <div className={`rounded-lg px-4 py-2 ${msgBgColor} max-w-xs break-words shadow-md`}>
        {message.message}
      </div>

      {/* Timestamp */}
      <div className="text-xs text-gray-500 ml-2">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
