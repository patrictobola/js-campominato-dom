console.log('JS OK')

// Recupero gli elementi necessari dal DOM 
const userChoice = document.getElementById('difficult')
const playButton = document.querySelector('button')
const cellContainer = document.getElementById('gameElement')


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


    // Creo il ciclo for che mi crea le caselle nel DOM 
    for (let i = 1; i <= cells; i++){
        // Creo la cella 
        const cell = createCell(difficult, i);

        // Al click abbiamo un toggle che mi aggiunge la classe toggle 
        cell.addEventListener('click', function(){
            cell.classList.toggle('clicked')
            console.log(i)
        });

        // Metto la cella all'interno del dom 
        cellContainer.appendChild(cell)
    }

})

