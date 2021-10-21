const selectDifficolta = document.getElementById("select-difficolta");
const btnStart = document.getElementById("btn-start");
const boxContainer = document.getElementById("box-container");

let bomba = [];

btnStart.addEventListener("click", function () {

  const level = selectDifficolta.value;

  const totCell = getCellNum(level);

  generateGrid(totCell);

  bomba = generaNumeriBombe(16, totCell);

  console.log("l'utente ha scelto il livello", level);
  console.log(`dovranno essere create ${totCell} celle.`);
});



// Fuction che dal Livello sceglie il numero di celle
function getCellNum(level) {
  let risultato;

  switch (parseInt(level)) {
    case 1:
      risultato = 100;
      break;

    case 2:
      risultato = 81;
      break;

    case 3:
      risultato = 49;
      break;

  }
  return risultato;
};



// Function che crea la griglia
function generateGrid(cellsNumber) {

  boxContainer.innerHTML = "";

  const perRowCells = Math.sqrt(cellsNumber);
  const cellSize = 100 / perRowCells;

  for (let i = 0; i < cellsNumber; i++) {

    const cell = document.createElement("div");
    cell.classList.add("box");
    cell.style.width = cellSize + "%";
    cell.style.height = cellSize + "%";
    cell.addEventListener("click", onSingleCellClick);


    boxContainer.append(cell);
    cell.textContent = i + 1;
  }

};



// Function per colorare cella al click (blu o rosso)
function onSingleCellClick() {

  const numCellaCorrente = parseInt(this.textContent);

  console.log("clickata cella #" + numCellaCorrente);

  if (bomba.includes(numCellaCorrente)) {
    this.classList.add("_bomba");
    alert(`Hai perso!`)
    window.location.reload()

  } else {
    this.classList.add("_click-blue");
  }
};



// Function con array di 16 numeri
function generaNumeriBombe(numBombe, numMaxRandom) {

  let arrayBombe = [];

  arrayBombe = generaBombeWhile(numMaxRandom, numBombe);

  console.log(orderArray(arrayBombe), arrayBombe.length);

  return arrayBombe
}


// Function
function orderArray(array) {

  const arrayOrdinato = array.sort((a, b) => a - b);

  return arrayOrdinato;
}



// Function per generare bomba
function generaBombeWhile(numCells, numBombe) {
  const arrayBombe = [];
  let i = 0;


  while (arrayBombe.length < numBombe) {

    const nuovaBomba = generateRandomNum(1, numCells);

    let numeroEsiste = arrayBombe.includes(nuovaBomba);

    if (!numeroEsiste) {
      arrayBombe.push(nuovaBomba);
    } else {

    }

    i++;
  }

  return arrayBombe;
}


// Function numero random
function generateRandomNum(minNumber = 1, maxNumber = 10) {
  const numRandom = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);

  return numRandom;
}