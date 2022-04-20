function todosOsQuizzes(){
    const promisse = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promisse.then(renderizarQuizzes);
}

function renderizarQuizzes(response){
    let quizz = response.data;
    let novoQuizz;

    for(i = 0; i < quizz.length; i++){
        novoQuizz = document.querySelector(".todos-os-quizzes");
        novoQuizz.innerHTML += `<li class = "quizz" onclick="responderQuizz(this)"> <p class = "titulo">${quizz[i].title}</p> <img src="${quizz[i].image}> <p class = "id">${quizz[i].id}</p> </li>`

    }
}

function criarQuizz() {
    const pagina01 = document.querySelector(".pagina01");
    pagina01.classList.add("oculto");
    const paginacriarQuizz = document.querySelector(".paginaCriarquizz");
    paginacriarQuizz.classList.remove("oculto");
}

todosOsQuizzes();