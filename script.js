// Socket.io
let socket;
let connect = false;

// Connection settings
let url = "192.168.8.185";
let port = "4122";

// Write the settings to the page
document.getElementById("url").innerHTML = url;
document.getElementById("port").innerHTML = port;
let switchRelay=document.getElementById("relay-checkbox");
let switchAlarm=document.getElementById("alarm-checkbox");
let switchFan=document.getElementById("fan-checkbox");
let switchWindow=document.getElementById("window-checkbox");
let switchOutdoorLamp=document.getElementById("outdoor-lamp-checkbox");
let switchDoor=document.getElementById("door-checkbox");

window.onload = function() {
    toggleConnection();
};

function checkConnection() {
    //TODO check credentials, if they match we load the main page 
    window.location.replace("main.html");
}
  
function toggleConnection() {
    connect = !connect;
    console.log(connect);
    if (connect === true) {
       // document.getElementById("connection-status").innerHTML = "Connecting...";
        //document.getElementById("connect-button").innerHTML = "Cancel";
        socket = io.connect("http://" + url + ":" + port, {
            extraheaders: {
                "Access-Control-Request-Private-Network": "true"
            }
        });
        registerSocketEvents();
    } else {
        socket.disconnect();
        document.getElementById("connection-status").innerHTML = "Disconnected";
        document.getElementById("connect-button").innerHTML = " Connect";
    }
}

function registerSocketEvents() {
    socket.on('connect', function () {
        document.getElementById("connection-status").innerHTML = " Connected";
        //document.getElementById("connect-button").innerHTML = "Disconnect";
        console.log("Connected");
    });

    socket.on('disconnect', function () {
        //TODO 
    });

    socket.on('Info', (eventName, eventInfo) => {
        eventName.forEach(actuators => {
            if(actuators.component=="dr" && actuators.state==1){
                switchDoor.checked=true;
            }
            if(actuators.component=="wi" && actuators.state==1 ){
                switchWindow.checked=true;
            }
            if(actuators.component=="bz" && actuators.state==0 ){
                switchAlarm.checked=true;
            }
            if(actuators.component=="fan" && actuators.state==0 ){
                switchFan.checked=true;
                
            }
            if(actuators.component=="il" && actuators.state==1 ){
                // TODO check for intensity with alberto 
            }
            if(actuators.component=="ol" && actuators.state==1 ){
                switchOutdoorLamp.checked=true;
            }
            if(actuators.component=="re" && actuators.state==1 ){
                switchRelay.checked=true;
            }
            console.log(actuators); // temporary to be deleted
          
        });
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

function toggleOutdoorLight() {
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

function updateIndoorLight(event) {
    let intensity = document.getElementById("indoor-light-range").value;
    socket.emit("-il_" + intensity);
    console.log("Indoor Light: " + intensity);
}

function toggleFan() {
    if (document.getElementById("fan-checkbox").checked === true) {
        let speed = document.getElementById("fanRange").value;
        socket.emit("-fan_" + speed);
        console.log("Fan On, speed: " + speed);
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
let btnActuators = document.getElementById('btnActuators');
let btnMusic = document.getElementById('btnMusic');
let btnSettings = document.getElementById('btnSettings');
let btnSensors = document.getElementById('btnSensors');

let divActuators = document.getElementById('actuators');
let divSensors = document.getElementById('sensors');
let divMusic = document.getElementById('musicPlayer');
let divSettings = document.getElementById('settings');

btnSensors.addEventListener('click', () => {
    divSensors.style.display = 'block';
    divMusic.style.display = 'none';
    divSettings.style.display = 'none';
    divActuators.style.display = 'none';

});

btnActuators.addEventListener('click', () => {
    divSensors.style.display = 'none';
    divMusic.style.display = 'none';
    divSettings.style.display = 'none';
    divActuators.style.display = 'block';

});

btnMusic.addEventListener('click', () => {
    divSensors.style.display = 'none';
    divActuators.style.display = 'none';
    divSettings.style.display = 'none';
    divMusic.style.display = 'block';

});

btnSettings.addEventListener('click', () => {
    divSensors.style.display = 'none';
    divActuators.style.display = 'none';
    divMusic.style.display = 'none';
    divSettings.style.display = 'block';

});

//flipping card 

const card = document.querySelector(".flip-card");

card.addEventListener("click", function (e) {
    card.classList.toggle('is-flipped');
});

// Disable propagation of click event to parent element
const elements = [
    document.querySelector("#outdoor-light-checkbox-span"),
    document.querySelector("#outdoor-light-checkbox"),
    document.querySelector("#indoor-light-range"),
]

for (let i = 0; i < elements.length; i ++) {
    elements[i].addEventListener("click", function(event) { event.stopPropagation(); });
}


// get settings input from form
let form = document.forms["settingsForm"];
form.addEventListener("submit", getValues);



function getValues(event) {

    event.preventDefault();
    url = this.url.value;
    port = this.portNumber.value;
    document.getElementById("url").innerHTML = url;
    document.getElementById("port").innerHTML = port;
}


