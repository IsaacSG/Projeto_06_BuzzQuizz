
function todosOsQuizzes(){
    const promisse = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promisse.then(renderizarQuizzes);
}

function renderizarQuizzes(response){
    let quizz = response.data;
    let novoQuizz;

    for(i = 0; i < quizz.length; i++){
        novoQuizz = document.querySelector(".todos-os-quizzes");
        novoQuizz.innerHTML += `<li class = "quizz" id="${quizz[i].id}" onclick="responderQuizz(this)"> <img src="${quizz[i].image}"/> <p class = "titulo">${quizz[i].title}</p> </li>`

    }
}

todosOsQuizzes();