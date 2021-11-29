const baseURL = 'https://pokeapi.co/api/v2/pokemon/';               //la url donde se consume la info de la pokedex
const pokemon = document.getElementById('pokemonName');             //el campo donde se va a escribir el nombre o ID delpokemon a buscar
const buttonSearch = document.getElementById('pokemonSearch');      //botòn de buscar imagen de luoa
const buttonRemove = document.getElementById('pokemonRemove');      //botòn de quitar el pokemon buscado imagen de pokebal
const appNode = document.getElementById('app');                     //donde se insertan los pokemones, la info, a tràves del nodo

buttonSearch.addEventListener('click', insertPokemon)
buttonRemove.addEventListener('click', deletePokemon)

function insertPokemon(){
    window.fetch(`${baseURL}${pokemon.value.toLowerCase()}`)        //accede y manipula, fetch para hacer peticiòn a pàgina web, value =a què valor està escrito en el campo de texto, la pokeAPI maneja todo en lowerCase
    .then(response => {                                             //un paràmetro en arrow function
        if(response.status === 404) {                               //si la respuesta tiene un estado triple igual a 404 manda una alerta
            alert('El pokemon no se encuentra disponible, por favor intenta con otro c:')
         } else{                                                    //de so ser asì escribir un Return response json
             return response.json()                                 //o sea la respuesta que obtuviste , la info, transformar a json
         }
    })

    .then(responseJSON => {   
        const allItems = [];                                        //constante donde se guarda la info que se va a insertar con un array vacìo
        const result = [];                                          //constante donde esta toda la info de los pokemones
        for(let pokemonInfo in responseJSON){
            result.push([pokemonInfo , responseJSON[pokemonInfo]])  //a result insertar mètodo push
        }

        console.table(result);

        //Imagen
        const pokeImagen = document.createElement('img')
        pokeImagen.src = result[14][1].front_shiny                  //imagen del pokemon guardada del ìndice 14

        //Nombre e ID
        const pokeNombre = document.createElement('h2')
        pokeNombre.innerText = `Nombre: ${result[10][1]} = ID: ${result[6][1]}`

        //Tipo
        //const pokeTipo = document.createElement('h2')
        //pokeTipo.innerText = `Tipo: ${result[16[1][0].type.name}  //comilla invertida
        //Tipo
        const tipoPokemon = document.createElement('h2')
        tipoPokemon.innerText = `Tipo: ${result[16][1][0].type.name}`
        
        //Contenedor
        const pokeNtenedor = document.createElement('div')
        pokeNtenedor.append(pokeImagen , pokeNombre , tipoPokemon)

        allItems.push(pokeNtenedor);
        appNode.append(...allItems);                               //operador spread para traer todods los elementos del array
    })
}

function deletePokemon(){
    let allPokemons =appNode.childNodes                           // NodeList transfromarla en un Array
        allPokemons = Array.from(allPokemons)

        allPokemons.forEach(pokemon => {
        pokemon.remove(pokemon)
    })
}


const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

        const displayPokemon = (pokemon) => {
            console.log(pokemon);
            const pokemonHTMLString = pokemon
                .map(
                    (pokeman) => `
                <li class="card">
                    <img class="card-image" src="${pokeman.image}"/>
                    <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
                    <p class="card-subtitle">Type: ${pokeman.type}</p>
                </li>
             `
                )
                .join('');
            pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
