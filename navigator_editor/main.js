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
    select_unteraufgabe.addEventListener("change", id => updateSelects('select_unteraufgabe', json));

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

function getCurrentSelection(select) {
    return select.options[select.selectedIndex].value;
}

function updateUebungsDisplay() {
    document.getElementById('edit_heading').value = uebung_data.heading;
}

function updateAufgabenDisplay() {
    document.getElementById('edit_txt').value = aufgaben_data.txt;
}

function updateUnteraufgabenDisplay() {
    document.getElementById('edit_q').value = unteraufgaben_data.q;
    if(unteraufgaben_data['q_extra']) document.getElementById('edit_q_extra').value = unteraufgaben_data.q_extra;
    if(unteraufgaben_data['a']) document.getElementById('edit_a').value = unteraufgaben_data.a;
    if(unteraufgaben_data['src']) document.getElementById('edit_src').value = unteraufgaben_data.src;
    if(unteraufgaben_data['path']) document.getElementById('edit_path').value = unteraufgaben_data.path;
    if(unteraufgaben_data['route']) document.getElementById('edit_route').value = unteraufgaben_data.route;
}

function updateSelects(select_id, json) {
    switch (select_id) {
        case 'select_uebung':
            // get selection
            const uebung = getCurrentSelection(select_uebung);
            uebung_data = json.find(u => u['exercise'] === uebung);

            // update select_aufgabe
            removeAllOptions(select_aufgabe);
            uebung_data['tasks'].forEach(task => {
                addOptionToSelect(task['task'], 'select_aufgabe');
            });

            // update display_uebung
            updateUebungsDisplay();

        case 'select_aufgabe':
            // get selection
            const aufgabe = getCurrentSelection(select_aufgabe);
            aufgaben_data = uebung_data['tasks'].find(a => a['task'] === aufgabe);

            // update select_unteraufgabe
            removeAllOptions(select_unteraufgabe);
            aufgaben_data['subtasks'].forEach((subtask, i) => {
                addOptionToSelect(i, 'select_unteraufgabe');
            });

            // update display_aufgaben
            updateAufgabenDisplay();

        case 'select_unteraufgabe':
            // get selection
            const unteraufgabe = getCurrentSelection(select_unteraufgabe);
            unteraufgaben_data = aufgaben_data['subtasks'][unteraufgabe]

            // update display_unteraufgaben
            updateUnteraufgabenDisplay();
    }
    console.log(uebung_data, aufgaben_data, unteraufgaben_data);
}
