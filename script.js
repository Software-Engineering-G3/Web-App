let socket;
let connect = false;
let url = "192.168.8.185";
let port = "4121";

function toggleConnection() {
    connect = !connect;
    console.log(connect);
    if (connect === true) {
        document.getElementById("connection-status").innerHTML = "Connecting...";
        document.getElementById("connect-button").innerHTML = "Cancel";
        socket = io.connect("http://" + url + ":" + port, {
            extraheaders: {
                "Access-Control-Request-Private-Network": "true"
            }
        });
        registerSocketEvents();
    } else {
        socket.disconnect();
        document.getElementById("connection-status").innerHTML = "Disconnected";
        document.getElementById("connect-button").innerHTML = "Connect";
    }
}

function registerSocketEvents() {
    socket.on('connect', function () {
        document.getElementById("connection-status").innerHTML = "Connected";
        document.getElementById("connect-button").innerHTML = "Disconnect";
        console.log("Connected");
    });

    socket.on('disconnect', function () {
        document.getElementById("connection-status").innerHTML = "Connecting...";
        document.getElementById("connect-button").innerHTML = "Cancel";
        console.log("Disconnected");
    });

}

function toggleAlarm() {
    if (document.getElementById("alarm-checkbox").checked === true) {
        socket.emit("alarm-on");
        console.log("Alarm On");
    } else {
        socket.emit("alarm-off");
        console.log("Alarm Off");
    }
}

function toggleLight() {
    if (document.getElementById("light-checkbox").checked === true) {
        socket.emit("won");
        console.log("Light On");
    } else {
        socket.emit("woff");
        console.log("Light Off");
    }
}

function toggleFan() {
    if (document.getElementById("fan-checkbox").checked === true) {
        socket.emit("fa200");
        console.log("Fan On");
    } else {
        socket.emit("fs");
        console.log("Fan Off");
    }
}

function play() {
    socket.emit("play");
    console.log("Play music");
}

function pause() {
    socket.emit("pause");
    console.log("Pause music");
}