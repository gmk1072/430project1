const characters = {};

const respondJSON = (request, response, status, object) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
};

const respondJSONMeta = (request, response, status) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    response.writeHead(status, headers);
    response.end();
};

const getCharacterList = (request, response) => {
    const responseJSON = {
        characters,
    };

    return respondJSON(request, response, 200, responseJSON);
};

const getCharacterListMeta = (request, response) => respondJSONMeta(request, response, 200);


const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    };

    respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
    respondJSONMeta(request, response, 404);
};

const addCharacter = (request, response, body) => {
    const responseJSON = {
        message: 'Player Name is Required',
    };

    if (!body.name) {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
    }
    let responseCode = 201;
    if (characters[body.name]) {
        responseCode = 204;
    } else {
        characters[body.name] = {};
    }

    characters[body.name].name = body.name;
    characters[body.name].race = body.race==undefined?"":body.race;
    characters[body.name].str = body.str==undefined?"":body.str;
    characters[body.name].dex = body.dex==undefined?"":body.dex;
    characters[body.name].con = body.con==undefined?"":body.con;
    characters[body.name].int = body.int==undefined?"":body.int;
    characters[body.name].wis = body.wis==undefined?"":body.wis;
    characters[body.name].cha = body.cha==undefined?"":body.cha;
    // characters[body.name].age = body.age;

    if (responseCode === 201) {
        responseJSON.message = 'Created successfully';
        return respondJSON(request, response, responseCode, responseJSON);
    }

    return respondJSONMeta(request, response, responseCode);
};

const showCharacter = (request, response, params) => {
    const responseJSON = {
        id: "showCharacter",
        name: characters[params.name].name,
        race: characters[params.name].race,
        str: characters[params.name].str,
        dex: characters[params.name].dex,
        con: characters[params.name].con,
        int: characters[params.name].int,
        wis: characters[params.name].wis,
        cha: characters[params.name].cha,
    };
    return respondJSON(request, response, 200, responseJSON);
};
const saveCharacter = (request, response, body) => {
    const responseJSON = {
        message: 'Player Name is Required',
    };

    if (!body.name) {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
    }

    characters[body.name].name = body.name;
    characters[body.name].race = body.race==undefined?"":body.race;
    characters[body.name].str = body.str==undefined?"":body.str;
    characters[body.name].dex = body.dex==undefined?"":body.dex;
    characters[body.name].con = body.con==undefined?"":body.con;
    characters[body.name].int = body.int==undefined?"":body.int;
    characters[body.name].wis = body.wis==undefined?"":body.wis;
    characters[body.name].cha = body.cha==undefined?"":body.cha;

    return respondJSONMeta(request, response, 204);
};
module.exports = {
    getCharacterList,
    getCharacterListMeta,
    addCharacter,
    notFound,
    notFoundMeta,
    showCharacter,
    saveCharacter,
};
