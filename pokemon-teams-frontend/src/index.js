const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let pokemons  = []
let trainers = []

fetch(POKEMONS_URL)
	.then(res => res.json())
	.then(json => {
		console.log(json)
			pokemons = json
		

	})

fetch(TRAINERS_URL)
	.then(res => res.json())
	.then(json => {
		console.log(json)
		//trainers = json
		for (var i = 0; i < json.length; i++) {
			const main = document.querySelector("main")
			p = document.createElement("p")
			
			main.appendChild(trainer_card(json[i]))

		}

	})


function trainer_card(trainer) {

	const div = document.createElement("div")
	div.className = "card" 
	div.setAttribute("data-id", trainer.id)

	const p = document.createElement("p")
	p.innerText = trainer.name
	div.appendChild(p)

	const btn = document.createElement("button")
	btn.setAttribute("data-trainer-id", trainer.id)
	btn.innerText = "Add Pokemon"
	div.appendChild(btn)


	const ul = document.createElement("ul")
	for (var j = 0; j < pokemons.length; j++) {
		if (pokemons[j].trainer_id == trainer.id) {
			ul.appendChild(li_creation(j))

		}

	}//for

		btn.addEventListener("click", function(){
			console.log(ul.children.length)
			if (ul.children.length < 6)
			{
				let random_pok = pokemons[Math.floor(Math.random()*pokemons.length)];
				console.log(Math.floor(Math.random()*pokemons.length))
				console.log(random_pok)
				ul.appendChild(li_creation(random_pok.id))
			}
		})

	div.appendChild(ul)


	return div
}

function li_creation(j){
	const li = document.createElement("li")
	li.innerText = pokemons[j].nickname + "(" + pokemons[j].species + ")"
	
	const rbtn = document.createElement("button")
	rbtn.setAttribute("data-pokemon-id", pokemons[j].id)
	rbtn.className = "release"
	rbtn.innerText = "Release"

	li.appendChild(rbtn)
	

	rbtn.addEventListener('click', function(){
		let id = rbtn.getAttribute("data-pokemon-id")
		let filtered = pokemons.filter(function(value, index, arr){
			return value.id != id;
		});
		li.remove()
		console.log(filtered)

	})
	return li
}

