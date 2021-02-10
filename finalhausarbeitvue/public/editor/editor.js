// get DOM id's
const dom_ids = ['edit_q', 'edit_q_extra', 'edit_a', 'edit_src', 'edit_path', 'edit_route'];
const json_ids = ['q', 'q_extra', 'a', 'src', 'path', 'route'];
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
initializeEditor();

// fetch json data from server and display editor
async function initializeEditor() {
    json = await fetch('../exercises.json').then(x => x.json());
    console.log("editor: fetched data", json);
    createAufgabenOptions();

    // add event handlers for UI
    select_uebung.addEventListener("change", () => updateSelects('select_uebung'));
    select_aufgabe.addEventListener("change", () => updateSelects('select_aufgabe'));
    select_unteraufgabe.addEventListener("change", () => updateSelects('select_unteraufgabe'));
    document.getElementById('button_adduebung').addEventListener("click", () => addNewEntity("uebung"));
    document.getElementById('button_addaufgabe').addEventListener("click", () => addNewEntity("aufgabe"));
    document.getElementById('button_addunteraufgabe').addEventListener("click", () => addNewEntity("unteraufgabe"));
    document.getElementById('button_debug').addEventListener("click", () => debug());
    document.getElementById('button_export').addEventListener("click", () => sendData());
    document.getElementById('button_return').addEventListener("click", () => {
        window.location.href = "../#/site/navigator/";
    })
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

    for(const uebung of json) {
        addOptionToSelect(uebung['exercise'], "select_uebung");
    }

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
    let t = "";
    switch (type) {
        case "uebung":
            t = prompt("Name der Übung?", "Übung X");

            if (t !== "") {
                json.push({exercise: t, heading: "", tasks: []})
                createAufgabenOptions();
                select_uebung.selectedIndex = select_uebung.childElementCount - 1;
                updateSelects('select_uebung');
                console.log(uebung_data, aufgaben_data, unteraufgaben_data)
            }
            break;
        case "aufgabe":
            t = prompt("Name der Aufgabe?", "Aufgabe x");
            if (t !== "") {
                // create new aufgabe
                uebung_data.tasks.push({task: t, txt: "", subtasks: []});
                updateSelects('select_uebung');

                // switch to new aufgabe
                select_aufgabe.selectedIndex = select_aufgabe.childElementCount - 1;
                updateSelects('select_aufgabe');
            }
            break;
        case "unteraufgabe":
            if (confirm("Soll eine neue Unteraufgabe hinzugefügt werden?")) {
                // create new unteraufgabe
                aufgaben_data.subtasks.push({});
                updateSelects('select_aufgabe');

                // switch to new unteraufgabe
                select_unteraufgabe.selectedIndex = select_unteraufgabe.childElementCount - 1;
                updateSelects('select_unteraufgabe');
            }
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
    dom_ids.forEach((id, i) => {
        const txt = document.getElementById(id);
        if (unteraufgaben_data && unteraufgaben_data[json_ids[i]]) {
            txt.value = unteraufgaben_data[json_ids[i]];
        } else {
            txt.value = "";
        }
    })
}

function save() {
    // save exercise information
    if (uebung_data) {
        uebung_data['heading'] = document.getElementById('edit_heading').value;
    }

    // save task information
    if (aufgaben_data) {
        aufgaben_data['txt'] = document.getElementById('edit_txt').value;
    }

    // save subtask information
    if (unteraufgaben_data) {
        dom_ids.forEach((id, i) => {
            const txt = document.getElementById(id).value;
            if (txt !== "") {
                unteraufgaben_data[json_ids[i]] = txt;
            }
        })
    }
}

function updateSelects(select_id) {
    // save current data before UI changes
    save();

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

function sendData() {
    // save data before sending
    save();

    // define POST request
    let http = new XMLHttpRequest();
    http.open("POST", "./editor.php", true);
    http.setRequestHeader("Content-Type", "application/json");

    // define response
    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            // parse response to json
            let jsonResponse = JSON.parse(http.responseText);

            // display response to user
            switch(jsonResponse['status']) {
                case 'success':
                    console.log("response:", jsonResponse);
                    break;
                case 'error':
                    console.error("response", jsonResponse);
                    alert("There has been an error while sending the data. Check the console.")
                    break;
            }
        }
    };

    // send request
    http.send(JSON.stringify(json));
}
