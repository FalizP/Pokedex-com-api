const formulario = document.querySelector("form");

formulario.addEventListener("submit", function (e) {
	e.preventDefault();

	let urlForm = "https://pokeapi.co/api/v2/pokemon/";

	//Valor do input Name
	const nome = document.getElementById("name");

	//Concatena a url com o input Name já em minúsculo
	urlForm = (urlForm + this.name.value).toLowerCase();

	const resposta = document.getElementById("content");

	const imagem = document.getElementById("imgPokemon");

	//Resposta em HTML
	let html = "";

	fetch(urlForm)
        .then((resposta) => resposta.json())
        .then(function(data) {
            html = 'Nome: ' + maiuscula(data.name) + '<br>';
            html += 'Tipo: ' + maiuscula(data.types[0].type.name);
            resposta.innerHTML = html;

            imagem.innerHTML =
                "<img src='" + data.sprites.front_default + "'>" +
                "<img src='" + data.sprites.back_default + "'>";
        })
        .catch(function(err) {
            if(err == 'SyntaxError: Unexpected token N in JSON at position 0') {
                resposta.innerHTML = "Pokémon não encontrado! ಥ_ಥ";
                imagem.innerHTML = null;
                nome.value = null;
                nome.placeholder = "Pesquise Novamente!";
            }
            else {
                html = 'Erro: ' + err;
            }
        });
}); //Fim --formulario.addEventListener

function maiuscula(val) {
    return val[0].toUpperCase() + val.substr(1);
}

function limpaPlaceholder(x) {
    x.placeholder = '';
}

function escrevePlaceholder(x) {
    x.placeholder = "Exemplo: Pikachu ou 25";
}