"use strict";

var parseJSON = function parseJSON(xhr, e) {
    console.log(xhr.response);
    var obj = JSON.parse(xhr.response);
    //console.dir(obj);

    /*if(obj.message) {
        const p = document.createElement('p');
        p.textContent = `Message: ${obj.message}`;
        content.appendChild(p);
    }*/

    if (obj.characters) {
        var charachterList = document.querySelector("#characterList");
        var characters = obj.characters;
        charachterList.innerHTML = "";

        var _loop = function _loop() {
            var li = document.createElement("li");
            li.className = "nav-item";
            var form1 = document.createElement("form");
            form1.action = "/showCharacter?name=" + characters[key].name;
            console.log(form1.action);
            form1.method = "get";
            var showCharacter = function showCharacter(e) {
                return requestUpdate(e, form1);
            };
            form1.addEventListener("submit", showCharacter);
            var button = document.createElement("button");
            button.className = "btn-outline-secondary btn btn-sm margin3px";
            button.type = "submit";
            button.innerHTML = characters[key].name;
            form1.appendChild(button);
            li.appendChild(form1);
            charachterList.appendChild(li);
        };

        for (var key in characters) {
            _loop();
        }
    }
    if (obj.id) {
        switch (obj.id) {
            case "showCharacter":
                {
                    document.querySelector("#name").value = obj.name;
                    document.querySelector("#race").value = obj.race == undefined ? "" : obj.race;
                    document.querySelector("#str").value = obj.str == undefined ? "" : obj.str;
                    document.querySelector("#dex").value = obj.dex == undefined ? "" : obj.dex;
                    document.querySelector("#con").value = obj.con == undefined ? "" : obj.con;
                    document.querySelector("#int").value = obj.int == undefined ? "" : obj.int;
                    document.querySelector("#wis").value = obj.wis == undefined ? "" : obj.wis;
                    document.querySelector("#cha").value = obj.cha == undefined ? "" : obj.cha;
                    break;
                }
        }
    }
};

var handleResponse = function handleResponse(xhr, parseResponse, e) {
    var statusCode = document.querySelector("#statusCode");
    statusCode.innerHTML = xhr.status;
    switch (xhr.status) {
        case 200:
            break;
        case 201:
            break;
        case 204:
            var modal = document.querySelector("#saveModal");
            $('#saveModal').modal("show");
            return;
        case 400:
            break;
        case 404:
            break;
        default:
            content.innerHTML = "Error code not implemented by client";
    }
    if (parseResponse) {
        parseJSON(xhr, e);
    }
};
var requestUpdate = function requestUpdate(e, characterForm) {
    var url = characterForm.getAttribute('action');
    var method = characterForm.getAttribute('method');
    console.log(url);
    var xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.setRequestHeader('Accept', 'application/json');

    if (method == 'get') {
        xhr.onload = function () {
            return handleResponse(xhr, true, e);
        };
    } else {
        xhr.onload = function () {
            return handleResponse(xhr, false, e);
        };
    }

    xhr.send();

    e.preventDefault();
    return false;
};

var sendPost = function sendPost(e, nameForm) {
    var nameAction = nameForm.getAttribute('action');
    var nameMethod = nameForm.getAttribute('method');
    var fields = nameForm.getElementsByTagName("input");

    var xhr = new XMLHttpRequest();

    xhr.open(nameMethod, nameAction);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = function () {
        return handleResponse(xhr, true);
    };
    var formData = "";
    for (var i = 0; i < fields.length; i++) {
        if (formData != "") formData = formData + "&";
        formData = "" + formData + fields[i].name + "=" + fields[i].value;
    }
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

    var saveForm = document.querySelector("#saveCharacter");
    var saveCharacter = function saveCharacter(e) {
        return sendPost(e, saveForm);
    };
    saveForm.addEventListener('submit', saveCharacter);
};

window.onload = init;
