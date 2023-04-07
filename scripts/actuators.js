function toggleAlarm() {
    if (document.getElementById("alarm-checkbox").checked === true) {
        socket.emit("-bz_1");
        console.log("Alarm On");
    } else {
        socket.emit("-bz_0");
        console.log("Alarm Off");
    }
}

function toggleDoor() {
    if (document.getElementById("door-checkbox").checked === true) {
        socket.emit("-dr_1");
        console.log("Door Open");
    } else {
        socket.emit("-dr_0");
        console.log("Door Closed");
    }
}

function updateFan() {
    if (document.getElementById("fan-checkbox").checked === true) {
        let speed = document.getElementById("fan-range").value;
        socket.emit("-fan_" + speed);
        console.log("Fan On, speed: " + speed);
    } else {
        socket.emit("-fan_0");
        console.log("Fan Off");
    }
}

function updateIndoorLight(event) {
    let intensity = document.getElementById("indoor-light-range").value;
    socket.emit("-il_" + intensity);
    console.log("Indoor Light: " + intensity);
}

function toggleOutdoorLight() {
    if (document.getElementById("outdoor-light-checkbox").checked === true) {
        socket.emit("-ol_1");
        console.log("Outdoor Light On");
    } else {
        socket.emit("-ol_0");
        console.log("Outdoor Light Off");
    }
}

function toggleRelay() {
    if (document.getElementById("relay-checkbox").checked === true) {
        socket.emit("-re_1");
        console.log("Relay On");
    } else {
        socket.emit("-re_0");
        console.log("Relay Off");
    }
}

function toggleWindow() {
    if (document.getElementById("window-checkbox").checked === true) {
        socket.emit("-wi_1");
        console.log("Window Open");
    } else {
        socket.emit("-wi_0");
        console.log("Window Closed");
    }
}