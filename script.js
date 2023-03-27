let socket;
let connect = false;
let url = "192.168.8.185";
let port = "4122";

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
    if (document.getElementById("outdoor-lamp-checkbox").checked === true) {
        socket.emit("-ol_1");
        socket.emit("-il_255");
        console.log("Outdoor Light On");
    } else {
        socket.emit("-ol_0");
        socket.emit("-il_0");
        console.log("Outdoor Light Off");
    }
}

function toggleFan() {
    if (document.getElementById("fan-checkbox").checked === true) {
        socket.emit("-fan_255");
        console.log("Fan On");
    } else {
        socket.emit("-fan_0");
        console.log("Fan Off");
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

function play() {
    socket.emit("play");
    console.log("Play music");
}

function pause() {
    socket.emit("pause");
    console.log("Pause music");
}


// DIV game of shadows
let btnActuators=document.getElementById('btnActuators');
let btnMusic=document.getElementById('btnMusic');
let btnSettings=document.getElementById('btnSettings');
let btnSensors=document.getElementById('btnSensors');

let divActuators=document.getElementById('actuators');
let divSensors=document.getElementById('sensors');
let divMusic=document.getElementById('musicPlayer');
let divSettings=document.getElementById('settings');

btnSensors.addEventListener('click',() =>{
    divSensors.style.display = 'block';
    divMusic.style.display = 'none';
    divSettings.style.display = 'none';
    divActuators.style.display = 'none';
    
})

btnActuators.addEventListener('click',() =>{
    divSensors.style.display = 'none';
    divMusic.style.display = 'none';
    divSettings.style.display = 'none';
    divActuators.style.display = 'block';
    
})

btnMusic.addEventListener('click',() =>{
    divSensors.style.display = 'none';
    divActuators.style.display = 'none';
    divSettings.style.display = 'none';
    divMusic.style.display = 'block';
    
})

btnSettings.addEventListener('click',() =>{
    divSensors.style.display = 'none';
    divActuators.style.display = 'none';
    divMusic.style.display = 'none';
    divSettings.style.display = 'block';
    
})

//flipping card 

const card = document.querySelector(".flip-card");

card.addEventListener("click", function (e) {
  card.classList.toggle('is-flipped');
});


// get settings input from form
let form = document.forms["settingsForm"];
form.addEventListener("submit", getValues);

function getValues(event){

   event.preventDefault();
   let url = this.url.value
   let portNumber = this.portNumber.value
}


