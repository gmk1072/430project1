
const parseJSON = (xhr) => {
    const obj = JSON.parse(xhr.response);
    console.dir(obj);

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
            const button = document.createElement("button");
            button.className = "btn-outline-secondary btn btn-sm";
            button.href = characters[key].name;
            button.innerHTML = characters[key].name;
            li.appendChild(button);
            charachterList.appendChild(li);
        }
    }
};

const handleResponse = (xhr, parseResponse) => {
    const statusCode = document.querySelector("#statusCode");
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
const requestUpdate = (e, characterForm) =>{
    const url = characterForm.querySelector('#urlField').value;
    const method = characterForm.querySelector('#methodSelect').value;

    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.setRequestHeader('Accept', 'application/json');

    if(method == 'get') {
        xhr.onload = () => handleResponse(xhr, true);
    } else {
        xhr.onload = () => handleResponse(xhr,false);
    }

    xhr.send();

    e.preventDefault();
    return false;
};

const sendPost = (e, nameForm) => {
    const nameAction = nameForm.getAttribute('action');
    const nameMethod = nameForm.getAttribute('method');
    const nameField = nameForm.querySelector('#nameField');

    const xhr = new XMLHttpRequest();

    xhr.open(nameMethod, nameAction);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = () => handleResponse(xhr,true);

    const formData = `name=${nameField.value}`;
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

};

window.onload = init;
