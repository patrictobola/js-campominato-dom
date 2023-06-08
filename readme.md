# Griglia campo minato

## HTML

- Comincio creando nell'html una casella select dove scegliere la difficolta
- Vicino ci metto un button
- Sotto, all'interno di un div contenitore, creo le 100 caselle richieste dall'esercizio

## CSS

- stilizzo una base css per le caselle
  - per ogni difficoltà cambio flex basis
- Creo subito una classe .clicked che colori la cella di azzurro e la testo per vedere se funziona
- Dopo aver testato tutto...
  - elimino dall'HTML le caselle

## JS

- Richiamo nel JS tutti gli elementi necessari dal DOM
- Creo una funzione che in base alle 'col' e 'row' mi crei le celle all'interno dell'HTML
  - Al suo interno ci metto..
    - La cella
    - Il numero della cella
- In base al value della difficoltà
  - **SE** la difficoltà è hard crea un 10x10
  - **SE** la difficoltà è medium crea un 9x9
  - **SE** la difficoltà è easy crea un 7x7
- Creo un evento di ascolto al click per fare in modo che mi appaia la classe precedentemente creata per rendere la casella azzurra.
