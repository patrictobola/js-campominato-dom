console.log('JS OK')

// Recupero gli elementi necessari dal DOM 
const userChoice = document.getElementById('difficult')
const playButton = document.querySelector('button')
const cellContainer = document.getElementById('grid')
const scoreField = document.getElementById('score')
const message = document.getElementById('message')

// Variabile che crea una casella con la classe cell 
const createCell = (a, b) => {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    /* Ho impostato la funzione in modo che ad ogni cella mi applichi una classe
       con nome 'a' che in questo caso sarà il valore della difficoltà scelta dall'utente.
       In CSS ho creato una classe hard-medium-easy che abbinata alla classe cell
       mi da le giuste dimensioni delle celle */
    cell.classList.add(a)
    cell.innerText = b;
    return cell
} 

// Creo una funzione che generi dei numeri casuali da 1 a max
const randomNumber = (max) => Math.floor(Math.random() * max) + 1;

// Creo una funzione che generi un numero X di bombe e le inserisca all'interno di un array per poterle successivamente riutilizzare 
const randomBombs = (numberBombs, cellsNumber) => {
    let bombs = [];
    while (bombs.length < numberBombs) {

        let bomb;
        do {
            bomb = randomNumber(cellsNumber);
        } while (bombs.includes(bomb));
        bombs.push(bomb)
    }
    return bombs;
}

// Creo una funziona che mi prenda tutte le celle
const endGame = (bombList) => {
    // Recupero tutte le celle create 
    const allCells = cellContainer.querySelectorAll('div');
    // Creo un ciclo for che mi mostri tutte le celle cliccate e quelle con le bombe
    for (let i = 0; i < allCells.length; i++){
        const singleCell = allCells[i];
        singleCell.classList.add('clicked');
        const cellNumber = parseInt(singleCell.innerText);
        if(bombList.includes(cellNumber)){
            singleCell.classList.add('bomb');
        }
    }
}

// Dichiaro il numero di bombe all'interno della griglia che a prescindere dalla difficoltà saranno sempre 16
let numberBombs = 16;

let generatedBombs = 0;
playButton.addEventListener('click', function(){
    // Al click pulisco il DOM (nel caso volessi rifare un'altra partita)
    cellContainer.innerHTML = ``
    scoreField.innerHTML = ``;
    message.innerHTML = ``;
    
    // Recupero il valore della difficoltà di gioco 
    const difficult = userChoice.value ;

    /* Creo una sorta di flag esterno al ciclo for per fare in modo che mi crei il numero di caselle richiesto 
    So che tecnicamente si poteva fare 'meglio' però alla fine è un gioco e come dice la traccia il numero di caselle sono fisse in base alla difficoltà, quindi non ho sentito il bisogno di calcolarle in base alla difficoltà ma le ho volutamente e forzatamente impostate perché in teoria non dovrebbero cambiare mai.
    */
    let cells = 0;
    if (difficult === "hard") cells = 100;
    if (difficult === "medium") cells = 81;
    if (difficult === "easy") cells = 49;

    let score = 0;

    // Aggiungo le bombe alla partita
    generatedBombs = randomBombs(numberBombs, cells);

    
    // Creo un flag per determinare se la partita è finita o meno 
    let isGameOver = false


    // Creo il ciclo for che mi crea le caselle nel DOM 
    for (let i = 1; i <= cells; i++){
        // Creo la cella 
        const cell = createCell(difficult, i);

        // Metto la cella all'interno del dom 
        cellContainer.appendChild(cell)

        // Al click abbiamo un evento che aggiunge classe e tiene conto del punteggio  
        cell.addEventListener('click', function(){

            // Se gameover è true fermiamo il gioco 
            if(isGameOver) {
                return
            }
                
            // Controllo se al click la cella non è già stata cliccata e in quel caso... 
            if(!cell.classList.contains('clicked')){
                cell.classList.add('clicked')
                scoreField.innerHTML = ++score;
                if (score === (cells - numberBombs)){
                    message.innerText = `Daje hai vinto!`;
                }
            }
            // Creo un ciclo for che controlla l'array con le bombe e mi controlla se al click ho preso una bomba o meno
            for(let i = 0; i < generatedBombs.length - 1; i++){
                if(parseInt(cell.innerText) === generatedBombs[i]){
                    cell.classList.add('bomb')
                    message.innerText = `Beccato una bomba! Hai perso nabbo!`;
                    isGameOver = true;
                    endGame(generatedBombs);
                }
            }
        });
    }
})
