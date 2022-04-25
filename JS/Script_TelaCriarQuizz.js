let niveis = [];
let perguntas = [];
let quizz = {
    title: "",
    image: "",
    questions: perguntas,
    levels: niveis
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
          telaCriarPerguntas();
    }
}
function telaCriarPerguntas(){
    const telaPerguntas = document.querySelector(".info-perguntas");

    telaPerguntas.innerHTML = "<h3>Crie suas perguntas</h3>";
    for(let i = 1; i<=quantidadeDePerguntas; i++){
        telaPerguntas.innerHTML += `
        <div class="layout-criacao-conteudo"> 
            <div class="capsula-inputs">
                <h3>Pergunta ${i}</h3>
                <ul class="layout-inputs">
                    <li><input type="text" placeholder="Texto da pergunta" class="texto-pergunta${i}"></li>
                    <li><input type="text" placeholder="Cor de fundo da pergunta" class="cor-bg-pergunta${i}"></li>                    
                </ul>
            </div> 
            <div class="capsula-inputs">
                <h3>Resposta correta</h3>
                <ul class="layout-inputs">
                    <li><input type="text" placeholder="Resposta correta" class="resposta-correta${i}"></li>
                    <li><input type="text" placeholder="URL da imagem" class="url-img-resposta${i}"></li>                    
                </ul>
            </div>             
        </div> 
        `        
    } 

    const perguntasHTML = document.querySelectorAll(".info-perguntas .layout-criacao-conteudo");
    perguntasHTML.forEach((elemento, index) => {
        for(let i = 0; i<3; i++){
            elemento.innerHTML += `
            <div class="capsula-inputs">
                <h3>Respostas Incorretas</h3> 
                <ul class="layout-inputs">
                    <li><input type="text" placeholder="Resposta incorreta ${i+1} " class="resposta-incorreta${index+1}"></li>
                    <li><input type="text" placeholder="URL da imagem" class="url-img-resposta${index+1}"></li>                    
                </ul>
            </div>
            `
        }

    });

    telaPerguntas.innerHTML += `<button type="button" class="botao-criar" onclick="guardarPerguntas()">Finalizar Quizz</button>`;
    document.querySelector(".info-basica").style.display = "none";
    telaPerguntas.classList.remove("oculto");
}
function pegarTitulo(num)
{
    return document.querySelector(".texto-pergunta"+num).value;
}
function pegarCor(num)
{
    return document.querySelector(".cor-bg-pergunta"+num).value;
}
function pegarRespostas(num)
{
    let respostasCorretas = document.querySelectorAll(".resposta-correta"+num);
    let respostaIncorreta = document.querySelectorAll(".resposta-incorreta"+num);
    let imgResposta = document.querySelectorAll(".url-img-resposta"+num);
    let respostas = [];

    for(let i = 0; i<4; i++){                                  
        let obj = null;
        if(i===0){                                       
            obj = {
                text: respostasCorretas[i].value,
                image: imgResposta[i].value,
                isCorrectAnswer: true
            }
        }
        else{            
            obj = {
                text: respostaIncorreta[i-1].value,
                image: imgResposta[i].value,
                isCorrectAnswer: false
            }
        }     

        if(i===0){
            respostas.push(obj);
        }
        else if(obj.image!="" || obj.text!=""){
            respostas.push(obj);
        }
    }

    return respostas;
}

function guardarPerguntas()
{
    for(let i = 1; i <= quantidadeDePerguntas; i++){
        const obj = {
            title: pegarTitulo(i),
            color: pegarCor(i),
            answers: pegarRespostas(i)
        }
        perguntas.push(obj);
    }

    console.log(perguntas);
    validarPerguntas();
}
function validarPerguntas(){
    let ePerguntaValida = true;
    
    perguntas.forEach((elemento) => {
        if(elemento.title.length < 20){
            ePerguntaValida = false;
            console.log("Titulo da pergunta inválido");
        }
        if(!validarCor(elemento.color)){
            ePerguntaValida = false;
            console.log("Codigo de cor invalido");
        }
        if(elemento.answers.length<2){
            ePerguntaValida = false;
            console.log("Quantidade de respostas invalido");
        }
        elemento.answers.forEach((elementoResposta) => {
            if(elementoResposta.text.length===0){
                ePerguntaValida = false;
                console.log("Texto da resposta invalido");
            }
            if(!validarUrl(elementoResposta.image)){
                ePerguntaValida = false;
                console.log("url da imagem invalido");
            }
        });
    })    

    if(!ePerguntaValida){
        alert("Preencha os dados corretamente");
        perguntas = [];
    }
    else{
        quizz.questions = perguntas;
        console.log("foi");
    }
}
