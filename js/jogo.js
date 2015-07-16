var corFundo;
var corTexto;
var textoPainel = "Texto";
var textoCorTexto;

var placar = 0;
var lifes = 3;

var ciclo;


var cores = [];
var msgAcertou = "";
var msgErrou = "";
var msgFinal = "";

var setarIdiomaPortugues = function() {
    cores[0] = {nome : "PRETO", codigo : "#000000"};
    cores[1] = {nome : "AMARELO", codigo : "#FFD800"};
    cores[2] = {nome : "AZUL", codigo : "#2400A8"};
    cores[3] = {nome : "VERDE", codigo : "#00A83B"};
    cores[4] = {nome : "VERMELHO", codigo : "#DD2924"};
    cores[5] = {nome : "ROXO", codigo : "#5300A8"};
    cores[6] = {nome : "ROSA", codigo : "#F0359A"};
    cores[7] = {nome : "BRANCO", codigo : "#FFFFFF"};
    
    $(".txt-vidas").text("Vidas");
    $(".txt-pontos").text("Pontos");
    $(".btn-start").text("Começar");
    $(".btn-help").text("Como Jogar");
    
    $(".modal-title").text("Como Jogar");
    $(".txt-help-1").text("Para pontuar, clique no botão que indica a cor em que a palavra está escrita.");
    $(".txt-help-2").text("Tente fazer o maior número de pontos que conseguir. Boa Sorte!");
    $(".img-pt").show();
    $(".img-en").hide();
    
    msgAcertou = "Acertou!"
    msgErrou = "Errou!"
    msgFinal = "Fim de jogo!\nPontuação: ";
};

var setarIdiomaIngles = function() {
    cores[0] = {nome : "BLACK", codigo : "#000000"};
    cores[1] = {nome : "YELLOW", codigo : "#FFD800"};
    cores[2] = {nome : "BLUE", codigo : "#2400A8"};
    cores[3] = {nome : "GREEN", codigo : "#00A83B"};
    cores[4] = {nome : "RED", codigo : "#DD2924"};
    cores[5] = {nome : "PURPLE", codigo : "#5300A8"};
    cores[6] = {nome : "PINK", codigo : "#F0359A"};
    cores[7] = {nome : "WHITE", codigo : "#FFFFFF"};
    
    $(".txt-vidas").text("Lifes");
    $(".txt-pontos").text("Score");
    $(".btn-start").text("Start");
    $(".btn-help").text("How To Play");
    
    $(".modal-title").text("How To Play");
    $(".txt-help-1").text("To score, click the button that indicates the color in which the word is written.");
    $(".txt-help-2").text("Try to make as many points as you can. Good Luck!");
    $(".img-en").show();
    $(".img-pt").hide();
    
    msgAcertou = "Correct!"
    msgErrou = "Wrong!"
    msgFinal = "Game Over!\nScore: ";
};

function temporizador(tempo){
    ciclo = window.setInterval("subtrairVidas()", tempo * 1000);
}

function setaCor(numero){
    return cores[numero].codigo;
}

function setaTexto(numero){
    return cores[numero].nome;
}

var descobreCor = function() {
    for(i=0; i<cores.length; i++){
        if(cores[i].nome.toLowerCase() == $(this).text().toLowerCase()){
            if(i==7){
                return cores[0].codigo;
            }else{
                return cores[i].codigo;
            }
        }
    }
};

function mudaCor(){

    var aleatorioCorTexto = Math.floor((Math.random() * 100) % 8);

    var aleatorioTexto = aleatorioCorTexto;
    while(aleatorioTexto == aleatorioCorTexto){
        aleatorioTexto = Math.floor((Math.random() * 100) % 8);
    }

    corTexto = setaCor(aleatorioCorTexto);
    textoCorTexto = setaTexto(aleatorioCorTexto);

    textoPainel = setaTexto(aleatorioTexto);

    $(".texto-jogo").css({"color" : corTexto});
    $(".texto-jogo").text(textoPainel);

    var aleatorioControleTexto = Math.floor(Math.random() * 100)
    if(aleatorioControleTexto % 2 == 0){
        $(".btn-esquerda").text(textoCorTexto);
        if(textoCorTexto != textoPainel){
            $(".btn-direita").text(textoPainel);
        }
    }else{
        $(".btn-direita").text(textoCorTexto);
        if(textoCorTexto != textoPainel){
            $(".btn-esquerda").text(textoPainel);
        }
    }

}

function subtrairVidas(){
    window.clearInterval(ciclo);

    lifes -= 1;

    if(lifes > 0){
        $(".vidas").text(lifes);
        
        $(".errou-acertou").text(msgErrou).removeClass("acertou").addClass("errou");

        mudaCor();
        temporizador(2);
    }else{
        $(".errou-acertou").text(msgErrou).removeClass("acertou").addClass("errou");
        $(".vidas").text(lifes);
        
        alert(msgFinal+placar);
        resetGame();
    }

}

var contabilizaPontos = function(event){
    event.preventDefault();
    window.clearInterval(ciclo);

    if($(this).text() == textoCorTexto){
        placar = placar + 1;
        
        $(".errou-acertou").text(msgAcertou).removeClass("errou").addClass("acertou");
        
        $(".pontos").text(placar);
        mudaCor();
        temporizador(2);
    }else{
        subtrairVidas();
    }
};

var startGame = function(event){
    event.preventDefault();
    
    $(".vidas").text(lifes);
    $(".pontos").text(placar);

    mudaCor();
    //temporizador(2);

    $(this).hide();
    $(".btn-help").hide();
    $(".botoes-resposta").show();
    $(".pontuacao-erros").show();

    $(".vidas").text(vidas);
    $(".pontos").text(pontos);

    //$(".conteudo-pre-jogo").removeClass("conteudo-pre-jogo").addClass("conteudo-jogo");
    $(".conteudo-pre-jogo").css({"padding-top" : "6em"});
};

function resetGame(){
    window.clearInterval(ciclo);
    
    $(".errou-acertou").text("");

    placar = 0;
    lifes = 3;

    $(".btn-start").show();
    $(".btn-help").show();
    $(".botoes-resposta").hide();
    $(".pontuacao-erros").hide();

    //$(".conteudo-jogo").removeClass("conteudo-jogo").addClass("conteudo-pre-jogo");
    $(".conteudo-pre-jogo").css({"padding-top" : "8em"});
    $(".texto-jogo").text("WhatAColor?!");
}

var inicializar = function(){
    //setarIdiomaPortugues();
    setarIdiomaIngles();
    
    $(".btn-start").click(startGame);

    $(".btn-resposta").mousedown(contabilizaPontos);

    /*$(".btn-resposta").mouseup(function(){
        $(this).css({"background-color" : "black", "color" : "white"});
    });*/
    $(".btn-resposta").mouseover(function(){
        $(this).css({"color" : descobreCor});
    });
    $(".btn-resposta").mouseleave(function(){
        $(this).css({"color" : "#FFF"});
    });
    $(".btn-resposta").focusin(function(){
        $(this).css({"color" : descobreCor});
    });
    $(".btn-resposta").focusout(function(){
        $(this).css({"color" : "#FFF"});
    });
};

$(inicializar);