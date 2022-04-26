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
        telaCriarNiveis();
    }
}
 
function telaCriarNiveis(){
    const infoNiveis = document.querySelector(".info-niveis");

    infoNiveis.innerHTML = `<h3>Agora, decida os níveis!</h3>`;
    for(let i = 1; i <= quantidadeDeNiveis; i++){
        infoNiveis.innerHTML += `
        <div class="layout-criacao-conteudo">
            <div class="capsula-inputs">
                <h3>Nível ${i}</h3>
                <ul class="layout-inputs">
                    <li><input type="text" placeholder="Título do nível" class="url-img-titulo${i}"></li>
                    <li><input type="text" placeholder="% de acerto mínima" class="nivel-minimo${i}"></li>
                    <li><input type="text" placeholder="URL da imagem do nível" class="url-nivel${i}"></li>
                    <li><textarea name="Descricao" id="descricao" cols="30" rows="10" placeholder="Descrição do nível" class="descricao-nivel${i}"></textarea></li>                  
                </ul>
            </div> 
        </div>      
        `
    }

    infoNiveis.innerHTML += `<button type="button" class="botao-criar" onclick="guardarNiveis()">Finalizar Quizz</button>`;


    document.querySelector(".info-perguntas.layout-criacao").classList.add("oculto");
    infoNiveis.classList.remove("oculto");
    infoNiveis.scrollIntoView();
}

function guardarNiveis(){
     pegarTitulodoNivel =num =>{return document.querySelector(".url-img-titulo"+num).value;}
     pegarUrlImgTitulo = num =>{return document.querySelector(".url-nivel"+num).value;}
     pegarDescricao = num =>{return document.querySelector(".descricao-nivel"+num).value;}
     pegarNivelMinino = num =>{return document.querySelector(".nivel-minimo"+num).value;}
    for(let i = 1; i <= quantidadeDeNiveis; i++){
        const obj = {
            title: pegarTitulodoNivel(i),
            image: pegarUrlImgTitulo(i),
            text: pegarDescricao(i),
            minValue: pegarNivelMinino(i)
        }
        niveis.push(obj);
    }

    console.log(niveis);
    validarNiveis();
}

function validarNiveis(){
    eNivelValido = true;
    nivelMinimoValido = false;

    niveis.forEach((elemento) => {
        if(elemento.title.length < 10){
            eNivelValido = false;
            console.log("Invalid level title");
        }
        if(elemento.minValue < 0 || elemento.minValue > 100){
            eNivelValido = false;
            console.log("valor mínimo inválido");
        }
        if(elemento.minValue === 0){
            nivelMinimoValido = true;
            console.log("valor mínimo = 0");
        }
        if(!validarUrl(elemento.image)){
            eNivelValido = false;
            console.log("url Inválida");
        }
        if(elemento.text.length<30){
            eNivelValido = false;
            console.log("Descrição Inválida");
        }        
    });

    if(!eNivelValido || nivelMinimoValido)
    {
        alert("Preencha os dados corretamente");
        console.log("Níveis inválidos");
        niveis = [];
    }
    else{
        quizz.levels = niveis;
        enviarParaAPI()
    }

}
function enviarParaAPI()
{
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes", quizz);
    requisicao.then(finalizaCriacao);
    requisicao.catch( (error) => {  
        console.log("Falha em enviar quizz pro servidor\n" + error.data);
    })
}
function finalizaCriacao(response){
    const telaSucesso = document.querySelector(".tela-successo");

    telaSucesso.innerHTML = `
    <h3>Seu quizz está pronto!</h3>
    <div class="img-criacao">
        <img src="${quizz.image}" alt="Quizz Image">
        <span class="img-texto">${quizz.title}</span>
        <span class="img-degrade"></span>
    </div>            
    <button type="button" class="botao-criar" onclick="accessQuizz()">Acessar Quizz</button>
    <span class="back-home" onclick="backHome()">Voltar pra home</span>
    `

    document.querySelector(".levels-info").classList.add("oculto");
    telaSucesso.classList.remove("oculto");
    telaSucesso.scrollIntoView();
    console.log(response.data);
}
