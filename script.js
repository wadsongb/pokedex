// Variáveis globais
const limitPerPage = 30;
let currentPage = 1;
let pokemonList = [];

// Função para buscar a lista de todos os Pokémon
async function fetchAllPokemon() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const data = await response.json();
  return data.results;
}

// Função para buscar os dados de um Pokémon específico
async function fetchPokemonData(pokemonUrl) {
  const response = await fetch(pokemonUrl);
  const data = await response.json();
  return data;
}

// Função para exibir os Pokémon na Pokédex
function displayPokemonPage(pageNumber) {
  const startIndex = (pageNumber - 1) * limitPerPage;
  const endIndex = startIndex + limitPerPage;
  const pagePokemonList = pokemonList.slice(startIndex, endIndex);

  const container = document.getElementById('pokemon-container');
  container.innerHTML = '';

  pagePokemonList.forEach(pokemon => {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');

    const pokemonName = document.createElement('h2');
    const capitalizedPokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase();
    pokemonName.textContent = capitalizedPokemonName;

    const pokemonImage = document.createElement('img');
    pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonIdFromUrl(pokemon.url)}.png`;
    pokemonImage.alt = capitalizedPokemonName;

    pokemonCard.appendChild(pokemonName);
    pokemonCard.appendChild(pokemonImage);
    container.appendChild(pokemonCard);
  });
}

// Função auxiliar para obter o ID de um Pokémon a partir da URL
function getPokemonIdFromUrl(url) {
  const regex = /\/pokemon\/(\d+)\//;
  const match = url.match(regex);
  return match[1];
}

// Função para exibir a página anterior
function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    displayPokemonPage(currentPage);
  }
}

// Função para exibir a próxima página
function nextPage() {
  const totalPages = Math.ceil(pokemonList.length / limitPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayPokemonPage(currentPage);
  }
}

// Função principal para carregar os Pokémon na Pokédex
async function loadPokedex() {
  pokemonList = await fetchAllPokemon();
  displayPokemonPage(currentPage);
}

// Carregar a Pokédex ao carregar a página
window.addEventListener('load', loadPokedex);

