let id;
function responderQuizz(elemento){
    const pagina01 = document.querySelector(".pagina01");
    pagina01.classList.add("oculto");
    const pagina02 = document.querySelector(".pagina02");
    pagina02.classList.remove("oculto");
    id = document.querySelector(".quizz > id")
    console.log(id);
    renderizarQuizzSelecionado();
}
function renderizarQuizzSelecionado () {
    const promisse = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promisse.then(responderQuizzSelecionado);
}
function responderQuizzSelecionado (response) {
    let quizz = response.data;
    let quizzSelecionado;
    console.log(quizz);
    for(i = 0; i < quizz.length; i++){
        if (quizz[i].id == id) {
        quizzSelecionado = document.querySelector(".perguntasQuizz");
        quizzSelecionado.innerHTML += `<div class ="perguntas"><p>${quizz[i].questions[i].title} </p></div>`
        }
    }
}