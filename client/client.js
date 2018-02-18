
const parseJSON = (xhr,e) => {
    console.log(xhr.response);
    const obj = JSON.parse(xhr.response);
    //console.dir(obj);

    /*if(obj.message) {
        const p = document.createElement('p');
        p.textContent = `Message: ${obj.message}`;
        content.appendChild(p);
    }*/

    if(obj.characters) {
        const charachterList = document.querySelector("#characterList");
        const characters = obj.characters;
        charachterList.innerHTML = "";
        for (var key in characters) {
            const li = document.createElement("li");
            li.className = "nav-item";
            const form1 = document.createElement("form");
            form1.action = `/showCharacter?name=${characters[key].name}`;
            console.log(form1.action);
            form1.method = "get";
            const showCharacter = (e) => requestUpdate(e, form1);
            form1.addEventListener("submit", showCharacter);
            const button = document.createElement("button");
            button.className = "btn-outline-secondary btn btn-sm margin3px";
            button.type = "submit";
            button.innerHTML = characters[key].name;
            form1.appendChild(button);
            li.appendChild(form1);
            charachterList.appendChild(li);
        }
    }
    if(obj.id) {
        switch(obj.id) {
            case "showCharacter": {
                document.querySelector("#name").value = obj.name;
                document.querySelector("#race").value = obj.race==undefined?"":obj.race;
                document.querySelector("#str").value = obj.str==undefined?"":obj.str;
                document.querySelector("#dex").value = obj.dex==undefined?"":obj.dex;
                document.querySelector("#con").value = obj.con==undefined?"":obj.con;
                document.querySelector("#int").value = obj.int==undefined?"":obj.int;
                document.querySelector("#wis").value = obj.wis==undefined?"":obj.wis;
                document.querySelector("#cha").value = obj.cha==undefined?"":obj.cha;
                break;
            }
        }
    }
};

const handleResponse = (xhr, parseResponse, e) => {
     var statusCode = document.querySelector("#statusCode");
    statusCode.innerHTML = xhr.status;
    switch(xhr.status) {
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
            content.innerHTML = `Error code not implemented by client`;
    }
    if (parseResponse) {
        parseJSON(xhr, e);
    }
};
const requestUpdate = (e, characterForm) =>{
    const url = characterForm.getAttribute('action');
    const method = characterForm.getAttribute('method');
    console.log(url);
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.setRequestHeader('Accept', 'application/json');

    if(method == 'get') {
        xhr.onload = () => handleResponse(xhr, true, e);
    } else {
        xhr.onload = () => handleResponse(xhr,false, e);
    }

    xhr.send();

    e.preventDefault();
    return false;
};

const sendPost = (e, nameForm) => {
    const nameAction = nameForm.getAttribute('action');
    const nameMethod = nameForm.getAttribute('method');
    const fields = nameForm.getElementsByTagName("input");

    const xhr = new XMLHttpRequest();

    xhr.open(nameMethod, nameAction);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = () => handleResponse(xhr,true);
    let formData = ``;
    for (var i = 0; i < fields.length ; i++) {
        if(formData != ``)
            formData = `${formData}&`;
        formData = `${formData}${fields[i].name}=${fields[i].value}`;
    }
    xhr.send(formData);

    e.preventDefault();
    return false;
};

const init = () => {

    const characterForm = document.querySelector("#refreshCharacterListForm");
    const getCharacterList = (e) => requestUpdate(e, characterForm);
    characterForm.addEventListener('submit', getCharacterList);

    const nameForm = document.querySelector("#nameForm");
    const addCharacter = (e) => sendPost(e,nameForm);
    nameForm.addEventListener('submit', addCharacter);

    const saveForm = document.querySelector("#saveCharacter");
    const saveCharacter = (e) => sendPost(e,saveForm);
    saveForm.addEventListener('submit', saveCharacter);
};

window.onload = init;
