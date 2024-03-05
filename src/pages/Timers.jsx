import React from 'react';
import MyTimer from './MyTimer'; // Adjust the import path based on your file structure
import {useNavigate} from "react-router-dom";

const App = () => {
    const navigate = useNavigate();
    
    return (
        <div style={{ width: "300px", margin: "auto" }}>
            <button onClick={() => navigate("/")}>Go to Home</button>
            <div>
                <MyTimer timerID = {0} initialMinutes={35} />
                <MyTimer timerID = {1} initialMinutes={45} />
            </div>
            <div>
                <MyTimer timerID = {2} initialMinutes={35} />
                <MyTimer timerID = {3} initialMinutes={45} />
            </div>
        </div>
    );
};

export default App;





// import React from "react";
// import {useNavigate} from "react-router-dom";
// import '../styles/styles.css';
// // https://www.geeksforgeeks.org/how-to-create-a-countdown-timer-using-reactjs/
//
// var countdowns = {}; // Object to store countdown intervals for each timer
//
// function startTimer(duration, timerId) {
//     var time = duration * 60; // Convert minutes to seconds
//     if (countdowns[timerId]) clearInterval(countdowns[timerId]); // Clear existing countdown for this timer
//
//     countdowns[timerId] = setInterval(function() {
//         time--;
//         var hours = Math.floor(time / 3600);
//         var minutes = Math.floor((time % 3600) / 60);
//         var seconds = time % 60;
//
//         hours = hours < 10 ? '0' + hours : hours; // If the hours is not 2 digits, add a '0'
//         minutes = minutes < 10 ? '0' + minutes : minutes;
//         seconds = seconds < 10 ? '0' + seconds : seconds;
//
//         document.getElementById('timer' + timerId).innerText = hours + ':' + minutes + ':' + seconds;
//
//         if (time <= 0) clearInterval(countdowns[timerId]);
//     }, 1000);
// }
//
// function resetTimer(timerId, initialTime) {
//     if (countdowns[timerId]) clearInterval(countdowns[timerId]);
//     // document.getElementById('timer' + timerId).innerText = initialTime;
// }
//
// function Timers() {
//     const navigate = useNavigate();
//     return (
//         <div>
//             <h1>Laundry Timer</h1>
//             <h2>Left Room</h2>
//             <div class="row">
//                 <div class="col">
//                     <h2>{timer}</h2>
//                     <div id="timer1" class="timer">00:00:00</div>
//                     <button onClick={startTimer(35, '1')}>Start Washer Timer</button>
//                     <button onClick={resetTimer('1','00:35:00')}>Reset Timer</button>
//                 </div>
//                 <div class="col">
//                     <div id="timer2" class="timer">00:00:00</div>
//                     <button onClick={startTimer(35, '2')}>Start Dryer Timer</button>
//                     <button onClick={resetTimer('2', '00:35:00')}>Reset Timer</button>
//                 </div>
//             </div>
//
//             <h2>Right Room</h2>
//     <div class="row">
//         <div class="col">
//             <div id="timer3" class="timer">00:00:00</div>
//             <button onclick="startTimer(35, '3')">Start Washer Timer</button>
//             <button onclick="resetTimer('3', '00:35:00')">Reset Timer</button>
//         </div>
//         <div class="col">
//             <div id="timer4" class="timer">00:00:00</div>
//             <button onclick="startTimer(45, '4')">Start Dryer Timer</button>
//             <button onclick="resetTimer('4', '00:45:00')">Reset Timer</button>
//         </div>
//     </div>
//         </div>
//     )
// }
//
// export default Timers;