import {useNavigate} from "react-router-dom";
import React, { useState, useEffect } from 'react';

function Messages() {
    const [messages, setMessages] = useState([
        "Let's get started",
    ]);
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const [info, setInfo] = useState([]);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Optional: You can load initial messages from the backend here
        // fetchMessages();
    }, []);

    // const sendWeather = async () => {
    //     try{
    //         await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,precipitation&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_hours,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=auto&forecast_days=3');
    //     }catch{}

    //     try {
    //         // Send the message to the backend via POST request
    //         const response = await fetch('http://127.0.0.1:5000/api/weatherInfo', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ 
    //                 weatherInfo: weather
    //             }),
    //         });

    //         const data = await response.json();
            
    //         // If successful, update the message list with the new message
    //         if (response.ok) {
    //             setMessages(prevMessages => [...prevMessages, data.message]); // Assuming the backend returns the new message
    //             setInput(''); // Clear input field after sending
    //         } else {
    //             console.error('Failed to send message:', data.error);
    //         }
    //     } catch (error) {
    //         console.error("Error sending message:", error);
    //     }
    // }

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/messages');
            const data = await response.json();
            setMessages(data.messages);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const sendMessage = async () => {
            setMessages(prevMessages => [...prevMessages, input])
            if (input.trim()) {
                try {
                    // Send the message to the backend via POST request
                    const response = await fetch('http://127.0.0.1:5000/api/messages', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ 
                            text: input,
                            weatherInfo: info
                         }),
                    });

                    const data = await response.json();
                    
                    // If successful, update the message list with the new message
                    if (response.ok) {
                        setMessages(prevMessages => [...prevMessages, data.message]); // Assuming the backend returns the new message
                        setInput(''); // Clear input field after sending
                    } else {
                        console.error('Failed to send message:', data.error);
                    }
                } catch (error) {
                    console.error("Error sending message:", error);
                }
        }
    };



    return (
        <div className="chat-app">
            <h1>Messages</h1>
            <button onClick={() => navigate("/")}>Go to Home</button>
            <div className="messages">
                {messages.map((message, index) => (
                    <div className="message" key={index}>{message}</div>
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
