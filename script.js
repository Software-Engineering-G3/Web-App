var socket = io.connect("http://localhost:1234");

function toggleLight() {
    if (document.getElementById("light-checkbox").checked === true) {
        socket.emit("light-on");
        console.log("Light On");
    } else {
        socket.emit("light-off");
        console.log("Light Off");
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