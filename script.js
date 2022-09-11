let currentPokemon;
let currentPokemonName;
let responseAsJson;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=150';
    let response = await fetch(url);
    responseAsJson = await response.json();
    let arrayLength = responseAsJson['results'].length;
    currentPokemonName = responseAsJson['results'][0]['name'];

    let urlWithName = `https://pokeapi.co/api/v2/pokemon/${currentPokemonName}`;
    let responseWithName = await fetch(urlWithName);
    currentPokemon = await responseWithName.json();





    console.log(responseAsJson);
    console.log(currentPokemon);


    for (let i = 0; i < arrayLength; i++) {

        let actualName = responseAsJson['results'][i]['name'];

        let urlForLoop = `https://pokeapi.co/api/v2/pokemon/${actualName}`;
        let responseForLoop = await fetch(urlForLoop);
        pokemonForLoop = await responseForLoop.json();

        console.log(pokemonForLoop);

        let actualId = pokemonForLoop['id'];

        let actualImg = pokemonForLoop['sprites']['other']['official-artwork']['front_default'];

        let actualType = pokemonForLoop['types'][0]['type']['name'];

        let actualSort;


        if (pokemonForLoop['types'][1]) {
            actualSort = pokemonForLoop['types'][1]['type']['name'];

            document.getElementById('all-pokemons').innerHTML += showOverviewPokemonWithSort(actualId, actualName, actualType, actualSort, actualImg);
        }

        else {
            document.getElementById('all-pokemons').innerHTML += showOverviewPokemonWithoutSort(actualId, actualName, actualType, actualImg);
        }

        showActualBgColor(actualId);
    }

}


function showActualBgColor(actualId) {
    let bgType = document.getElementById(`pokemon-type-${actualId}`).innerHTML;
    document.getElementById(`pokemon-overview-container-${actualId}`).classList.add(`bg-container-${bgType}`);
}


function showOverviewPokemonWithoutSort(actualId, actualName, actualType, actualImg) {
    return /*html*/ `
    <div class="pokemon-overview-container" id="pokemon-overview-container-${actualId}">
        <div class="pokemon-info-container">
            <p id="pokemon-id-${actualId}"># ${actualId}</p>
            <span id="pokemon-name">${actualName.charAt(0).toUpperCase() + actualName.slice(1)}</span>
            <span class="pokemon-type" id="pokemon-type-${actualId}">${actualType}</span>
        </div>
        <div class="pokemon-img-container">
            <img id="pokemon-img" src="${actualImg}">
        </div>
    </div>`;
}


function showOverviewPokemonWithSort(actualId, actualName, actualType, actualSort, actualImg) {
    return /*html*/ `
    <div class="pokemon-overview-container" id="pokemon-overview-container-${actualId}">
        <div class="pokemon-info-container">
            <p id="pokemon-id-${actualId}"># ${actualId}</p>
            <span id="pokemon-name">${actualName.charAt(0).toUpperCase() + actualName.slice(1)}</span>
            <span class="pokemon-type" id="pokemon-type-${actualId}">${actualType}</span>
            <span class="pokemon-type">${actualSort}</span>
        </div>
        <div class="pokemon-img-container">
            <img id="pokemon-img" src="${actualImg}">
        </div>
    </div>`;
}