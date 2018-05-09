var second = 0, minute = 0, hour = 0;
var timer = document.querySelector(".timer");
var interval;
var star;

//Functions
// Start Timer
function startTimer(){
    interval = setInterval(function(){
    	if (hour<10 && minute<10 && second<10) {
    		timer.innerHTML = "0"+hour+ " : "+"0"+minute+" : 0"+second;
    	}
    	else if (hour<10 && minute<10 && second>10) {
       		timer.innerHTML = "0"+hour+" : 0"+minute+" : "+second;
    	}
    	else if (hour<10 && minute>10 && second<10) {
       		timer.innerHTML = "0"+hour+" : "+minute+" : 0"+second;
    	}
    	else if (hour<10 && minute>10 && second>10) {
       		timer.innerHTML = "0"+hour+" : "+minute+" : "+second;
    	}
    	else if (hour>10 && minute<10 && second<10) {
       		timer.innerHTML = hour+" : 0"+minute+" : 0"+second;
    	}
    	else if (hour>10 && minute<10 && second>10) {
       		timer.innerHTML = hour+" : 0"+minute+" : "+second;
    	}
    	else if (hour>10 && minute>10 && second<10) {
       		timer.innerHTML = hour+" : "+minute+" : 0"+second;
    	}
		else if (second>10 && minute>10 && hour>10) {
    		timer.innerHTML = hour+ " : "+minute+" : "+second;
    	}

        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    },1000);
}

//Stop Timer
function stopTimer() {
	second = 0, minute = 0, hour = 0;
	timer.innerHTML = "00 : 00 : 00";
	clearInterval(interval);
}

//Freeze Time
function freezeTimer() {

	let time = $('.timer').text();
	console.log(time);
	$('.modal-timer').text(time);
	$('.timer').text(time);
	clearInterval(interval);
}

//Reset Stars
function resetStar() {
	$('.star1').removeClass('fa-star-o');
	$('.star2').removeClass('fa-star-o');
	$('.star3').removeClass('fa-star-o');
}

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

//Start and Restart - game starts here
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

//Check cards to find match
function checkMatch(callback) {
	var openCards = $('.open');

	if(openCards.length === 2) {
		var card1 = openCards[0].children[0].classList.value;
		var card2 = openCards[1].children[0].classList.value;

		if(card1 === card2){
			openCards[0].classList.add('match');
			openCards[1].classList.add('match');

			openCards[0].classList.remove('open');
			openCards[0].classList.remove('show');
			openCards[1].classList.remove('open');
			openCards[1].classList.remove('show');

			var openCards = $('.match');
			callback();
			if(openCards.length===16){
				$('.modal-star').text(star);
				freezeTimer();

				$('#theEndModel').modal('show');
			}
		}
		else {

			$(openCards[0]).addClass('animated bounce wrong');
			$(openCards[1]).addClass('animated bounce wrong');

			setTimeout(function(){
				$(openCards[0]).removeClass('open show wrong');
				$(openCards[1]).removeClass('open show wrong');
				callback();
    		},1100);
		}
	}


}

var moves = 0;
function checkStar(){
if(moves<16){
		star = 3;
	}
	else if(moves<32){
		star = 2;
		$('.star1').addClass('fa-star-o');
	}
	else {
		star = 1;
		$('.star2').addClass('fa-star-o');
	}

}

function checkMoveOrMoves(){
	if(moves < 2) {
		$('.moves').text(moves+" Move");
	}
	else{
		$('.moves').text(moves+" Moves");
	}
}

//game starts when document is ready
$( document ).ready(function() {
	restart();
	startTimer();
});


//Click Events
var counter = 0;
$('.card').click(function() {

	checkStar();

	if(!$(this).hasClass('match') && !$(this).hasClass('disabled') ){
		if (counter<2) {
			$(this).toggleClass('open show');
			counter++;
			moves++;
		}

		checkMoveOrMoves();

		if (counter === 2) {
			$('.card').addClass('disabled');
			checkMatch(function () {
				console.log("callback");
    			$('.card').removeClass('disabled');
			});
		counter = 0;
		}
	}

});


$('.restart').click(function() {
	resetStar();
	moves = 0;

	checkMoveOrMoves();

	stopTimer();
	startTimer();
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
