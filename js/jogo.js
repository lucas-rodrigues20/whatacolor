var corFundo;
var corTexto;
var textoPainel = "Texto";
var textoCorTexto;

var placar = 0;
var lifes = 3;

var ciclo;


var cores = [];

var setarIdiomaPortugues = function() {
    cores[0] = {nome : "PRETO", codigo : "#000000"};
    cores[1] = {nome : "AMARELO", codigo : "#FFFF00"};
    cores[2] = {nome : "AZUL", codigo : "#0000FF"};
    cores[3] = {nome : "VERDE", codigo : "#00FF00"};
    cores[4] = {nome : "VERMELHO", codigo : "#FF0000"};
    cores[5] = {nome : "ROXO", codigo : "#A020F0"};
    cores[6] = {nome : "ROSA", codigo : "#FF1493"};
    cores[7] = {nome : "BRANCO", codigo : "#FFFFFF"};
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
            return cores[i].codigo;
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
        
        $(".errou-acertou").text("errou!").removeClass("acertou").addClass("errou");

        mudaCor();
        temporizador(2);
    }else{
        $(".errou-acertou").text("errou!").removeClass("acertou").addClass("errou");
        $(".vidas").text(lifes);
        
        alert("Fim de jogo!\nPontuação Final: "+placar);
        resetGame();
    }

}

var contabilizaPontos = function(event){
    event.preventDefault();
    window.clearInterval(ciclo);

    if($(this).text() == textoCorTexto){
        placar = placar + 1;
        
        $(".errou-acertou").text("acertou!").removeClass("errou").addClass("acertou");
        
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
    temporizador(2);

    $(this).hide();
    $(".botoes-resposta").show();
    $(".pontuacao-erros").show();

    $(".vidas").text(vidas);
    $(".pontos").text(pontos);

    $(".conteudo-pre-jogo").removeClass("conteudo-pre-jogo").addClass("conteudo-jogo");
};

function resetGame(){
    window.clearInterval(ciclo);
    
    $(".errou-acertou").text("");

    placar = 0;
    lifes = 3;

    $(".btn-start").show();
    $(".botoes-resposta").hide();
    $(".pontuacao-erros").hide();

    $(".conteudo-jogo").removeClass("conteudo-jogo").addClass("conteudo-pre-jogo");
    $(".texto-jogo").text("WhatAColor?!");
}

var inicializar = function(){
    setarIdiomaPortugues();
    
    $(".btn-start").click(startGame);

    $(".btn-resposta").mousedown(contabilizaPontos);

    $(".btn-resposta").mouseup(function(){
        $(this).css({"background-color" : "black", "color" : "white"});
    });
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