let currentPokemon;
let currentPokemonName;
let responseAsJson;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=100';
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

        let actualImg = pokemonForLoop['sprites']['other']['official-artwork']['front_default'];

        let actualType = pokemonForLoop['types'][0]['type']['name'];

        let actualSort;

        if (pokemonForLoop['types'][1]) {
            actualSort = pokemonForLoop['types'][1]['type']['name'];

            document.getElementById('all-pokemons').innerHTML += /*html*/ `
            <div class="pokemon-overview-container">
                <div class="pokemon-info-container">
                    <span id="pokemon-name">${actualName}</span>
                    <span class="green-btn-type" id="pokemon-type">${actualType}</span>
                    <span class="green-btn-type" id="pokemon-sort">${actualSort}</span>
                </div>
                <img id="pokemon-img" src="${actualImg}">
            </div>`;
        }

        else{
            document.getElementById('all-pokemons').innerHTML += /*html*/ `
            <div class="pokemon-overview-container">
                <div class="pokemon-info-container">
                    <span id="pokemon-name">${actualName}</span>
                    <span class="green-btn-type" id="pokemon-type">${actualType}</span>
                </div>
                <img id="pokemon-img" src="${actualImg}">
            </div>`;
        }

    }

    // renderPokemonInfo();
}


function renderPokemonInfo() {
    document.getElementById('pokemon-name').innerHTML = currentPokemonName.charAt(0).toUpperCase() + currentPokemonName.slice(1);
    document.getElementById('pokemon-img').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('pokemon-type').innerHTML = currentPokemon['types'][0]['type']['name'].charAt(0).toUpperCase() + currentPokemon['types'][0]['type']['name'].slice(1);
    document.getElementById('pokemon-sort').innerHTML = currentPokemon['types'][1]['type']['name'].charAt(0).toUpperCase() + currentPokemon['types'][1]['type']['name'].slice(1);
}