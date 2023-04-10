// Socket.io
let socket;
let connected;

// Conncetion parameters
let ip;
let port;
let https;
let type;
updateConnectionSettings();

// Connection settings
function updateConnectionSettings() {
    ip = localStorage.getItem("ip") || "85.197.159.42";
    port = localStorage.getItem("port") || "4121";
    type = localStorage.getItem("type") || "https";
    if (localStorage.hasOwnProperty("type")) {
        https = localStorage.getItem("type") === "https";
    }
    else {
        https = "true";
    }

    // Write the settings to the page
    document.getElementById("ip").innerHTML = ip;
    document.getElementById("port").innerHTML = port;
    document.getElementById("https").checked = https;
}

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
    connect();
};

function checkConnection() {
    //TODO check credentials, if they match we load the main page 
    window.location.replace("main.html");
}

function connect() {
    console.log("Connecting...");
    document.getElementById("connection-status").innerHTML = "Connecting...";
    // document.getElementById("connect-button").innerHTML = "Cancel";
    socket = io.connect(type + "://" + ip + ":" + port, {
        extraheaders: {
            "Access-Control-Request-Private-Network": "true"
        }
    });
    connected = true;
    registerSocketEvents();
}

function disconnect() {
    socket.disconnect();
    connected = false;
    document.getElementById("connection-status").innerHTML = "Disconnected";
    // document.getElementById("connect-button").innerHTML = " Connect";
}


function registerSocketEvents() {
    socket.on('connect', function () {
        document.getElementById("connection-status").innerHTML = " Connected";
        //document.getElementById("connect-button").innerHTML = "Disconnect";
        console.log("Connected to server");
    });

    socket.on('disconnect', function () {
        //TODO
        document.getElementById("connection-status").innerHTML = "Disconnected";
        console.log("Disconnected from server");
    });

    socket.on('Info', (eventName, eventInfo) => {
        console.log(eventName);
        eventName.forEach(device => {
            // ACTUATORS
            // Door
            if (device.component == "dr") {
                switchDoor.checked = device.state;
            }
            // Window
            if (device.component == "wi") {
                switchWindow.checked = device.state;
            }
            // Buzzer
            if (device.component == "bz") {
                switchAlarm.checked = device.state;
            }
            // Fan
            if (device.component == "fan") {
                if (device.state != 0) {
                    switchFan.checked = true;
                    sliderFan.value = device.state;
                }
                if (device.state == 0) {
                    switchFan.checked = false;
                }
            }
            // Indoor light
            if (device.component == "il") {
                sliderIndoorLight.value = device.state;
            }
            // Outdoor light
            if (device.component == "ol") {
                switchOutdoorLight.checked = device.state;
            }
            // Relay
            if (device.component == "re") {
                switchRelay.checked = device.state;
            }
            // SENSORS
            // Ambient light
            if (device.component == "light") {
                ambientLight.innerHTML = device.state;
            }
            // Gas detector
            if (device.component == "gas") {
                gasDetector.innerHTML = device.state;
            }
            // Motion
            if (device.component == "mot") {
                motion.innerHTML = device.state;
            }
            // Soil humidity
            if (device.component == "soil") {
                soilHumidity.innerHTML = device.state;
            }
            // Steam
            if (device.component == "steam") {
                steam.innerHTML = device.state;
            }
            // MUSIC PLAYER
            if (device.component == "player") {
                loadSong(device.title, device.artist);
                volumeChanged(device.volume);
                if (device.state == "Playing") {
                    console.log("Music is playing")
                    playing();
                }
                if (device.state == "Paused") {
                    console.log("Music is paused")
                    paused();
                }
            }
        });
    });
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
let form = document.forms["update-connection-settings"];
form.addEventListener("submit", getValues);



function getValues(event) {
    event.preventDefault();
    disconnect();
    localStorage.setItem("ip", this.ip.value);
    localStorage.setItem("port", this.port.value);
    if (this.https.checked) {
        localStorage.setItem("type", "https");
    } else {
        localStorage.setItem("type", "http");
    }
    updateConnectionSettings();
    connect();
}


