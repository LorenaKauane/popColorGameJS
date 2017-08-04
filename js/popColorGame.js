/*
*	Desenvolvido por: Lorena Kauane
*/

$(document).ready(function() {
	$('.btn').attr('disabled',true); //Desabilitando os botões
});
var nivel = 1; 					// Sempre vai começar no selecione.
 		
nomeCores = new Array();
nomeCores[1] = "Vermelho";
nomeCores[2] = "Verde";
nomeCores[3] = "Azul";			// Opções de cores 
nomeCores[4] = "Rosa";
nomeCores[5] = "Laranja";
nomeCores[6] = "Preto";

var primeiroBloco;
var segundoBloco;				// Para validação de blocos 
var terceiroBloco;

n = new Array();  
n[0] = "Selecione";
n[1] = "Fácil";					// Opções de dificuldades
n[2] = "Intermediario";
n[3] = "Difícil";

partidas = 1;    				// Número de partida inicial
erro =0;

limite = new Array();   		// Máximo de tentativas até acertar a combinação:
limite[1] = 10;         		// 10 chances no nível fácil
limite[2] = 12;         		// 12 chances no nível médio
limite[3] = 14;         		// 14 chances no nível difícil


gerarNumerosAleatorios();

function gerarNumerosAleatorios(){
	indice = (nivel * 1)+ 3;  									// Atribui 4 cores para o nível 1, 5 cores para o 2 e 6 para o nível 3
	
	valorPrimeiroBloco = Math.floor(Math.random() * indice+1); // FORMULA
	valorSegundoBloco = Math.floor(Math.random() * indice+1);
	valorTerceiroBloco =Math.floor(Math.random() * indice+1); 
	valorQuartoBloco = Math.floor(Math.random() * indice+1);;
	console.log(valorPrimeiroBloco);
	console.log(valorSegundoBloco);
	console.log(valorTerceiroBloco);
	console.log(valorQuartoBloco);
}

function validaNivelAlteraCampos(){
	nivel = document.jogo.nivel.value;

	$(".bloco").empty();									//'Limpando' as options

	if(nivel==0){
		$('.bloco').append('<option > - Selecione o nivel de dificuldade!</option>');
		$('.btn').attr('disabled',true); 					//Desabilitando o botão

		alert("Selecione um nivel de dificuldade!");

	}else{
		$('.btn').attr('disabled',false);					//Habilitando os botões
		alert("O nível foi alterado para " + n[nivel]);
		geraOptions(5);
	}

	if(nivel == 2 ){geraOptions(6);}
	if(nivel == 3){geraOptions(7);}

	gerarNumerosAleatorios();
	document.getElementById("status").innerHTML = ""; 		//Limpando o status
	return true;
}

function jogar(){
	erro = 0; 												//Sempre zerando os erros
	if(validaBlocos()){
		validaJogadas();
	}
}

function  validaBlocos(){
	primeiroBloco =document.getElementById("bloco1");
	primeiroBloco = primeiroBloco.options[primeiroBloco.selectedIndex].value;
																						/* Capturando os Valores dos selects*/
	segundoBloco = document.getElementById("bloco2");
	segundoBloco = segundoBloco.options[segundoBloco.selectedIndex].value;

	terceiroBloco = document.getElementById("bloco3");
	terceiroBloco = terceiroBloco.options[terceiroBloco.selectedIndex].value;

	quartoBloco = document.getElementById("bloco4");
	quartoBloco = quartoBloco.options[quartoBloco.selectedIndex].value;

	if     (primeiroBloco == '-'){alert('Escolha uma cor no primeiro bloco'); return false;}	  
	else if(segundoBloco == '-'){alert('Escolha uma cor no segundo bloco'); return false;}
	else if(terceiroBloco == '-'){alert('Escolha uma cor no terceiro bloco'); return false;} /* Validando se tem algum bloco 'vazio'*/
	else if(quartoBloco == '-'){alert('Escolha uma cor no quarto bloco'); return false;}
	return true;
}

function validaJogadas(){
	
	if(primeiroBloco != valorPrimeiroBloco){erro++;}
	if(segundoBloco  != valorSegundoBloco){erro++;}			// Validando se o bloco escolhido pelo usuario e o mesmo que do PC
	if(terceiroBloco != valorTerceiroBloco){erro++;}
	if(quartoBloco   != valorQuartoBloco){erro++;}

	document.getElementById("status").innerHTML += 
	"<b>Cores selecionadas:</b> "+nomeCores[primeiroBloco]+" - "+nomeCores[segundoBloco]+ 
	" - "+nomeCores[terceiroBloco]+" - "+nomeCores[quartoBloco]+
	"&nbsp;&nbsp;&nbsp;&nbsp;";

	chancesResta = limite[nivel] - partidas;

		// CASO 1: Se não errou nenhum bloco em qualquer partida, exceto a primeira:
		if (erro == 0 && partidas != 1) {
			document.getElementById("status").innerHTML += "<i>Acertou em " + partidas + " partidas! Boaaa!</i>";
			alert("Parabéns! Vamos de novo!");
			document.getElementById("status").innerHTML = "";
		}

    // CASO 2: Se não errou nenhum bloco na primeira 1, então acertou com exatamente uma partida!
    else if (erro == 0 && partidas == 1) {          
    	document.getElementById("status").innerHTML += "<i>Acertou em apenas 1 partida!\nQue sorte!</i>";
    }

    // CASO 3: Apenas 1 bloco errado. Escrever no singular.
    else if (erro == 1) {
    	document.getElementById("status").innerHTML += "1 erro. Chances: " + chancesResta + "<br /><br />";
    }

    // CASO 4: Mais de um bloco errado. Escrever no plural.
    else {
    	document.getElementById("status").innerHTML += erro + " erros. Chances: " + chancesResta + "<br /><br />";
    }

   	// CASO 5: Quando ele perde todas as jogadas
   	if (partidas == limite[nivel]) {  
   		alert("Suas tentativas se esgotaram =( . Game over!");
      	document.getElementById("status").innerHTML = "";
      	SequenciaCorreta();   // Mostra qual era a resposta correta
      	return novoJogo();
  	}

	document.getElementById("status").innerHTML += "<hr>";
	partidas++;   					// Ainda não acertou, assim soma o número de partidas jogadas
}

function SequenciaCorreta(){
	document.getElementById("status").innerHTML += "Sequencia correta:<b> "+nomeCores[valorPrimeiroBloco]+ 
	" - "+nomeCores[valorSegundoBloco]+" - "+nomeCores[valorTerceiroBloco]+" - "+nomeCores[valorQuartoBloco]+"</b>";
}

function geraOptions(indiceParada){
	$(".bloco").empty();
	$('.bloco').append('<option value="-"> - Selecione uma cor!</option>');

	for(i = 1; i < indiceParada ; i++){
		//Gerando as options
		$('.bloco').append($('<option >', {
			addClass: 'class'+i,
			value: i,
			text: nomeCores[i]
		}));     		
	}
}

function novoJogo(){
	alert("Novo jogo! Vamos lá, boa sorte.");
	partidas = 1;    				// Número de partida inicial
   	erro =     0;				
   	gerarNumerosAleatorios();
   	validaNivelAlteraCampos();
}

function desistir() {
    confirma = window.confirm("Tem certeza?");
    if (confirma) {
    	SequenciaCorreta();   		
    	novoJogo();
    }
    else {
      return false;
    }
}