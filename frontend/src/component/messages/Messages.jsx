import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import "./message.css";
const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();

  const messageContainerRef = useRef();
  const lastMessageRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Scroll to the last message if the user is at the bottom
  useEffect(() => {
    if (isAtBottom) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAtBottom]);

  // Detect whether the user is at the bottom
  const handleScroll = () => {
    const container = messageContainerRef.current;
    const isBottom =
      container.scrollHeight - container.scrollTop === container.clientHeight;
    setIsAtBottom(isBottom);
  };

  return (
    <div
      ref={messageContainerRef}
      onScroll={handleScroll}
      className="px-4 flex-1 h-full overflow-y-auto scrollbar-hide" // Use custom class
      style={{ maxHeight: "400px" }} // Optional: Adjust the height as needed
    >
      {!loading && messages.length === 0 && (
        <p className="text-center">Start conversation by sending a message</p>
      )}

      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
            <Message message={message} />
          </div>
        ))}
    </div>
  );
};

export default Messages;
