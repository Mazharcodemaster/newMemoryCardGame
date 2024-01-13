'use client'
// sound/page.tsx

const playSound = () => {
  const audio = new Audio('/single click.wav');
  audio.play();
};

const MatchSound = () => {
  const audio = new Audio('/matched cart.wav');
  audio.play();
};

const WinGame = () => {
  const audio = new Audio('/win the game.wav');
  audio.play();
};

export  { playSound, MatchSound, WinGame };
