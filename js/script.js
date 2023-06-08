console.log('JS OK')

// Recupero gli elementi necessari dal DOM 
const userChoice = document.getElementById('difficult')
const playButton = document.querySelector('button')
const cellContainer = document.getElementById('grid')
const scoreField = document.getElementById('score')

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


// Dichiaro il numero di bombe all'interno della griglia che a prescindere dalla difficoltà saranno sempre 16
let numberBombs = 16;

playButton.addEventListener('click', function(){
    // Al click pulisco il DOM (nel caso volessi rifare un'altra partita)
    cellContainer.innerHTML = ``
    
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

    // Creo il ciclo for che mi crea le caselle nel DOM 
    for (let i = 1; i <= cells; i++){
        // Creo la cella 
        const cell = createCell(difficult, i);

        // Al click abbiamo un evento che aggiunge classe e tiene conto del punteggio  
        cell.addEventListener('click', function(){
            if(!cell.classList.contains('clicked')){
            cell.classList.add('clicked')
                console.log(i)
                score++;
                scoreField.innerHTML = score;
            }
        });

        // Metto la cella all'interno del dom 
        cellContainer.appendChild(cell)
    }

})

