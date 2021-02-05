// get DOM id's
const select_uebung = document.getElementById("select_uebung");
const select_aufgabe = document.getElementById("select_aufgabe");
const select_unteraufgabe = document.getElementById("select_unteraufgabe");
let uebung_data;
let aufgaben_data;
let unteraufgaben_data;
let current_uebung;
let current_aufgabe;
let current_unteraufgabe;
let json;

// initialize
let promise = initializeEditor();

// fetch json data from server and display editor
async function initializeEditor() {
    json = await fetch('file.json').then(x => x.json());
    console.log("fetched data:", json);

    json.forEach(uebung => {
        addOptionToSelect(uebung['exercise'], "select_uebung")
    });

    // add event handlers for UI
    select_uebung.addEventListener("change", id => updateSelects('select_uebung'));
    select_aufgabe.addEventListener("change", id => updateSelects('select_aufgabe'));
    select_unteraufgabe.addEventListener("change", id => updateSelects('select_unteraufgabe'));
    document.getElementById('send_button').addEventListener("click", x => sendData());
    document.getElementById('button_adduebung').addEventListener("click", x => addNewEntity("uebung"));
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
    if (select.selectedIndex !== -1)
        return select.options[select.selectedIndex].value;
    else
        return undefined
}

function addNewEntity(type) {
    switch (type) {
        case "uebung":
            const name = prompt("Name der Übung?", "Übung X");
            json.push({exercise: name, heading: "", tasks: []})
            console.log(json);

            removeAllOptions(select_uebung);
            json.forEach(uebung => {
                addOptionToSelect(uebung['exercise'], "select_uebung")
            });

            select_uebung.selectedIndex = select_uebung.childElementCount - 1;
            updateSelects('select_uebung', json);

    }
}

function updateUebungsDisplay() {
    document.getElementById('edit_heading').value = uebung_data.heading;
}

function updateAufgabenDisplay() {
    document.getElementById('edit_txt').value = aufgaben_data.txt;
}

function updateUnteraufgabenDisplay() {
    const dom_ids = ['edit_q', 'edit_q_extra', 'edit_a', 'edit_src', 'edit_path', 'edit_route'];
    const json_ids = ['q', 'q_extra', 'a', 'src', 'path', 'route'];

    dom_ids.forEach((id, i) => {
        const txt = document.getElementById(id);
        if(unteraufgaben_data[json_ids[i]]) {
            txt.value = unteraufgaben_data[json_ids[i]];
        } else {
            txt.value = "";
        }
    })

function updateSelects(select_id) {
    switch (select_id) {
        case 'select_uebung':
            // get selection
            current_uebung = getCurrentSelection(select_uebung);
            uebung_data = json.find(u => u['exercise'] === current_uebung);

            // update select_aufgabe
            removeAllOptions(select_aufgabe);
            uebung_data['tasks'].forEach(task => {
                addOptionToSelect(task['task'], 'select_aufgabe');
            });

            // update display_uebung
            updateUebungsDisplay();

        case 'select_aufgabe':
            // get selection
            current_aufgabe = getCurrentSelection(select_aufgabe);

            if (current_aufgabe) {
                aufgaben_data = uebung_data['tasks'].find(a => a['task'] === current_aufgabe);

                // update select_unteraufgabe
                removeAllOptions(select_unteraufgabe);
                aufgaben_data['subtasks'].forEach((subtask, i) => {
                    addOptionToSelect(i, 'select_unteraufgabe');
                });

                // update display_aufgaben
                updateAufgabenDisplay();
            }
        case 'select_unteraufgabe':
            // get selection
            current_unteraufgabe = getCurrentSelection(select_unteraufgabe);

            if (current_unteraufgabe) {
                unteraufgaben_data = aufgaben_data['subtasks'][current_unteraufgabe]

                // update display_unteraufgaben
                updateUnteraufgabenDisplay();
            }
    }
    //console.log(uebung_data, aufgaben_data, unteraufgaben_data);
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
