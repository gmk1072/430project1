"use strict";

var parseJSON = function parseJSON(xhr, e) {
    if (xhr.response) {
        var obj = JSON.parse(xhr.response);

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
                        document.querySelector("#deleteCharacter").action = '/deleteCharacter?name=';
                        document.querySelector("#deleteCharacter").action = "" + document.querySelector("#deleteCharacter").action + obj.name;
                        document.querySelector("#name").value = obj.name;
                        document.querySelector("#race").value = obj.race === undefined ? '' : obj.race;
                        document.querySelector("#class").value = obj.class === undefined ? '' : obj.class;
                        document.querySelector("#str").value = obj.str === undefined ? '' : obj.str;
                        document.querySelector("#dex").value = obj.dex === undefined ? '' : obj.dex;
                        document.querySelector("#con").value = obj.con === undefined ? '' : obj.con;
                        document.querySelector("#int").value = obj.int === undefined ? '' : obj.int;
                        document.querySelector("#wis").value = obj.wis === undefined ? '' : obj.wis;
                        document.querySelector("#cha").value = obj.cha === undefined ? '' : obj.cha;

                        document.getElementById("acrobatics").checked = obj.acrobatics === 'true' ? true : false;
                        document.getElementById("animalHandling").checked = obj.animalHandling === 'true' ? true : false;
                        document.getElementById("arcana").checked = obj.arcana === 'true' ? true : false;
                        document.getElementById("athletics").checked = obj.athletics === 'true' ? true : false;
                        document.getElementById("deception").checked = obj.deception === 'true' ? true : false;
                        document.getElementById("history").checked = obj.history === 'true' ? true : false;
                        document.getElementById("insight").checked = obj.insight === 'true' ? true : false;
                        document.getElementById("intimidation").checked = obj.intimidation === 'true' ? true : false;
                        document.getElementById("nature").checked = obj.nature === 'true' ? true : false;
                        document.getElementById("performance").checked = obj.performance === 'true' ? true : false;
                        document.getElementById("persuasion").checked = obj.persuasion === 'true' ? true : false;
                        document.getElementById("religion").checked = obj.religion === 'true' ? true : false;
                        document.getElementById("stealth").checked = obj.stealth === 'true' ? true : false;
                        document.getElementById("survival").checked = obj.survival === 'true' ? true : false;

                        document.querySelector("#alignment").value = obj.alignment == undefined ? '' : obj.alignment;
                        document.querySelector("#background").value = obj.background == undefined ? '' : obj.background;
                        break;
                    }
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
            break;
        case 304:
            var modal = document.querySelector("#statusModal");
            document.querySelector('#statusContent').innerHTML = "No modifications";
            $('#statusModal').modal("show");
            break;
        case 400:
            var modal = document.querySelector("#statusModal");
            document.querySelector('#statusContent').innerHTML = "Your request could not be processed";
            $('#statusModal').modal("show");
            break;
        case 404:
            var modal = document.querySelector("#statusModal");
            document.querySelector('#statusContent').innerHTML = "Page not found";
            $('#statusModal').modal("show");
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
    var fields = nameForm.getElementsByTagName('input');

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
        if (fields[i].type === 'text') {
            formData = "" + formData + fields[i].name + "=" + fields[i].value;
        } else if (fields[i].type === 'checkbox') {
            formData = "" + formData + fields[i].name + "=" + fields[i].checked;
        }
    }
    xhr.send(formData);

    e.preventDefault();
    return false;
};

var sendDelete = function sendDelete(e, deleteForm) {
    var deleteAction = deleteForm.getAttribute('action');
    var deleteMethod = deleteForm.getAttribute('method');
    console.log(deleteAction);
    var xhr = new XMLHttpRequest();

    xhr.open(deleteMethod, deleteAction);
    xhr.onload = function () {
        return handleResponse(xhr, false);
    };
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

    var deleteForm = document.querySelector("#deleteCharacter");
    var deleteCharacter = function deleteCharacter(e) {
        return sendDelete(e, deleteForm);
    };
    deleteForm.addEventListener('submit', deleteCharacter);

    var dropdownInputs = document.querySelectorAll(".dropdownInput");
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = dropdownInputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var dropdown = _step.value;

            dropdown.onclick = function (e) {
                var dropdowninputtarget = document.querySelector(e.target.getAttribute("target"));
                dropdowninputtarget.value = e.target.value;
            };
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};

window.onload = init;
