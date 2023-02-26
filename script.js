var socket = io.connect("http://localhost:1234");

function toggleAlarm() {
    if (document.getElementById("alarm-checkbox").checked === true) {
        socket.emit("alarm-on");
        console.log("Alarm On");
    } else {
        socket.emit("alarm-off");
        console.log("Alarm Off");
    }
}

function play() {
    socket.emit("play");
    console.log("Play");
}

function pause() {
    socket.emit("pause");
    console.log("Pause");
}

socket.on('connect', function () {
    console.log("Connected");
});