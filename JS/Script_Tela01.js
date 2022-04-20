function todosOsQuizzes(){
    const promisse = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promisse.then(renderizarQuizzes);
}

function renderizarQuizzes(response){
    let quizz = response.data;
    let novoQuizz;

    for(i = 0; i < quizz.length; i++){
        novoQuizz = document.querySelector(".todos-os-quizzes");
        novoQuizz.innerHTML += `<div class = "quizz" onclick="responderQuizz()"> <p>${quizz[i].title}</p> <img src="${quizz[i].image}"> </div>`

    }
}

function responderQuizz(){
    const pagina01 = document.querySelector(".pagina01");
    pagina01.classList.add("oculto");
    const pagina02 = document.querySelector(".pagina02");
    pagina02.classList.remove("oculto");
}


todosOsQuizzes();