// add event handler to login button
document.getElementById("button_login").addEventListener("click", x => {
    sendData(document.getElementById("user").value, document.getElementById("pass").value);
});

function sendData(username, password) {
    // define request
    let xhr = new XMLHttpRequest();
    const url = "./login.php";
    const jsonData = JSON.stringify({user: username, pass: password});
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // define response
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // parse response to json
            let jsonResponse = JSON.parse(xhr.responseText);

            // display response to user
            switch(jsonResponse['status']) {
                case 'success':
                    console.log("response:", jsonResponse);
                    window.location.href = './main.html';
                    break;
                case 'error':
                    console.error("response", jsonResponse);
                    alert("Invalid Login")
                    break;
            }
        }
    };

    // send request
    xhr.send(jsonData);
}