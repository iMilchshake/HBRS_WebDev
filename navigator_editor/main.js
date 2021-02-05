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
    createAufgabenOptions();

    // add event handlers for UI
    select_uebung.addEventListener("change", id => updateSelects('select_uebung'));
    select_aufgabe.addEventListener("change", id => updateSelects('select_aufgabe'));
    select_unteraufgabe.addEventListener("change", id => updateSelects('select_unteraufgabe'));
    document.getElementById('send_button').addEventListener("click", x => sendData());
    document.getElementById('button_adduebung').addEventListener("click", x => addNewEntity("uebung"));
    document.getElementById('button_addaufgabe').addEventListener("click", x => addNewEntity("aufgabe"));
    document.getElementById('button_debug').addEventListener("click", x => debug());
}

function debug() {
    console.log("DEBUG:");
    console.log("uebung_data", uebung_data);
    console.log("aufgaben_data", aufgaben_data);
    console.log("unteraufgaben_data", unteraufgaben_data);
    console.log("current_uebung", current_uebung);
    console.log("current_aufgabe", current_aufgabe);
    console.log("current_unteraufgabe", current_unteraufgabe);
    console.log("json", json);
}

function createAufgabenOptions() {
    removeAllOptions(select_uebung);
    removeAllOptions(select_unteraufgabe);
    removeAllOptions(select_aufgabe);

    json.forEach(uebung => {
        addOptionToSelect(uebung['exercise'], "select_uebung")
    });

    updateSelects('select_uebung');
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
            const u = prompt("Name der Übung?", "Übung X");
            json.push({exercise: u, heading: "", tasks: []})
            createAufgabenOptions();
            select_uebung.selectedIndex = select_uebung.childElementCount - 1;
            updateSelects('select_uebung');
            console.log(uebung_data, aufgaben_data, unteraufgaben_data)
            break;
        case "aufgabe":
            const a = prompt("Name der Aufgabe?", "Aufgabe x");
            uebung_data.tasks.push({task: a, txt: "", subtasks: []});
            console.log("bla1", json);
            updateSelects('select_uebung');
            break;
    }
}

function updateUebungsDisplay() {
    const value = uebung_data ? uebung_data.heading : "";
    document.getElementById('edit_heading').value = value;
}

function updateAufgabenDisplay() {
    const value = aufgaben_data ? aufgaben_data.txt : "";
    document.getElementById('edit_txt').value = value;
}

function updateUnteraufgabenDisplay() {
    const dom_ids = ['edit_q', 'edit_q_extra', 'edit_a', 'edit_src', 'edit_path', 'edit_route'];
    const json_ids = ['q', 'q_extra', 'a', 'src', 'path', 'route'];

    dom_ids.forEach((id, i) => {
        const txt = document.getElementById(id);
        if (unteraufgaben_data && unteraufgaben_data[json_ids[i]]) {
            txt.value = unteraufgaben_data[json_ids[i]];
        } else {
            txt.value = "";
        }
    })
}

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
            removeAllOptions(select_unteraufgabe);
            if (current_aufgabe) {
                aufgaben_data = uebung_data['tasks'].find(a => a['task'] === current_aufgabe);

                // update select_unteraufgabe
                aufgaben_data['subtasks'].forEach((subtask, i) => {
                    addOptionToSelect(i, 'select_unteraufgabe');
                });
            } else {
                aufgaben_data = undefined;
            }

            // update uebung_heading
            updateAufgabenDisplay();

        case 'select_unteraufgabe':
            // get selection
            current_unteraufgabe = getCurrentSelection(select_unteraufgabe);

            if (current_unteraufgabe) {
                unteraufgaben_data = aufgaben_data['subtasks'][current_unteraufgabe]
            } else {
                unteraufgaben_data = undefined;
            }

            // update aufgabe_txt
            updateUnteraufgabenDisplay();
    }
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
