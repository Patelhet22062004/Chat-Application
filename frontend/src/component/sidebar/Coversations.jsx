import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";

const Coversations = () => {
  const { loading, conversations } = useGetConversations();

  // Check if conversations is not an array or loading
  if (loading) {
    return <span className="loading loading-spinner"></span>;
  }

  if (!Array.isArray(conversations) || conversations.length === 0) {
    return <div>No conversations found</div>;
  }

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, index) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIndex={index === conversations.length - 1} // Use conversations.length here
        />
      ))}
    </div>
  );
};

export default Coversations;
