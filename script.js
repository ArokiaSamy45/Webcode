var con = document.createElement('div');
        con.classList.add('Heading');
        var content = document.querySelector('body').append(con);
        var re = document.querySelector('div') 



async function api(){
    
        const promises = [];
        for(let i = 1; i <=50; i++) {
            var url = fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            out = await url
            prom = out.json()
            data = await prom
            promises.push(data);
        }
        Promise.all(promises).then((results) => {
            const pokemon = results.map((data) => ({
                name: data.name,
                image: data.sprites['front_default'],
                ability: data.abilities.map((ability)=> ability.ability.name).join(', '),
                move: data.moves.map((move)=> move.move.name).join(', '),
                weight: data.weight,
            }));
            displayPokemon(pokemon);
        });
            
       const displayPokemon = (pokemon) => {
        console.log(pokemon);
    const pokemonString = pokemon.map (pokeman => 
        `<li class="card">
        <h2 class="card_name">Name: ${pokeman.name}</h2>
    <img class="card_image" src="${pokeman.image}"/>
    <p class="card_ability">Ability: ${pokeman.ability}</p>
    <p class="card_weight">Weight: ${pokeman.weight}</p>
    </li>`).join(''); 
    re.innerHTML = pokemonString;

    };
        
        
      
        
    
    

}
api()

{/* <p class="card_move">Move: ${pokeman.move}</p> */}