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
function toggleDoor() {
    if (document.getElementById("door-checkbox").checked === true) {
        socket.emit("Door-open");
        console.log("Door Open");
    } else {
        socket.emit("Door-closed");
        console.log("Door Closed");
    }
}
function toggleFan() {
    if (document.getElementById("fan-checkbox").checked === true) {
        socket.emit("Fan-on");
        console.log("Fan On");
    } else {
        socket.emit("Fan-off");
        console.log("Fan Off");
    }
}
function toggleRelay() {
    if (document.getElementById("relay-checkbox").checked === true) {
        socket.emit("Relay-on");
        console.log("Relay On");
    } else {
        socket.emit("Relay-off");
        console.log("Relay Off");
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