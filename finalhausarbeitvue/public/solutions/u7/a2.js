// initialize variables
let redner_list = document.getElementById('redner_list');
let redner_button = document.getElementById('redner_button');
let redner_name = document.getElementById('redner_name');
let redners = [];
let currentRedner;

// timer
const timerStep = 100;
let timer = setInterval(myTimer, timerStep);


// functions
function addRedner(name) {
    if(redners.find(x => x.name == name)) {
        // redner was already added
        console.warn(name, "was already added!");
    } else {
        // add name to HTML-list
        let node = document.createElement("li");

        let nameTextNode = document.createTextNode(name);
        let nameNode = document.createElement("p");
        nameNode.appendChild(nameTextNode);

        let timeTextNode = document.createTextNode(msToTime(0));
        let timeNode = document.createElement("p");
        timeNode.appendChild(timeTextNode);

        let buttonNode = document.createElement("button");
        buttonNode.innerHTML = "Stop";
        buttonNode.addEventListener("click", x => {
            startStop(name)
        });

        node.appendChild(nameNode);
        node.appendChild(timeNode);
        node.appendChild(buttonNode);
        redner_list.appendChild(node);

        console.log(name, "was added");
        redners.push({
            name: name,
            time_ms: 0,
            timeField: timeTextNode,
            button: buttonNode
        });

        // set as current active redner
        startStop(name);
    }

    // clear input field
    redner_name.value = "";
}

// simulate user inputs for easier debugging
function fillDummyNames() {
    redner_name.value = "Stephen Hawking";
    redner_button.click();
    redner_name.value = "Albert Einstein";
    redner_button.click();
    redner_name.value = "Nikola Tesla";
    redner_button.click();
    redner_name.value = "Nikola Tesla";
    redner_button.click(); // try to add twice
}

// convert time (in ms) into Date-format
function msToTime(ms) {
    return new Date(ms).toISOString().slice(11, -1);
}

// timer function gets called every timerStep ms
function myTimer() {
    try {
        const r = redners.find(x => x.name == currentRedner);
        r.time_ms += timerStep;
        r.timeField.textContent = msToTime(r.time_ms);
    } catch(e) {
        console.warn("no redner is selected");
    }
}

// function will start/stop the timer for a given name
function startStop(name) {
    const r = redners.find(x => x.name === name);
    const rOld = redners.find(x => x.name === currentRedner);
    if(r) {
        if (currentRedner === name) {  // already selected => STOP
            currentRedner = "";
            r.button.innerHTML = "Start";
            console.log("timer for", name, "was stopped");
        } else {  // not selected => START
            currentRedner = name;
            r.button.innerHTML = "Stop";
            if(rOld) {
                rOld.button.innerHTML = "Start";
            }
            console.log("timer for", name, "was started");
        }
    }
}

// add event listener for "Add"-button
redner_button.addEventListener("click", x => {
    addRedner(redner_name.value);
});

// click "Add" Button when pressing the "Return" Key on the Keyboard
redner_name.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        redner_button.click();
    }
});