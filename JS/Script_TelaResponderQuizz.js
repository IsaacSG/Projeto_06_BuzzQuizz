let id;
let respostas = [];
let contador = 0;
function carregarQuizz(elemento){
    const pagina01 = document.querySelector(".pagina01");
    pagina01.classList.add("oculto");
    const pagina02 = document.querySelector(".pagina02");
    pagina02.classList.remove("oculto");
    id = elemento.id;
    renderizarQuizzSelecionado();
}
function renderizarQuizzSelecionado () {
    const promisse = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promisse.then(carregarQuizzSelecionado);
}
function carregarQuizzSelecionado (response) {
    let quizz = response.data;
    let quizzSelecionado;
    let respostasQuizz;
    let editarcss;
    let cor;
    let imagemFundo;
    for(i = 0; i < quizz.length; i++){
        if (quizz[i].id == id) {
            quizzSelecionado = document.querySelector(".imagemTopo");
            editarcss = document.querySelector(".imagemTopo");
            imagemFundo = `${quizz[i].image}`
            editarcss.style.backgroundImage = `url("${imagemFundo}")`;
            quizzSelecionado.innerHTML += `<div class ="topoImagem"> <p>${quizz[i].title}</p></div>`;
            let questoes = quizz[0].questions;
            quizzSelecionado = document.querySelector(".perguntasQuizz");
            for(o = 0; o < questoes.length; o++){
                quizzSelecionado.innerHTML += `<ul class ="perguntas${o}"><p class = "tituloPergunta">${quizz[i].questions[o].title} </p> </ul>`;
                cor = `${quizz[i].questions[o].color}`;
                editarcss = document.querySelector(`.perguntas${o} > .tituloPergunta`)
                editarcss.style.backgroundColor = cor;
                respostas = quizz[i].questions[o].answers;
                respostas.sort(misturar);
                for(p = 0; p < respostas.length; p++){
                    respostasQuizz = document.querySelector(`.perguntas${o}`);
                    respostasQuizz.innerHTML += `<li class = "respostas${o}${p}" id="${respostas[p].isCorrectAnswer}" onclick="responderQuizz(this)"><img src = "${respostas[p].image}"/> <p>${respostas[p].text}</p></li>`;
                }
            }
        }
    }
}

function responderQuizz (elemento){
    let editarcss;
    let alternativa = elemento.className;
    id = elemento.id;
    let verde = "rgb(23, 255, 0)";
    let vermelho = "rgb(255,0,0)";
    let elementoPai;

    if(id == "true"){
        editarcss = document.querySelector(`.${alternativa} > p`);
        editarcss.style.color = verde;
        elementoPai = document.querySelector(`.${elemento.parentNode.className}`);
        elementoPai.classList.add("opacidade");
        contador = contador + 1;
    }
    else {
        elementoPai = document.querySelector(`.${elemento.parentNode.className}`);
        elementoPai.classList.add("opacidade");
        editarcss = document.querySelector(`.${alternativa} > p`);
        editarcss.style.color = vermelho;
    }
}

function misturar(){
    return Math.random() - 0.5;
}