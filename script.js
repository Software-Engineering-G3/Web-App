// Socket.io
let socket;
let connect = false;

// Connection settings
let url = "85.197.159.42";
let port = "4121";
let type = "https";

// Write the settings to the page
document.getElementById("url").innerHTML = url;
document.getElementById("port").innerHTML = port;

// Actuators
let switchRelay = document.getElementById("relay-checkbox");
let switchAlarm = document.getElementById("alarm-checkbox");
let switchFan = document.getElementById("fan-checkbox");
let sliderFan = document.getElementById("fan-range");
let switchWindow = document.getElementById("window-checkbox");
let switchOutdoorLight = document.getElementById("outdoor-light-checkbox");
let sliderIndoorLight = document.getElementById("indoor-light-range");
let switchDoor = document.getElementById("door-checkbox");

// Sensors
let gasDetector = document.getElementById("gas-detector-value");
let ambientLight = document.getElementById("ambient-light-value");
let motion = document.getElementById("motion-value");
let soilHumidity = document.getElementById("soil-humidity-value");
let steam = document.getElementById("steam-value");

window.onload = function () {
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
        socket = io.connect(type + "://" + url + ":" + port, {
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
        console.log("Connected to server");
    });

    socket.on('disconnect', function () {
        //TODO
        console.log("Disconnected from server");
    });

    socket.on('Info', (eventName, eventInfo) => {
        eventName.forEach(device => {
            // ACTUATORS
            // Door
            if (device.component == "dr" && device.state == 1) {
                switchDoor.checked = true;
            }
            // Window
            if (device.component == "wi" && device.state == 1) {
                switchWindow.checked = true;
            }
            // Buzzer
            if (device.component == "bz" && device.state == 1) {
                switchAlarm.checked = true;
            }
            // Fan
            if (device.component == "fan" && device.state != 0) {
                switchFan.checked = true;
                sliderFan.value = device.state;
            }
            // Indoor light
            if (device.component == "il" && device.state == 1) {
                sliderIndoorLight.value = device.state;
            }
            // Outdoor light
            if (device.component == "ol" && device.state == 1) {
                switchOutdoorLight.checked = true;
            }
            // Relay
            if (device.component == "re" && device.state == 1) {
                switchRelay.checked = true;
            }
            // SENSORS
            if (device.component == "light") {
                ambientLight.innerHTML = device.state;
            }
            if (device.component == "gas") {
                gasDetector.innerHTML = device.state;
            }
            if (device.component == "mot") {
                motion.innerHTML = device.state;
            }
            if (device.component == "soil") {
                soilHumidity.innerHTML = device.state;
            }
            if (device.component == "steam") {
                steam.innerHTML = device.state;
            }
            console.log(device);

        });
    });
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
];

for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function (event) { event.stopPropagation(); });
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


