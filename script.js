//testar visibilidade das paginas
document.getElementById("endgamepage").hidden = true
document.getElementById("ingamepage").hidden = true


//fim teste visibilidade

//variaveis globais
let numberOfPieces, typeOfPieces, allPieces, firstPiece, secondPiece, firstPieceId, secondPieceId, temporaryElement
let rgbX, rgbY, rgbZ, rgb
let score = 0
let moves = 0
let inGamePieces = []
let boardGame = []
let switchOne = false
let switchTwo = false
let fruits = ["apple", "banana", "cherry", "mango", "orange", "avocado", "peach", "plum", "blueberry", "strawberry", "grape", "lemon", "lime", "kiwi", "pineapple"]
let colors = []

//fim variavais globais

//funcoes
function playGame(){
//esconder pagina inicial e exibir pagina de joigo, receber inputs, gerar pecas e depois gerar board
document.getElementById("restart").hidden = false
document.getElementById("moves").hidden = false
document.getElementById("firstpage").hidden = true;
document.getElementById("ingamepage").hidden = false;
getInputs()
}
function getInputs(){
	numberOfPieces = document.getElementById("numberOfPieces").value/2
	typeOfPieces = document.getElementById("typeOfPieces").value
  if (typeOfPieces == "fruits"){
  	allPieces = fruits
    return generatePieces()
  }else {
  	generateColors()
    return generateBoard()
  }
}
function generatePieces(){
//gerar pecas a partir do input
	shufflePieces(allPieces)//embaralhar todas pecas
	for (i = 0 ; i < numberOfPieces ; i++){
  inGamePieces.push(allPieces[i] , allPieces[i])
  }
  shufflePieces(inGamePieces)//embaralhar pecas do jogo
	return generateBoard()
}
function shufflePieces(arr){
//misturar as pecas em uma arr
	for (i = 0 ; i < arr.length -1 ; i++){
  let tempPiece = arr[i]
  let newPosition = Math.floor(Math.random()*arr.length)
  arr[i] = arr[newPosition]
  arr[newPosition] = tempPiece
  }
}
function generateBoard(){
//gerar o tabuleiro
	for (i = 0 ; i < inGamePieces.length ; i++){
  boardGame += `<div id="piece${i}" class="piece" data-value="${inGamePieces[i]}" onclick="clickOnPiece(${i})" onmouseover="onMouseOver(this)" onmouseout="onMouseOut(this)" was-it-clicked="false"></div>`
  }
  document.getElementById("boardgame").innerHTML = boardGame
}
function clickOnPiece(elem){
temporaryElement = document.getElementById("piece"+elem)
if (temporaryElement.getAttribute("was-it-clicked") == "false"){//ve se o item foi clicado
	if (switchOne == false){
   	firstPiece = temporaryElement.getAttribute("data-value")
    firstPieceId = temporaryElement.getAttribute("id")
    temporaryElement.setAttribute("was-it-clicked","true")//ativa um swith para evitar evento de clique ou mouseout
    if (typeOfPieces == "fruits"){
    temporaryElement.innerHTML = firstPiece
    temporaryElement.className = "selectedpiece"
    } else if (typeOfPieces == "colors"){
    temporaryElement.style.backgroundColor = firstPiece
   }
    switchOne = true
  } else if (switchTwo == false){
		secondPiece = temporaryElement.getAttribute("data-value")
    secondPieceId = temporaryElement.getAttribute("id")
    if (typeOfPieces == "fruits"){
    temporaryElement.innerHTML = secondPiece
    } else if (typeOfPieces == "colors"){
    temporaryElement.style.backgroundColor = secondPiece
    }
    temporaryElement.setAttribute("was-it-clicked","true")
    temporaryElement.className = "selectedpiece"
    switchTwo = true
    setTimeout(() => {
    result(firstPiece, firstPieceId, secondPiece, secondPieceId)}, 1000);
    
  }

//le se e a primeira peca ou segunda peca clicada
//firstPiece = inGamePieces[i]
//document.getElementById(`piece${elem}`).innerHTML = "cliquedpiece"
}
}

function result(first, firstId, second, secondId){
	moves++
  document.getElementById("moves").innerHTML = "Number of Moves: "+moves
	switchOne = false
  switchTwo = false
	if (first == second){
  	score++
    if (score == numberOfPieces){
    endGame()
    }
  } else {
    document.getElementById(firstId).style.backgroundColor = ""
    document.getElementById(secondId).style.backgroundColor = ""
  	document.getElementById(firstId).setAttribute("class","piece")
    document.getElementById(firstId).setAttribute("was-it-clicked","false")
    document.getElementById(firstId).innerHTML = ""
    document.getElementById(secondId).className = "piece"
    document.getElementById(secondId).setAttribute("was-it-clicked","false")
    document.getElementById(secondId).innerHTML = ""
    
  }
//comparar pecas e ver se acertou ou errou 
}
function endGame(){
document.getElementById("endgamepage").hidden = false
document.getElementById("ingamepage").hidden = true
document.getElementById("firstpage").hidden = true
}
function newGame(){
document.getElementById("restart").hidden = true
document.getElementById("moves").hidden = true
document.getElementById("endgamepage").hidden = true
document.getElementById("ingamepage").hidden = true
document.getElementById("firstpage").hidden = false
document.getElementById("lastscore").innerHTML = "Last Score: "+moves
score = 0
moves = 0
document.getElementById("moves").innerHTML = "Number of Moves : "+moves
inGamePieces = []
boardGame = []
switchOne = false
switchTwo = false
}
function onMouseOver(elem){
	if (elem.getAttribute("was-it-clicked")=="false"){
	elem.className = "onmouseover"
  }
}
function onMouseOut(elem){
	if (elem.getAttribute("was-it-clicked")=="false"){
	elem.className = "piece"
  }
}
function generateColors(){
	for (i = 0; i < numberOfPieces ; i++){
    rgbX = Math.floor(Math.random()*250)
    rgbY = Math.floor(Math.random()*250)
    rgbZ = Math.floor(Math.random()*250)
    rgb = `rgb(${rgbX},${rgbY},${rgbZ})`
  	inGamePieces.push(rgb,rgb)
  }
  shufflePieces(inGamePieces)
}
