import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OrderChat({ order_id, userType, userId }) {
  // userType: 'customer' or 'vendor'
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const res = await fetch(`http://localhost:5000/vendor/messages/${order_id}`);
      const data = await res.json();
      if(data.success) setMessages(data.messages);
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // fetch every 3 sec
    return () => clearInterval(interval);
  }, [order_id]);

  // Send new message
  const sendMessage = async () => {
    if(!newMessage.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/vendor/messages/send`, {
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          order_id,
          sender_type: userType,
          sender_id: userId,
          message: newMessage
        })
      });

      const data = await res.json();
      if(data.success){
        setNewMessage("");
        fetchMessages();
      } else {
        toast.error("Failed to send message");
      }
    } catch(err){
      console.log(err);
      toast.error("Server error");
    }
  };

  return (
   <div className="order-chat">
      <h3>Chat for Order #{order_id}</h3>

     <div className="chat-messages">
      
        {messages.map((msg) => (
      <div
        key={msg.message_id}
        className={`chat-message ${
          msg.sender_type === userType ? "customer" : "vendor"
        }`}
      >
        <b>{msg.sender_type}:</b> {msg.message}
      </div>
    ))}
    

      </div>

      <div style={{marginTop:"10px"}}>
        <input
          type="text"
          value={newMessage}
          onChange={(e)=>setNewMessage(e.target.value)}
          placeholder="Type your message"
          style={{width:"70%"}}
        />
        <button onClick={sendMessage} style={{width:"28%", marginLeft:"2%"}}>Send</button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default OrderChat;