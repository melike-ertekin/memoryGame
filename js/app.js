//Functions

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
 * Display the cards on the page
 *   - shuffle the list of cards using the provided 'shuffle' method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function restart() {
	var cardList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf",
	"fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb","fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];
	var htmlList = $('li.card');

	var shuffledList =  shuffle(cardList);


	$('.card').removeClass('open show match');

	for (let i=0; i<shuffledList.length; i++) {
		//get old class
		let oldClass = htmlList[i].children[0].classList[1] ;

		//get new class
		let newClass = shuffledList[i];

		//remove old class
		htmlList[i].children[0].classList.remove(oldClass);

		//add new class
		htmlList[i].children[0].classList.add(newClass);
	}
}


function checkMatch() {
	var openCards = $('.open');

	if(openCards.length === 2) {
		var card1 = openCards[0].children[0].classList.value;
		var card2 = openCards[1].children[0].classList.value;

		if (card1 === card2){
			openCards[0].classList.add('match');
			openCards[1].classList.add('match');

			openCards[0].classList.remove('open');
			openCards[0].classList.remove('show');
			openCards[1].classList.remove('open');
			openCards[1].classList.remove('show');
		}
	}
}

//game starts
$( document ).ready(function() {
	restart();
});


//Click Events
var moves=0;
var counter=0;
$('.card').click(function() {
	if(!$(this).hasClass('match')){
		if (counter<2) {
			$(this).toggleClass('open show');
			counter++;
			moves++;
			$('.moves').text(moves);
		}
		else {
			counter=1;
			$('.card').removeClass('open show');
			$(this).toggleClass('open show');
			moves++;
			$('.moves').text(moves);
		}


		if (counter===2) {
			checkMatch();
		}
	}
});


$('.restart').click(function() {
	moves=0;
	$('.moves').text(moves);
	restart();

});



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of 'open' cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
