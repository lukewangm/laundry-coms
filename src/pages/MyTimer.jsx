import React, { useState, useRef } from "react";

const MyTimer = ({timerID = 0, initialMinutes = 45}) => {
    const Ref = useRef(null);
    const [timer, setTimer] = useState(`00:${initialMinutes}:00`);
    const [isActive, setIsActive] = useState(false);
    const socket = new WebSocket('ws://localhost:3000');

    const getTimeRemaining = (endtime) => {
        const total = Date.parse(endtime) - new Date();
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        return { total, hours, minutes, seconds };
    };

    const startTimer = (endtime) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(endtime);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : "0" + hours) + ":" +
                (minutes > 9 ? minutes : "0" + minutes) + ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        } else {
            clearInterval(Ref.current);
            setIsActive(false);
        }
    };

    const clearTimer = (endtime) => {
        if (Ref.current) clearInterval(Ref.current); // Clear any existing timer
        const id = setInterval(() => {
            startTimer(endtime);
        }, 1000);
        Ref.current = id; // Set the new timer
    };

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setMinutes(deadline.getMinutes() + initialMinutes);
        return deadline;
    };

    const onClickReset = () => {
        clearInterval(Ref.current); // Clear the existing interval
        Ref.current = null; // Reset the ref
        setTimer(`00:${initialMinutes}:00`); // Reset the timer display
        setIsActive(false); // Mark the timer as inactive
        if (socket && socket.readyState === WebSocket.OPEN) {
            const timerMsg = {
                id: timerID,
                endTime: " ",
                reset: true
            };
            socket.send(JSON.stringify(timerMsg));
        } else {
            console.error('WebSocket is not open. Message not sent.');
        }
    };

    const startButtonHandler = () => {
        setIsActive(true); // Activate the timer
        const deadTime = getDeadTime(); // Get the deadline for the timer
        if (!Ref.current) { // Check if the timer is not already running
            clearTimer(deadTime); // Start the timer
            if (socket && socket.readyState === WebSocket.OPEN) {
                const deadTimeString = deadTime.toISOString();
                const timerMsg = {
                    id: timerID,
                    endTime: deadTimeString,
                    reset: false,
                    newClient: false
                };
                socket.send(JSON.stringify(timerMsg));
            } else {
                console.error('WebSocket is not open. Message not sent.');
            }
        }
    };

    // socket.onopen = function() {
    //     console.log('Connection established');
    
    //     // Send a message to the server requesting the current timer information
    //     const message = JSON.stringify({
    //         type: 'request',
    //         action: 'getTimerInfo'
    //     });
    
    //     socket.send(message);
    // };

    socket.onmessage = function(event) {
        console.log('Message from server:', event.data);
        const message = JSON.parse(event.data);
        if(message.id === timerID){
            if(message.reset === true){
                clearInterval(Ref.current); // Clear the existing interval
                Ref.current = null; // Reset the ref
                setTimer(`00:${initialMinutes}:00`); // Reset the timer display
                setIsActive(false); // Mark the timer as inactive
            }
            else{
                const deadTime = new Date(message.endTime); // Convert ISO string back to Date object
                clearTimer(deadTime);
            }
        }
    };

    return (
        <div style={{ margin: "10px", textAlign: "center" }}>
            <h2>{timer}</h2>
            <button onClick={startButtonHandler}>Start Timer</button>
            <button onClick={onClickReset}>Reset</button>
        </div>
    );
};

export default MyTimer;

    // // Event listener for receiving messages from the server
    // socket.onmessage = function(event) {
    //     console.log('Message from server:', event.data);
    // };

    // // Event listener for handling possible errors
    // socket.onerror = function(error) {
    //     console.error('WebSocket error:', error);
    // };

    // // Event listener for when the connection is closed
    // socket.onclose = function(event) {
    //     console.log('Connection is closed', event);
    // };