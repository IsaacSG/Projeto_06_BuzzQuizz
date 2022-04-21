let id;
let respostas = [];
function responderQuizz(elemento){
    const pagina01 = document.querySelector(".pagina01");
    pagina01.classList.add("oculto");
    const pagina02 = document.querySelector(".pagina02");
    pagina02.classList.remove("oculto");
    id = elemento.id;
    renderizarQuizzSelecionado();
}
function renderizarQuizzSelecionado () {
    const promisse = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promisse.then(responderQuizzSelecionado);
}
function responderQuizzSelecionado (response) {
    let quizz = response.data;
    let quizzSelecionado;
    let respostasQuizz;
    for(i = 0; i < quizz.length; i++){
        if (quizz[i].id == id) {
            quizzSelecionado = document.querySelector(".perguntasQuizz");
            let questoes = quizz[0].questions;
            for(o = 0; o < questoes.length; o++){
                quizzSelecionado.innerHTML += `<div class ="perguntas${o}"><p class = "titulo">${quizz[i].questions[o].title} </p> </div>`
                respostas = quizz[i].questions[o].answers;
                respostas.sort(misturar);
                for(p = 0; p < respostas.length; p++){
                    respostasQuizz = document.querySelector(`.perguntas${o}`);
                    respostasQuizz.innerHTML += `<div class = "respostas"><img src = "${respostas[p].image}"/> <p>${respostas[p].text}</p></div>`;
                    console.log(respostas)
                }
            }
        }
    }
}
function misturar(){
    return Math.random() - 0.5;
}