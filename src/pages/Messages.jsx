import {useNavigate} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import ResultBox from "./Result";

function Messages() {
    const [messages, setMessages] = useState([
        "Let's get started",
    ]);
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const [info, setInfo] = useState([]);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [stateInfo, setStateInfo] = useState({});
    const [tripPlanReady, setTripPlanReady] = useState(false);
    const [tripPlan, setTripPlan] = useState(null);

    useEffect(() => {
        if (tripPlanReady) {
          // Do something specific when tripPlanReady is true
          console.log("Trip plan is ready!");
          sendWeather();
        }
        if (weatherData) {
            // Use setState function to update the state properly
            setStateInfo(prevState => ({ ...prevState, real_time_context: weatherData }));
            sendFinalMessage();
          }
      }, [tripPlanReady, weatherData]);


    const sendWeather = async () => {
        try{
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,precipitation&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_hours,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=auto&forecast_days=3');
            const data = await response.json();
            // Save the data as JSON (for example, to a file or variable)
            const jsonData = JSON.stringify(data, null, 2);
            console.log(jsonData);

            // If successful, update the message list with the new message
            if (response.ok) {
                setWeatherData(jsonData); 
                console.log(data);
            } else {
                console.error('Failed to send message:', data.error);
            }
        }catch{}
    }

    const initialize = async () => {
        try{
            const response = await fetch('http://127.0.0.1:5000/api/create_initial_state', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            
            // If successful, update the message list with the new message
            if (response.ok) {
                setStateInfo(data); 
                console.log(data);
            } else {
                console.error('Failed to send message:', data.error);
            }
        }catch{}
    }

    const sendFinalMessage = async () => {
        try {
            // Send the message to the backend via POST request
            const response = await fetch('http://127.0.0.1:5000/api/generate_trip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    state: stateInfo
                }),
            });
    
            const data = await response.json();
    
            // If successful, update the message list with the new message
            if (response.ok) {
                setStateInfo(data.state); // Update the state
                setTripPlan(data.state.trip_plan); // Assuming `setTripPlan` is a React state setter
            } else {
                console.error('Failed to send message:', data.error);
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }   
    };
    


    const sendMessage = async () => {
            setMessages(prevMessages => [...prevMessages, input])
            if (input.trim()) {
                try {
                    // Send the message to the backend via POST request
                    const response = await fetch('http://127.0.0.1:5000/api/process_input', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ 
                            user_input: input,
                            state: stateInfo
                         }),
                    });

                    const data = await response.json();
                    
                    // If successful, update the message list with the new message
                    if (response.ok) {
                        setMessages(prevMessages => [...prevMessages, data.feedback]); // Assuming the backend returns the new message
                        setStateInfo(data.state);
                        setTripPlanReady(data.trip_plan_ready);
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
                <button onClick={sendWeather}>SendWeather</button>
                <button onClick={initialize}>initialize</button>
            </div>
            <div className = "resultBox">{tripPlan && <ResultBox tripPlan={tripPlan} />}</div>
        </div>
    );
}

export default Messages;
