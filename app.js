let shuffle = function(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

let flapFlag = 0;
let cardsClassName = [];
let cards = document.querySelector('#cards');
let score = document.getElementById('score');
let nextCard = document.getElementById('next-card').childNodes[0];
let matchedCards = document.getElementsByClassName('show');
let allCards = document.getElementsByClassName('card');

function closeAllCards() {
  let cards = document.body.querySelectorAll('.card');
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('matched', 'show');
  }
  score.innerText = 0;
}

function restartF(){
  closeAllCards();
  cardsClassName = [];
  shuffleCards();
}

function shuffleCards(){
  // shuffle cards
  let iSet = document.getElementById('cards').querySelectorAll('i');
  for(let i=0; i< iSet.length; i++){
    cardsClassName.push(iSet[i].className);
  }
  shuffle(cardsClassName);
  // change deck name, shuffle
  for(let i=0; i< iSet.length; i++){
    iSet[i].className = cardsClassName[i];
  }
}

document.addEventListener('DOMContentLoaded', function() {
  closeAllCards();
  shuffleCards()
});

cards.addEventListener('click', function (e) {
  if(!e.target.classList.contains('show', 'open') && e.target.classList.contains('card') && flapFlag === 0) {
    score.innerText = parseInt(score.innerText) + 1;
    e.target.classList.add('show', 'open');
    class_name = e.target.querySelector('i').className;
    // console.log(class_name);
    if(nextCard.className === class_name){
      value = class_name;
      cardsClassName = cardsClassName.filter(function(item) {
        return item !== value;
      });
      nextCard.classList.remove(nextCard.className.split(' ')[1]);
      // random to pick a next icon
      try {
        nextCard.classList.add(cardsClassName[Math.floor(Math.random() * cardsClassName.length)].split(' ')[1]);
      }
      catch (error) {
        console.error(error);
      }
      finally {
        if (matchedCards.length === allCards.length) {
          alert("Congrats! Winner!");
          restartF();
          nextCard.classList.add('fa-anchor');
        }
      }
    } else {
      flapFlag = 1;
      setTimeout(function () {
        e.target.classList.remove('open', 'show');
        flapFlag = 0;
      }, 800);
    }
  }

});

// restart
let restart = document.querySelector('.restart');
restart.addEventListener('click', function(e){
  restartF();
});