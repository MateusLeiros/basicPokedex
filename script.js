const leftArrow = document.querySelector('[data-arrow="left"]');
const rightArrow = document.querySelector('[data-arrow="right"]');
const pokemon = document.querySelector('.inside-screen');
const luz = document.querySelector('[data-light]');
const setas = [leftArrow, rightArrow];

setas.forEach((seta)=>{
    seta.addEventListener('mousedown', piscaLuz);
    seta.addEventListener('mouseup', piscaLuz);
    seta.addEventListener('click', changePokemon);
})

const cores = ['bg-blue', 'bg-red', 'bg-green'];
let num = 1
pokemon.classList.add(cores[num%3]);

function changePokemon(event) {
    pokemon.classList.remove(cores[num%3]);
    if(this === rightArrow){
        num++;
    }
    else if (this === leftArrow){
        if (num>1){
            num--;
        }
    }
    getPokemon(num);
    pokemon.classList.add(cores[num%3]);
}

function piscaLuz (event){
    const luzesSuperiores = document.querySelectorAll('[data-luz-sup]');
    let i = 1;
    if(event.type === 'mousedown'){
        luz.classList.add('active');
    } else if (event.type === 'mouseup'){
        luz.classList.remove('active');
    }

    luzesSuperiores.forEach((luzSup)=>{
        console.log(luzSup);
        setTimeout(luzSup.classList.toggle('bright-border'), i*3000);
        i++;
    });

}

function getPokemon(number) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
    .then(r => r.json())
    .then(pokemon => {
        const nomePokemon = document.querySelector('.pokemon-name');
        const imagemPokemon = document.querySelector('.inside-screen img');
        nomePokemon.innerText = pokemon.name.toUpperCase();
        imagemPokemon.setAttribute('src' , pokemon.sprites.front_default);

        console.log(pokemon);
    });
}
getPokemon(num);