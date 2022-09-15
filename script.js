let pokemons = [];
let url = 'https://pokeapi.co/api/v2/pokemon/';
let actualShowedPokemons;
let next20Pokemons;

// 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=150';


async function loadPokemon() {
    document.getElementById('all-pokemons').innerHTML = '';
    for (let i = 0; i < 20; i++) {
        const pokedexUrl = url + (i + 1);
        let response = await fetch(pokedexUrl);
        let currentPokemon = await response.json();
        pokemons.push(currentPokemon);
        console.log(pokemons);
        generatePokemons(i);
        actualShowedPokemons = i;
    }
    next20Pokemons = actualShowedPokemons;
}


async function loadMorePokemons() {
    if (document.getElementById('search-pokemon').value !== '') {
        document.getElementById('search-pokemon').value = '';
        document.getElementById('all-pokemons').innerHTML = '';
        for (let i = 0; i < pokemons.length; i++) {
            generatePokemons(i);
            actualShowedPokemons = i;
        }
        next20Pokemons = actualShowedPokemons;
    }

    for (let i = (next20Pokemons + 1); i < (next20Pokemons + 21); i++) {
        pokedexUrl = url + (i + 1);
        let response = await fetch(pokedexUrl);
        let currentPokemon = await response.json();
        pokemons.push(currentPokemon);
        generatePokemons(i);
        actualShowedPokemons = i;
    }
    next20Pokemons = actualShowedPokemons;
}


function showSearchPokemons() {
    let search = document.getElementById('search-pokemon').value;
    search = search.toLowerCase();

    document.getElementById('all-pokemons').innerHTML = '';

    for (let i = 0; i < pokemons.length; i++) {

        let actualName = pokemons[i]['name'];
        if (actualName.includes(search)) {
            generatePokemons(i);
        }
    }
}

function generatePokemons(i) {
    document.getElementById('all-pokemons').innerHTML += showOverviewPokemonWithSort(i);
    document.getElementById(`pokemon-name-${i}`).innerHTML = pokemons[i]['name'].charAt(0).toUpperCase() + pokemons[i]['name'].slice(1);
    document.getElementById(`pokemon-type-${i}`).innerHTML = pokemons[i]['types'][0]['type']['name'];
    document.getElementById(`pokemon-img-${i}`).src = pokemons[i]['sprites']['other']['official-artwork']['front_default'];
    if (pokemons[i]['types'][1]) {
        let actualSort = pokemons[i]['types'][1]['type']['name'];
        document.getElementById(`pokemon-sort-${i}`).innerHTML = actualSort;
    }
    else {
        document.getElementById(`pokemon-sort-${i}`).classList.add('d-none');
    }

    showActualBgColor(i);
}


function showWithOrWithoutSort(i) {
    if (pokemons[i]['types'][1]) {
        let actualSort = pokemons[i]['types'][1]['type']['name'];
        document.getElementById('all-pokemons').innerHTML += showOverviewPokemonWithSort(i);
        document.getElementById(`pokemon-sort-${i}`).innerHTML = actualSort;
    }

    else {
        document.getElementById('all-pokemons').innerHTML += showOverviewPokemonWithoutSort(i);
    }
}


function showActualBgColor(i) {
    let bgType = document.getElementById(`pokemon-type-${i}`).innerHTML;
    document.getElementById(`pokemon-overview-container-${i}`).classList.add(`bg-container-${bgType}`);
}


function showOverviewPokemonWithoutSort(i) {
    return /*html*/ `
    <div class="pokemon-overview-container" id="pokemon-overview-container-${i}">
        <div class="pokemon-info-container">
            <p id="pokemon-id-${i}"># ${i}</p>
            <span class="pokemon-name" id="pokemon-name-${i}"></span>
            <span class="pokemon-type" id="pokemon-type-${i}"></span>
        </div>
        <div class="pokemon-img-container">
            <img id="pokemon-img-${i}">
        </div>
    </div>`;
}


function showOverviewPokemonWithSort(i) {
    return /*html*/ `
    <div class="pokemon-overview-container" id="pokemon-overview-container-${i}">
        <div class="pokemon-info-container">
            <p id="pokemon-id-${i}"># ${i + 1}</p>
            <span class="pokemon-name" id="pokemon-name-${i}"></span>
            <span class="pokemon-type" id="pokemon-type-${i}">${i}</span>
            <span class="pokemon-type" id="pokemon-sort-${i}"></span>
        </div>
        <div class="pokemon-img-container">
            <img id="pokemon-img-${i}">
        </div>
    </div>`;
}