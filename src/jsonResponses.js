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
        responseCode = 304;
    } else {
        characters[body.name] = {};
    }

    characters[body.name].name = body.name;
    characters[body.name].race = body.race === undefined ? '' : body.race;
    characters[body.name].class = body.class === undefined ? '' : body.class;
    characters[body.name].str = body.str === undefined ? '' : body.str;
    characters[body.name].dex = body.dex === undefined ? '' : body.dex;
    characters[body.name].con = body.con === undefined ? '' : body.con;
    characters[body.name].int = body.int === undefined ? '' : body.int;
    characters[body.name].wis = body.wis === undefined ? '' : body.wis;
    characters[body.name].cha = body.cha === undefined ? '' : body.cha;

    characters[body.name].acrobatics = body.acrobatics === undefined ? false : body.acrobatics;
    const ah = body.animalHandling;
    characters[body.name].animalHandling = ah === undefined ? false : ah;
    characters[body.name].arcana = body.arcana === undefined ? false : body.arcana;
    characters[body.name].athletics = body.athletics === undefined ? false : body.athletics;
    characters[body.name].deception = body.deception === undefined ? false : body.deception;
    characters[body.name].history = body.history === undefined ? false : body.history;
    characters[body.name].insight = body.insight === undefined ? false : body.insight;
    characters[body.name].intimidation = body.intimidation === undefined ? false : body.intimidation;
    characters[body.name].nature = body.nature === undefined ? false : body.nature;
    characters[body.name].performance = body.performance === undefined ? false : body.performance;
    characters[body.name].persuasion = body.persuasion === undefined ? false : body.persuasion;
    characters[body.name].religion = body.religion === undefined ? false : body.religion;
    characters[body.name].stealth = body.stealth === undefined ? false : body.stealth;
    characters[body.name].survival = body.survival === undefined ? false : body.survival;
    characters[body.name].alignment = body.alignment === undefined ? '' : body.alignment;
    characters[body.name].background = body.background === undefined ? '' : body.background;
    characters[body.name].playerName = body.playerName === undefined ? '' : body.playerName;
    // characters[body.name].age = body.age;

    if (responseCode === 201) {
        responseJSON.message = 'Created successfully';
        return respondJSON(request, response, responseCode, responseJSON);
    }

    return respondJSONMeta(request, response, responseCode);
};

const showCharacter = (request, response, params) => {
    const responseJSON = {
        id: 'showCharacter',
        name: characters[params.name].name,
        race: characters[params.name].race,
        class: characters[params.name].class,
        str: characters[params.name].str,
        dex: characters[params.name].dex,
        con: characters[params.name].con,
        int: characters[params.name].int,
        wis: characters[params.name].wis,
        cha: characters[params.name].cha,
        acrobatics: characters[params.name].acrobatics,
        animalHandling: characters[params.name].animalHandling,
        arcana: characters[params.name].arcana,
        athletics: characters[params.name].athletics,
        deception: characters[params.name].deception,
        history: characters[params.name].history,
        insight: characters[params.name].insight,
        intimidation: characters[params.name].intimidation,
        nature: characters[params.name].nature,
        performance: characters[params.name].performance,
        persuasion: characters[params.name].persuasion,
        religion: characters[params.name].religion,
        stealth: characters[params.name].stealth,
        survival: characters[params.name].survival,
        alignment: characters[params.name].alignment,
        background: characters[params.name].background,
        playerName: characters[params.name].playerName,
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
    characters[body.name].race = body.race === undefined ? '' : body.race;
    characters[body.name].class = body.class === undefined ? '' : body.class;
    characters[body.name].str = body.str === undefined ? '' : body.str;
    characters[body.name].dex = body.dex === undefined ? '' : body.dex;
    characters[body.name].con = body.con === undefined ? '' : body.con;
    characters[body.name].int = body.int === undefined ? '' : body.int;
    characters[body.name].wis = body.wis === undefined ? '' : body.wis;
    characters[body.name].cha = body.cha === undefined ? '' : body.cha;
    characters[body.name].acrobatics = body.acrobatics === undefined ? false : body.acrobatics;
    const ah = body.animalHandling;
    characters[body.name].animalHandling = ah === undefined ? false : ah;
    characters[body.name].arcana = body.arcana === undefined ? false : body.arcana;
    characters[body.name].athletics = body.athletics === undefined ? false : body.athletics;
    characters[body.name].deception = body.deception === undefined ? false : body.deception;
    characters[body.name].history = body.history === undefined ? false : body.history;
    characters[body.name].insight = body.insight === undefined ? false : body.insight;
    characters[body.name].intimidation = body.intimidation === undefined ? false : body.intimidation;
    characters[body.name].nature = body.nature === undefined ? false : body.nature;
    characters[body.name].performance = body.performance === undefined ? false : body.performance;
    characters[body.name].persuasion = body.persuasion === undefined ? false : body.persuasion;
    characters[body.name].religion = body.religion === undefined ? false : body.religion;
    characters[body.name].stealth = body.stealth === undefined ? false : body.stealth;
    characters[body.name].survival = body.survival === undefined ? false : body.survival;
    characters[body.name].alignment = body.alignment === undefined ? '' : body.alignment;
    characters[body.name].background = body.background === undefined ? '' : body.background;
    characters[body.name].playerName = body.playerName === undefined ? '' : body.playerName;

    return respondJSONMeta(request, response, 204);
};


const deleteCharacter = (request, response, params) => {

    const responseJSON = {
        id: 'deleteCharacter',
        name: params.name,
    }
    const responseCode = 200;
    if (params.name === undefined || characters[params.name] === undefined) {
        responseCode = 404;
    } else {
        delete characters[params.name];
    }

    return respondJSON(request, response, responseCode, responseJSON);
};

module.exports = {
    getCharacterList,
    getCharacterListMeta,
    addCharacter,
    notFound,
    notFoundMeta,
    showCharacter,
    saveCharacter,
    deleteCharacter,
};
