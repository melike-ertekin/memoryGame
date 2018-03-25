restart();

//Click Events
$( ".restart" ).click(function() {

	restart();
});


$(".card").click(function() {

	$(this).toggleClass("open show");
});







//Functions
function restart(){

  	//Create a list that holds all of your cards.
 	var list = $('.card');
	var oldList = $('.card');


	list = shuffle(list);
	//console.log(list);

	$(".card").removeClass("open show match");
	//console.log($(".card").removeClass("open show match"));


	for (let i=0; i<list.length; i++) {
		//get old class
		let oldClass = oldList[i].children[0].classList[1] ;
		//console.log(oldClass);

		//get new class
		let newClass = list[i].children[0].classList[1];
		//console.log(newClass);

		//remove old class
		oldList[i].children[0].classList.remove(oldClass);
		//console.log(oldList[i].children[0].classList);

		//add new class
		oldList[i].children[0].classList.add(newClass);
		//console.log(oldList[i].children[0].classList);
	}

}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
