let data;
let html_main;
let topic;

async function setup() {
    // fetch
    data = await fetchData();
    html_main = document.getElementsByClassName("main")[0];

    // create header buttons
    createHeaderButtons(Object.keys(data));

    // select default topic and subtopic
    topic = Object.keys(data)[0];
    const subtopic = Object.keys(data[topic])[0];
    changeTopic(topic);
    createSubTopic(data[topic][subtopic]["content"], subtopic)

}

// fetch and parse to json (non blocking)
function fetchData() {
    return fetch("u3.json")
        .then(x => x.json())
        .catch(error => console.error(error));
}

function changeTopic(t) {
    topic = t;
    console.log("changed topic to ", topic);
    createSideButtons(Object.keys(data[topic]));
}

function createSubTopic(content, topic) {
    let div = document.createElement('div');

    let head = document.createElement('h2');
    let head_text = document.createTextNode(topic);
    head.appendChild(head_text);

    let paragraph = document.createElement('p');
    let paragraph_text = document.createTextNode(content);
    paragraph.appendChild(paragraph_text);

    div.appendChild(head);
    div.appendChild(paragraph);

    html_main.innerHTML = "";
    html_main.appendChild(div);
}

function createHeaderButtons(topics) {
    const header_buttons = document.getElementsByClassName("header_buttons")[0];

    topics.forEach(t => {
        let button = document.createElement("button");
        button.type = "button";
        button.className = "button";

        let textNode = document.createTextNode(t);
        button.appendChild(textNode);
        button.addEventListener("click", x => changeTopic(t))

        header_buttons.appendChild(button);
    })
}

function createSideButtons(subtopics) {
    const left = document.getElementsByClassName("left")[0];

    left.innerHTML = "";

    subtopics.forEach(t => {
        let button = document.createElement("button");
        button.type = "button";
        button.className = "button";

        let textNode = document.createTextNode(t);
        button.appendChild(textNode);

        const cont = data[topic][t]["content"];
        console.log(cont);

        button.addEventListener("click", x => createSubTopic(cont, t))

        left.appendChild(button);
    })
}



setup();