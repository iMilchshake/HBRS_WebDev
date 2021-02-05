// get DOM id's
const select_uebung = document.getElementById("select_uebung");
const select_aufgabe = document.getElementById("select_aufgabe");
const select_unteraufgabe = document.getElementById("select_unteraufgabe");
let uebung_data;
let aufgaben_data;
let unteraufgaben_data;

// initialize
let promise = initializeEditor();

// fetch json data from server and display editor
async function initializeEditor() {
    const json = await fetch('file.json').then(x => x.json());
    console.log("received data:", json);

    json.forEach(uebung => {
        addOptionToSelect(uebung['exercise'], "select_uebung")
    });

    // add event handlers for UI
    select_uebung.addEventListener("change", id => updateSelects('select_uebung', json));
    select_aufgabe.addEventListener("change", id => updateSelects('select_aufgabe', json));

    document.getElementById('send_button').addEventListener("click", function () {
        sendData(json);
    })
}

function sendData(data) {
    let xhr = new XMLHttpRequest();
    const url = "/test.php";
    const jsonData = JSON.stringify(data);
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let jsonResponse = JSON.parse(xhr.responseText);
            console.log(jsonResponse);
        }
    };
    xhr.send(jsonData);
}

function addOptionToSelect(option_name, select_id) {
    const select = document.getElementById(select_id);
    const option = document.createElement("option");
    option.text = option_name;
    select.add(option);
}

function removeAllOptions(select) {
    while (select.firstChild) select.removeChild(select.lastChild);
}

function updateUebungsDisplay() {
    document.getElementById('edit_heading').value = uebung_data.heading;
}

function updateAufgabenDisplay() {
    document.getElementById('edit_txt').value = aufgaben_data.txt;
}

function updateSelects(select_id, json) {
    if (select_id === 'select_uebung') {
        // get selection
        const uebung = select_uebung.options[select_uebung.selectedIndex].value;

        // update select_aufgabe
        uebung_data = json.find(u => u['exercise'] === uebung);
        removeAllOptions(select_aufgabe);
        removeAllOptions(select_unteraufgabe);
        uebung_data['tasks'].forEach(task => {
            addOptionToSelect(task['task'], 'select_aufgabe');
        });

        // update display_uebung
        updateUebungsDisplay();
    }
    if (select_id === 'select_aufgabe' || select_id === 'select_uebung') {
        // get selection
        const aufgabe = select_aufgabe.options[select_aufgabe.selectedIndex].value;

        // update select_unteraufgabe
        aufgaben_data = uebung_data['tasks'].find(a => a['task'] === aufgabe);
        removeAllOptions(select_unteraufgabe);
        aufgaben_data['subtasks'].forEach((subtask, i) => {
            addOptionToSelect(i, 'select_unteraufgabe');
        });

        // update display_aufgaben
        updateAufgabenDisplay();
    }

    console.log(uebung_data, aufgaben_data, unteraufgaben_data);
}
