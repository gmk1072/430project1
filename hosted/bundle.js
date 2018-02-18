"use strict";

var parseJSON = function parseJSON(xhr) {
    var obj = JSON.parse(xhr.response);
    console.dir(obj);

    /*if(obj.message) {
        const p = document.createElement('p');
        p.textContent = `Message: ${obj.message}`;
        content.appendChild(p);
    }*/

    if (obj.characters) {
        var charachterList = document.querySelector("#characterList");
        var characters = obj.characters;
        charachterList.innerHTML = "";
        for (var key in characters) {
            var li = document.createElement("li");
            li.className = "nav-item";
            var button = document.createElement("button");
            button.className = "btn-outline-secondary btn btn-sm margin3px";
            button.href = characters[key].name;
            button.innerHTML = characters[key].name;
            li.appendChild(button);
            charachterList.appendChild(li);
        }
    }
};

var handleResponse = function handleResponse(xhr, parseResponse) {
    var statusCode = document.querySelector("#statusCode");
    statusCode.innerHTML = xhr.status;
    /*const content = document.querySelector('#content');
    switch(xhr.status) {
        case 200:
            content.innerHTML = `<b>Success</b>`;
            break;
        case 201:
            content.innerHTML = `<b>Created</b>`;
            break;
        case 204:
            content.innerHTML = `<b>Updated (no content)</b>`;
            return;
        case 400:
            content.innerHTML = `<b>Bad Request</b>`;
            break;
        case 404:
            content.innerHTML = `<b>Resource Not Found</b>`;
            break;
        default:
            content.innerHTML = `Error code not implemented by client`;
    }*/
    if (parseResponse) {
        parseJSON(xhr);
    }
};
var requestUpdate = function requestUpdate(e, characterForm) {
    var url = characterForm.getAttribute('action');
    var method = characterForm.getAttribute('method');

    var xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.setRequestHeader('Accept', 'application/json');

    if (method == 'get') {
        xhr.onload = function () {
            return handleResponse(xhr, true);
        };
    } else {
        xhr.onload = function () {
            return handleResponse(xhr, false);
        };
    }

    xhr.send();

    e.preventDefault();
    return false;
};

var sendPost = function sendPost(e, nameForm) {
    var nameAction = nameForm.getAttribute('action');
    var nameMethod = nameForm.getAttribute('method');
    var nameField = nameForm.querySelector('#nameField');

    var xhr = new XMLHttpRequest();

    xhr.open(nameMethod, nameAction);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = function () {
        return handleResponse(xhr, true);
    };

    var formData = "name=" + nameField.value;
    xhr.send(formData);

    e.preventDefault();
    return false;
};

var init = function init() {

    var characterForm = document.querySelector("#refreshCharacterListForm");
    var getCharacterList = function getCharacterList(e) {
        return requestUpdate(e, characterForm);
    };
    characterForm.addEventListener('submit', getCharacterList);

    var nameForm = document.querySelector("#nameForm");
    var addCharacter = function addCharacter(e) {
        return sendPost(e, nameForm);
    };
    nameForm.addEventListener('submit', addCharacter);
};

window.onload = init;
