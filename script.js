const container = document.createElement("div");
container.classList.add("pokemon-container");
document.body.appendChild(container);

function createHeader() {
  const header = document.createElement("header");
  header.classList.add("navbar");

  const title = document.createElement("h1");
  title.classList.add("navbar_title");
  title.textContent = "Pokemon API";

  header.appendChild(title);
  document.body.insertBefore(header, container);
}

async function api(page) {
  try {
    const promises = [];
    const offset = (page - 1) * 10;

    for (let i = 1 + offset; i <= 10 + offset; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      const response = await fetch(url);
      const data = await response.json();
      promises.push(data);
    }

    Promise.all(promises).then((results) => {
      const pokemon = results.map((data) => ({
        name: data.name,
        image: data.sprites["front_default"],
        ability: data.abilities
          .map((ability) => ability.ability.name)
          .join(", "),
        move: data.moves.map((move) => move.move.name).join(", "),
        weight: data.weight,
      }));
      displayPokemon(pokemon);
    });
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
  }
}

const displayPokemon = (pokemon) => {
  container.innerHTML = "";

  pokemon.forEach((pokemon) => {
    const card = document.createElement("li");
    card.classList.add("card");

    const nameElement = document.createElement("h2");
    nameElement.classList.add("card_name");
    nameElement.textContent = `Name: ${pokemon.name}`;
    card.appendChild(nameElement);

    const imageElement = document.createElement("img");
    imageElement.classList.add("card_image");
    imageElement.src = pokemon.image;
    card.appendChild(imageElement);

    const abilityElement = document.createElement("p");
    abilityElement.classList.add("card_ability");
    abilityElement.textContent = `Ability: ${pokemon.ability}`;
    card.appendChild(abilityElement);

    const weightElement = document.createElement("p");
    weightElement.classList.add("card_weight");
    weightElement.textContent = `Weight: ${pokemon.weight}`;
    card.appendChild(weightElement);

    container.appendChild(card);
  });
};

let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
  createHeader();

  api(currentPage);

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.id = "nextBtn";
  nextBtn.addEventListener("click", () => {
    currentPage++;
    api(currentPage);
  });

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Previous";
  prevBtn.id = "prevBtn";
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      api(currentPage);
    }
  });

  const paginationDiv = document.createElement("div");
  paginationDiv.classList.add("pagination");
  paginationDiv.appendChild(prevBtn);
  paginationDiv.appendChild(nextBtn);

  document.body.appendChild(paginationDiv);
});
