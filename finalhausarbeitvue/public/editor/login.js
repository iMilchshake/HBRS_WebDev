// add event handler to login button
document.getElementById("button_login").addEventListener("click", x => {
    sendData(document.getElementById("user").value, document.getElementById("pass").value);
});

// auto-click login button when pressing the Enter-Key on the keyboard
document.getElementById("pass").addEventListener("keydown", x => {
    if(x.key === "Enter") {
        document.getElementById("button_login").click();
    }
});
document.getElementById("user").addEventListener("keydown", x => {
    if(x.key === "Enter") {
        document.getElementById("button_login").click();
    }
});

// define login function
function sendData(username, password) {
    // define request
    let http = new XMLHttpRequest();
    http.open("POST", "./login.php", true);
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
                    window.location.href = 'editor.html';
                    break;
                case 'error':
                    console.error("response", jsonResponse);
                    alert("Invalid Login")
                    break;
            }
        }
    };

    // send request
    http.send(JSON.stringify({user: username, pass: password}));
}