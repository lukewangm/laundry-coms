import {useNavigate} from "react-router-dom";
import React, { useState, useEffect } from 'react';

function Messages() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const socket = new WebSocket('ws://localhost:3000');
    const navigate = useNavigate();

    useEffect(() => {
        socket.onmessage = (event) => {
            const receivedMessage = event.data;
            setMessages([...messages, receivedMessage]);
        };
    }, [messages]);

    const sendMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(input);
            setInput('');
        } else {
            console.error('WebSocket is not open. Message not sent.');
        }
    };


    return (
        <div className="chat-app">
            <h1>Messages</h1>
            <button onClick={() => navigate("/")}>Go to Home</button>
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>

        </div>
    );
}

export default Messages;
