const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokermonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 31;

const fetchPokemon = async (pokemon)=>{

    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(apiResponse.status == 200){
        const data = await apiResponse.json();
        return data;
    }
    
};
//fetchPokemon('25');

const renderPokemon = async (pokemon) =>{
    pokemonName.innerHTML = 'Loading...';
    const data = await fetchPokemon(pokemon);

    if(data){
        pokermonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokermonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else{
        pokermonImage.style.display = 'none';
        pokemonName.innerHTML = "Not found!"
        pokemonNumber.innerHTML = "???"
    }
    
}
//renderPokemon('233');

form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click',(evt)=>{
    if(searchPokemon > 1){
        searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
})

buttonNext.addEventListener('click',(evt)=>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})
renderPokemon(searchPokemon);