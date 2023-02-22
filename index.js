async function fetchApiData() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const { results } = await response.json();
        return { results };

    } catch (error) {
        console.error(error);
    }
}

async function fetchPokemonDetails(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

async function getData() {
    const data = await fetchApiData();
    return data;
}

function handleCardClick(event) {
    const card = event.currentTarget;
    card.classList.toggle("flipped");
}
async function renderData(data) {
    const cardContainer = document.getElementsByClassName("card-container")[0];
    cardContainer.innerHTML = "";
  
    for (const item of data) {
      const card = document.createElement("div");
      card.classList.add("card", "flipped");
      card.addEventListener("click", handleCardClick);
  
      const nameCard = document.createElement("h2");
      const imageCard = document.createElement("img");
      nameCard.textContent = item.name;
      imageCard.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split("/")[6]}.png`;
      card.appendChild(imageCard);
      card.appendChild(nameCard);
  
      const backCard = document.createElement("div");
      backCard.classList.add("back-card");
  
      const backAbilities = document.createElement("p");
      const backTypes = document.createElement("p");
      const backStatsName = document.createElement("p")
      const pokemonDetails = await fetchPokemonDetails(item.url);
      const abilities = pokemonDetails.abilities.map(ability => ability.ability.name).join(", \n");
      const types = pokemonDetails.types.map(type => type.type.name).join(", \n");
      const stats = pokemonDetails.stats.map(stats => stats.base_stat)
      const statsName = pokemonDetails.stats.map(stats => stats.stat.name)


      
  
      backAbilities.textContent = `Abilities:\n ${abilities}`;
      backTypes.textContent = `Types:\n ${types}`;
      backStatsName.textContent = `Stats:\n ${statsName[0]}: ${stats[0]},\n ${statsName[1]} : ${stats[1]},\n ${statsName[2]} : ${stats[2]},\n ${statsName[3]} : ${stats[3]},\n ${statsName[4]} : ${stats[4]},\n ${statsName[5]}: ${stats[5]}`;
      backCard.appendChild(backAbilities);
      backCard.appendChild(backTypes);
      backCard.appendChild(backStatsName)
      card.appendChild(backCard);
  
      card.addEventListener("click", () => {
        card.classList.add("hover");
      });
  
      card.addEventListener("mouseleave", () => {
        setTimeout(() => {
          card.classList.remove("hover");
        }, 0);
      });
  
      cardContainer.appendChild(card);
    }
  }
function handleClick() {
    getData().then(data => {
        renderData(data.results);
    });
}

const button = document.getElementById("btn-data");
button.addEventListener("click", handleClick);
