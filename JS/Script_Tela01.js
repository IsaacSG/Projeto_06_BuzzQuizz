let niveis = [];
let perguntas = [];
let quizz = {
    title: "",
    image: "",
    questions: perguntas,
    levels: niveis
}


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

function criarQuizz() {
    const pagina01 = document.querySelector(".pagina01");
    pagina01.classList.add("oculto");
    const paginacriarQuizz = document.querySelector(".paginaCriarquizz");
    paginacriarQuizz.classList.remove("oculto");
}

function validarCor(cor){    
    const hexadecimal=/^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/i;
    return(hexadecimal.test(cor));
    
}
function validarUrl(url){
    const urlTipo = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    return(urlTipo.test(url));
}
function armazenarInfoBasicas(){
    quantidadeDeNiveis = document.querySelector(".quantidade-niveis").value;
    quantidadeDePerguntas = document.querySelector(".quantidade-perguntas").value;
    quizz.title = document.querySelector(".titulo-quizz").value;
    quizz.image = document.querySelector(".quizz-img-url").value;

    validarInfoBasicas();
}

function validarInfoBasicas(){
    let eInfoValida = true;
    if(quizz.title.length<20 || quizz.title.length > 65){
        eInfoValida = false;
        console.log("O titulo deve conter no mínimo 20 e no máximo 65 caracteres");
    }
    if(!validarUrl(quizz.image)){
        eInfoValida = false;
        console.log("Url da imagem inválido");
    }
    if(quantidadeDePerguntas < 3){
        eInfoValida = false;
        console.log("Número de perguntas inválido");
    }
    if(quantidadeDeNiveis < 2){
        eInfoValida = false;
        console.log("Quantidade de níveis inválido");
    }

    if(!eInfoValida){
        alert("Preencha os dados corretamente");
        quizz = {
            title: "",
            image: "",
            questions: perguntas,
            levels: niveis
        }
    }
    else{
           alert("foi");
    }
}

todosOsQuizzes();