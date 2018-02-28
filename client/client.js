//will parse the jsonif it is supposed to(determined in handle response function)
const parseJSON = (xhr,e) => {
    if(xhr.response){
        const obj = JSON.parse(xhr.response);

        /*if(obj.message) {
        const p = document.createElement('p');
        p.textContent = `Message: ${obj.message}`;
        content.appendChild(p);
        }*/

        //adds the character buttons so you can click them and do a get request with the
        //character name as part of the query to show that characters data
        if(obj.characters) {
            const charachterList = document.querySelector("#characterList");
            const characters = obj.characters;
            charachterList.innerHTML = "";
            for (var key in characters) {
                const li = document.createElement("li");
                li.className = "nav-item";
                const form1 = document.createElement("form");
                form1.action = `/showCharacter?name=${characters[key].name}`;
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
        //goes through the id on the json object
        if(obj.id) {
            switch(obj.id) {
                case "showCharacter": {
                    //in the case of the showcharacter id it will fill all of the
                    //fields with the information for that character
                    document.querySelector("#deleteCharacter").action = `/deleteCharacter?name=${obj.name}`;
                    document.querySelector("#name").value = obj.name;
                    document.querySelector("#race").value = obj.race===undefined?'':obj.race;
                    document.querySelector("#class").value = obj.class===undefined?'':obj.class;
                    document.querySelector("#str").value = obj.str===undefined?'':obj.str;
                    document.querySelector("#dex").value = obj.dex===undefined?'':obj.dex;
                    document.querySelector("#con").value = obj.con===undefined?'':obj.con;
                    document.querySelector("#int").value = obj.int===undefined?'':obj.int;
                    document.querySelector("#wis").value = obj.wis===undefined?'':obj.wis;
                    document.querySelector("#cha").value = obj.cha===undefined?'':obj.cha;

                    document.getElementById("acrobatics").checked = obj.acrobatics==='true'?true:false;
                    document.getElementById("animalHandling").checked = obj.animalHandling==='true'?true:false;
                    document.getElementById("arcana").checked = obj.arcana==='true'?true:false;
                    document.getElementById("athletics").checked = obj.athletics==='true'?true:false;
                    document.getElementById("deception").checked = obj.deception==='true'?true:false;
                    document.getElementById("history").checked = obj.history==='true'?true:false;
                    document.getElementById("insight").checked = obj.insight==='true'?true:false;
                    document.getElementById("intimidation").checked = obj.intimidation==='true'?true:false;
                    document.getElementById("nature").checked = obj.nature==='true'?true:false;
                    document.getElementById("performance").checked = obj.performance==='true'?true:false;
                    document.getElementById("persuasion").checked = obj.persuasion==='true'?true:false;
                    document.getElementById("religion").checked = obj.religion==='true'?true:false;
                    document.getElementById("stealth").checked = obj.stealth==='true'?true:false;
                    document.getElementById("survival").checked = obj.survival==='true'?true:false;
                    document.getElementById("sleightOfHand").checked = obj.sleightOfHand==='true'?true:false;
                    document.getElementById("medicine").checked = obj.medicine==='true'?true:false;
                    document.getElementById("perception").checked = obj.perception==='true'?true:false;
                    document.getElementById("investigation").checked = obj.investigation==='true'?true:false;


                    document.querySelector("#alignment").value = obj.alignment==undefined?'':obj.alignment;
                    document.querySelector("#background").value = obj.background==undefined?'':obj.background;
                    document.querySelector("#playerName").value = obj.playerName===undefined?'':obj.playerName;
                    document.querySelector("#armor").value = obj.armor===undefined?'':obj.armor;
                    document.querySelector("#health").value = obj.health===undefined?'':obj.health;
                    const equiplist = document.querySelector("#equipment");
                    while (equiplist.firstChild) {
                        equiplist.removeChild(equiplist.firstChild);
                    }
                    if(Array.isArray(obj.equipment)) {
                        for(var i = 0; i<obj.equipment.length;i++) {
                            addEquipmentName(obj.equipment[i]);
                        }
                    } else if(obj.equipment!='') {
                        addEquipmentName(obj.equipment);
                    }

                    break;
                }
                case "deleteCharacter": {
                    //will show the delete character modal if it was attempted, will refresh the character
                    //list after and clear the fields of that old characters information
                    const modal = document.querySelector("#deleteModal");
                    $('#deleteModal').modal("hide");
                    const refreshList = document.querySelector("#refreshCharacterListForm");
                    var event = new Event('submit', {});
                    refreshList.dispatchEvent(event);
                    resetFields();
                    break;
                }
            }
        }
    }
};

//this just clears all the fields back to their original setting
const resetFields = () => {
    document.querySelector("#name").value = '';
    document.querySelector("#race").value = '';
    document.querySelector("#class").value = '';
    document.querySelector("#str").value = '';
    document.querySelector("#dex").value = '';
    document.querySelector("#con").value = '';
    document.querySelector("#int").value = '';
    document.querySelector("#wis").value = '';
    document.querySelector("#cha").value = '';

    document.getElementById("acrobatics").checked = false;
    document.getElementById("animalHandling").checked = false;
    document.getElementById("arcana").checked = false;
    document.getElementById("athletics").checked = false;
    document.getElementById("deception").checked = false;
    document.getElementById("history").checked = false;
    document.getElementById("insight").checked = false;
    document.getElementById("intimidation").checked = false;
    document.getElementById("nature").checked = false;
    document.getElementById("performance").checked = false;
    document.getElementById("persuasion").checked = false;
    document.getElementById("religion").checked = false;
    document.getElementById("stealth").checked = false;
    document.getElementById("survival").checked = false;
    document.getElementById("sleightOfHand").checked = false;
    document.getElementById("medicine").checked = false;
    document.getElementById("perception").checked = false;
    document.getElementById("investigation").checked = false;


    document.querySelector("#alignment").value = '';
    document.querySelector("#background").value = '';
    document.querySelector("#playerName").value = '';
    document.querySelector("#armor").value = '';
    document.querySelector("#health").value = '';
    const equiplist = document.querySelector("#equipment");
    while (equiplist.firstChild) {
        equiplist.removeChild(equiplist.firstChild);
    }
    document.querySelector("#addEquipment").value = '';
};

//will show a modal with the message from the response
const handleResponse = (xhr, parseResponse, e) => {
    var statusCode = document.querySelector("#statusCode");
    statusCode.innerHTML = xhr.status;//sets the status code indicator on the top right of the screen
    switch(xhr.status) {
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
            document.querySelector('#statusContent').innerHTML = "No Modifications";
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
        case 500:
            var modal = document.querySelector("#statusModal");
            document.querySelector('#statusContent').innerHTML = "Internal Server Error! Uh oh";
            $('#statusModal').modal("show");
            break;
        default:
            var modal = document.querySelector("#statusModal");
            document.querySelector('#statusContent').innerHTML = "No modifications";
            $('#statusModal').modal("show");
            break;
    }
    if (parseResponse) {
        parseJSON(xhr, e);
    }
};
//sends the get requests back to the api
const requestUpdate = (e, characterForm) =>{
    const url = characterForm.getAttribute('action');
    const method = characterForm.getAttribute('method');
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

//sends the post requests back to the api
const sendPost = (e, nameForm) => {
    const nameAction = nameForm.getAttribute('action');
    const nameMethod = nameForm.getAttribute('method');
    const fields = nameForm.getElementsByTagName('input');

    const xhr = new XMLHttpRequest();

    xhr.open(nameMethod, nameAction);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = () => handleResponse(xhr,true);
    let formData = ``;
    for (var i = 0; i < fields.length ; i++) {
        if(formData != ``)
            formData = `${formData}&`;
        if(fields[i].type==='text'){
            formData = `${formData}${fields[i].name}=${fields[i].value}`;
        } else if(fields[i].type==='checkbox') {
            formData = `${formData}${fields[i].name}=${fields[i].checked}`;
        }
    }
    xhr.send(formData);

    const refreshList = document.querySelector("#refreshCharacterListForm");
    var event = new Event('submit', {});
    refreshList.dispatchEvent(event);

    e.preventDefault();
    return false;
};

//sends deletes back to the api
const sendDelete = (e, deleteForm) => {
    const deleteAction = deleteForm.getAttribute('action');
    const deleteMethod = deleteForm.getAttribute('method');
    const xhr = new XMLHttpRequest();

    xhr.open('DELETE', deleteAction, true);
    xhr.onload = () => handleResponse(xhr,true);

    xhr.send(null);

    e.preventDefault();
    return false;
}

//this is for making the equipment list
//it will add an input and button to a div, which then appends to
//the list element, which goes into the list
function addEquipmentName(name) {
    const equiplist = document.querySelector("#equipment");
    let listel = document.createElement("li");
    listel.className = "list-group-item flex";
    //listel.textContent = document.querySelector("#addEquipment").value;
    let input = document.createElement("input");
    input.type = "text";
    input.name = "equipment";
    input.value= name;
    input.textContent=name;
    //listel.appendChild(input);
    let button = document.createElement("button");
    button.className = "btn btn-xs btn-danger";
    button.innerHTML = "<i class='material-icons'>clear</i>";
    button.onclick = () => {
        equiplist.removeChild(listel);
    }
    let div = document.createElement("div");
    div.className = "input-group-prepend col";
    div.appendChild(input);
    div.appendChild(button);

    listel.appendChild(div);
    equiplist.appendChild(listel);
}
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

    const deleteForm = document.querySelector("#deleteCharacter");
    const deleteCharacter = (e) => sendDelete(e, deleteForm);
    deleteForm.addEventListener('submit', deleteCharacter);

    const equipButton = document.querySelector("#addEquipmentButton");
    const addEquip =()=> {
        addEquipmentName(document.querySelector("#addEquipment").value);
        /*const equiplist = document.querySelector("#equipment");
        let listel = document.createElement("li");
        listel.className = "list-group-item flex";
        //listel.textContent = document.querySelector("#addEquipment").value;
        let input = document.createElement("input");
        input.type = "text";
        input.name = "equipment";
        input.value= document.querySelector("#addEquipment").value;
        input.textContent=document.querySelector("#addEquipment").value;
        listel.appendChild(input);
        let button = document.createElement("button");
        button.className = "btn btn-xs btn-danger";
        button.innerHTML = "<i class='material-icons'>clear</i>";
        button.onclick = () => {
            equiplist.removeChild(listel);
        }
        listel.appendChild(button);
        equiplist.appendChild(listel);*/
        document.querySelector("#addEquipment").value = '';
    };
    equipButton.addEventListener('click', addEquip);

    const dropdownInputs = document.querySelectorAll(".dropdownInput");
    for(var dropdown of dropdownInputs) {
        dropdown.onclick = (e) => {
            const dropdowninputtarget = document.querySelector(e.target.getAttribute("target"));
            dropdowninputtarget.value = e.target.value;
        };
    }
};

window.onload = init;
