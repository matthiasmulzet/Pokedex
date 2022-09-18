let pokemons = [];
let url = 'https://pokeapi.co/api/v2/pokemon/';
let actualShowedPokemons;
let next20Pokemons;

// 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=150';


async function loadPokemon() {
    document.getElementById('all-pokemons').innerHTML = '';

    for (let i = 0; i < 20; i++) {

        await loadAndShowActualPokemons(i);

    }
    next20Pokemons = actualShowedPokemons;
}


async function loadMorePokemons() {
    pokemonsAlreadyLoaded();

    for (let i = (next20Pokemons + 1); i < (next20Pokemons + 21); i++) {
        await loadAndShowActualPokemons(i);
    }
    next20Pokemons = actualShowedPokemons;
}


async function loadAndShowActualPokemons(i) {
    let pokedexUrl = url + (i + 1); //actual pokemon will be loaded
    let response = await fetch(pokedexUrl);
    let currentPokemon = await response.json();

    pokemons.push(currentPokemon);
    generatePokemons(i);
    actualShowedPokemons = i;
}


function pokemonsAlreadyLoaded() {
    if (document.getElementById('search-pokemon').value !== '') {
        document.getElementById('search-pokemon').value = '';
        document.getElementById('all-pokemons').innerHTML = '';

        for (let i = 0; i < pokemons.length; i++) {
            generatePokemons(i);
            actualShowedPokemons = i;
        }
        next20Pokemons = actualShowedPokemons;
    }
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


function showStartPage() {
    document.getElementById('search-pokemon').value = '';
    showSearchPokemons();
}


function generatePokemons(i) {
    document.getElementById('all-pokemons').innerHTML += showOverviewPokemonWithSort(i);
    setPokemonData(i);

    showActualBgContainerColorlor(i);
}


function setPokemonData(i) {
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
}


function showActualBgContainerColorlor(i) {
    let bgType = document.getElementById(`pokemon-type-${i}`).innerHTML;
    document.getElementById(`pokemon-overview-container-${i}`).classList.add(`bg-container-${bgType}`);
}


function showActualBgColor(i) {
    let bgType = document.getElementById(`pokemon-type-${i}`).innerHTML;
    document.getElementById(`pokemon-overview-container-${i}`).classList.add(`bg-${bgType}`);
}


function showDetailViewPokemon(i) {
    document.getElementById('overlay').classList.add('overlay-pokemon');
    document.getElementById('overlay').innerHTML = detailViewTemplate(i);
    document.getElementById('height').innerHTML = (pokemons[i]['height'] / 10).toFixed(2) + ` m`;
    document.getElementById('weight').innerHTML = (pokemons[i]['weight'] / 10).toFixed(1) + ` kg`;

    showAbilities(i);
    showAllStats(i);
    setPokemonData(i);
    showActualBgColor(i);
}


function showAbilities(i) {
    let abilitiesLength = pokemons[i]['abilities'].length;
    for (let aL = 0; aL < abilitiesLength; aL++) {
        document.getElementById('abilities').innerHTML += pokemons[i]['abilities'][aL]['ability']['name'] + `, `;
    }
    let newAbilitieString = document.getElementById('abilities').innerHTML.slice(0, -2);
    document.getElementById('abilities').innerHTML = newAbilitieString;
}


function showAllStats(i) {
    let statsLength = pokemons[i]['stats'].length;
    for (let sL = 0; sL < statsLength; sL++) {
        document.getElementById(`stat-${sL}`).innerHTML = pokemons[i]['stats'][sL]['base_stat'];
        let valueProgressBar = document.getElementById(`stat-${sL}`).innerHTML = pokemons[i]['stats'][sL]['base_stat'];
        document.getElementById(`progress-bar-${sL}`).value = valueProgressBar;
    }
}


function closeDetailView() {
    document.getElementById('overlay').classList.remove('overlay-pokemon');
    document.getElementById('overlay').innerHTML = '';
}


function save(event) {
    event.stopPropagation();
}


function showAbout() {
    document.getElementById('stats').classList.add('inactive-about-stats');
    document.getElementById('table-stats').classList.add('d-none');
    document.getElementById('about').classList.remove('inactive-about-stats');
    document.getElementById('table-about').classList.remove('d-none');
}


function showStats() {
    document.getElementById('about').classList.add('inactive-about-stats');
    document.getElementById('table-about').classList.add('d-none');
    document.getElementById('stats').classList.remove('inactive-about-stats');
    document.getElementById('table-stats').classList.remove('d-none');
}


// ----------------------------------- HTML Templates ------------------------------------------------ //

function showOverviewPokemonWithSort(i) {
    return /*html*/ `
    <div onclick="showDetailViewPokemon(${i})" class="pokemon-overview-container" id="pokemon-overview-container-${i}">
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


function detailViewTemplate(i) {
    return /*html*/ `
        <div onclick="save(event)" class="pokemon-big-overview-container" id="pokemon-overview-container-${i}">
            <div class="arrow-and-id">
                <img onclick="closeDetailView()" class="back-arrow" src="img/arrow-left-solid.svg" alt="back-arrow">
                <span id="pokemon-id-${i}"># ${i + 1}</span>
            </div>
            <span class="pokemon-overview-name" id="pokemon-name-${i}"></span>
            <div class="overview-type-sort">
                <span class="pokemon-type" id="pokemon-type-${i}"></span>
                <span class="pokemon-type" id="pokemon-sort-${i}"></span>
            </div>
            <div class="pokemon-overview-img-container">
                <img id="pokemon-img-${i}">
            </div>
        </div>

        <div onclick="save(event)" class="pokemon-infos">
            <div class="about-stats-container">
                <span id="about" onclick="showAbout()">About</span>
                <span id="stats" onclick="showStats()" class="inactive-about-stats">Stats</span>
            </div>

            <table id="table-about" class="table-about">
                <tr>
                    <td>ID:</td>
                    <td># ${i + 1}</td>
                </tr>
                <tr>
                    <td>Height:</td>
                    <td id="height"></td>
                </tr>
                <tr>
                    <td>Weight:</td>
                    <td id="weight"></td>
                </tr>
                <tr>
                    <td>Abilities:</td>
                    <td id="abilities"></td>
                </tr>
            </table>

            <table id="table-stats"  class="table-stats d-none">
                <tr>
                    <td>HP</td>
                    <td><progress id="progress-bar-0" value="" max="100"></progress></td>
                    <td id="stat-0"></td>
                </tr>
                <tr>
                    <td>Attack</td>
                    <td><progress id="progress-bar-1" value="" max="100"></progress></td>
                    <td id="stat-1"></td>
                </tr>
                <tr>
                    <td>Defense</td>
                    <td><progress id="progress-bar-2" value="" max="100"></progress></td>
                    <td id="stat-2"></td>
                </tr>
                <tr>
                    <td>Special Attack</td>
                    <td><progress id="progress-bar-3" value="" max="100"></progress></td>
                    <td id="stat-3"></td>
                </tr>
                <tr>
                    <td>Special Defense</td>
                    <td><progress id="progress-bar-4" value="" max="100"></progress></td>
                    <td id="stat-4"></td>
                </tr>
                <tr>
                    <td>Speed</td>
                    <td><progress id="progress-bar-5" value="" max="100"></progress></td>
                    <td id="stat-5"></td>
                </tr>
            </table>
        </div>`;
}