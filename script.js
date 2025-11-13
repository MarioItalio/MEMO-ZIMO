const items = [
  { id: 1, image: 'swieczki.jpg', text: 'Hit Turnusu! Aromatyczne DIY: Stwórz Swoją Świecę – razem z Firmą JussiCandles wykonamy świece.' },
  { id: 2, image: 'bryloczki.jpg', text: 'Projekt „Shrinky Dinks” – wspólnie stworzymy breloczki z folii termokurczliwej.' },
  { id: 3, image: 'azurowe.jpg', text: 'Odkryj Magię Zimy w Detalu – warsztaty Ażurowych Gwiazd – Frozen Edition!' },
  { id: 4, image: 'drewno.jpg', text: 'Zimowe Mini-Arcydzieła – malujemy na plastrach drewna.' },
  { id: 5, image: 'kino.jpg', text: 'Magia Zimowego Kina – Smak Popcornu, Zapach Czekolady. Seans filmowy.' },
  { id: 6, image: 'hotel.jpg', text: 'Ośrodek AMW REWITA – Waplewo k. Olsztyna.' }
];

const startForm = document.getElementById('startForm');
const screen1 = document.getElementById('screen1');
const gameScreen = document.getElementById('gameScreen');
const board = document.getElementById('board');
const finalScreen = document.getElementById('finalScreen');
const playerInfo = document.getElementById('playerInfo');
const movesCount = document.getElementById('movesCount');
const finalText = document.getElementById('finalText');
const playAgain = document.getElementById('playAgain');

let cards = [];
let flipped = [];
let matchedPairs = 0;
let moves = 0;

// start gry
startForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('playerName').value.trim();
  const school = document.getElementById('playerSchool').value.trim();

  playerInfo.textContent = `${name} — ${school}`;
  screen1.classList.remove('active');
  gameScreen.classList.remove('hidden');
  gameScreen.classList.add('active');

  startGame();
});

playAgain.addEventListener('click', () => location.reload());

function startGame() {
  moves = 0;
  matchedPairs = 0;
  flipped = [];
  board.innerHTML = '';

  // tworzymy pary (obraz + opis)
  cards = [];
  items.forEach(i => {
    cards.push({ id: i.id, type: 'image', content: i.image });
    cards.push({ id: i.id, type: 'text', content: i.text });
  });

  shuffle(cards);

  cards.forEach(card => {
    const el = document.createElement('div');
    el.classList.add('card');
    el.dataset.id = card.id;
    el.dataset.type = card.type;

    const front = document.createElement('div');
    front.classList.add('front');
    front.textContent = '?';

    const back = document.createElement('div');
    back.classList.add('back');
    if (card.type === 'image') {
      const img = document.createElement('img');
      img.src = `images/${card.content}`;
      back.appendChild(img);
    } else {
      back.textContent = card.content;
    }

    el.appendChild(front);
    el.appendChild(back);

    el.addEventListener('click', () => flipCard(el));
    board.appendChild(el);
  });
}

function flipCard(card) {
  if (flipped.length === 2 || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  flipped.push(card);

  if (flipped.length === 2) {
    moves++;
    movesCount.textContent = `Ruchy: ${moves}`;
    checkMatch();
  }
}

function checkMatch() {
  const [first, second] = flipped;
  if (first.dataset.id === second.dataset.id && first.dataset.type !== second.dataset.type) {
    first.style.visibility = 'hidden';
    second.style.visibility = 'hidden';
    matchedPairs++;
    flipped = [];
    if (matchedPairs === items.length) showEnd();
  } else {
    setTimeout(() => {
      first.classList.remove('flipped');
      second.classList.remove('flipped');
      flipped = [];
    }, 800);
  }
}

function showEnd() {
  gameScreen.classList.add('hidden');
  finalScreen.classList.remove('hidden');
  const name = document.getElementById('playerName').value.trim();
  finalText.textContent = `Brawo ${name}! Udało Ci się dopasować wszystkie pary.`;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
