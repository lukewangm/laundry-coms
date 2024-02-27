var countdowns = {}; // Object to store countdown intervals for each timer

function startTimer(duration, timerId) {
    var time = duration * 60; // Convert minutes to seconds
    if (countdowns[timerId]) clearInterval(countdowns[timerId]); // Clear existing countdown for this timer

    countdowns[timerId] = setInterval(function() {
        time--;
        var hours = Math.floor(time / 3600);
        var minutes = Math.floor((time % 3600) / 60);
        var seconds = time % 60;

        hours = hours < 10 ? '0' + hours : hours; // If the hours is not 2 digits, add a '0'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        document.getElementById('timer' + timerId).innerText = hours + ':' + minutes + ':' + seconds;
        
        if (time <= 0) clearInterval(countdowns[timerId]);
    }, 1000);
}

function resetTimer(timerId, initialTime) {
    if (countdowns[timerId]) clearInterval(countdowns[timerId]);
    document.getElementById('timer' + timerId).innerText = initialTime;
}
