'use client'
// components/Card.tsx
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { playSound,MatchSound,WinGame } from "../sound/page";


interface ImageType {
  src: string;
  id: number;
}

interface CardProps {
  images: ImageType[];
}

const Card: React.FC<CardProps> = ({ images }) => {
  const [inImages, setInImages] = useState<ImageType[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchCard, setMatchCard] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);


  const ResetGame = () => {
    const shuffleImages = [...images, ...images].sort(() => Math.random() - 0.5);
    setInImages(shuffleImages);
    setSelectedCards([]);
    setMatchCard([]);
    setScore(0);
  };


  const SelectCard = (index: number) => {
    playSound()
    if (selectedCards.length < 2) {
      setSelectedCards(prevSelected => [...prevSelected, index]);

      if (selectedCards.length === 1) {
        const [firstCardIndex, secondCardIndex] = [selectedCards[0], index];
        const [firstCard, secondCard] = [inImages[firstCardIndex], inImages[secondCardIndex]];

        if (firstCard && secondCard && firstCard.src === secondCard.src) {
          setMatchCard(prevMatch => [...prevMatch, firstCardIndex, secondCardIndex]);
          setScore(prevScore => prevScore + 1);
          MatchSound()
          setSelectedCards([]);
        } else {
          setTimeout(() => {
            setSelectedCards([]);
          }, 1000);
        }
      }
    } else {
      setSelectedCards([]);
    }
  };

  useEffect(() => {
    if (matchCard.length === 20) {
      toast.success('Congratulations! You have won the game!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      WinGame()
      ResetGame();
    }
  }, [matchCard]);

  useEffect(() => {
    ResetGame();
  }, []);

  return (
    <div className='text-center w-screen h-screen bg-blue-300 overflow-x-hidden'>
      <h1 className='text-white font-bold text-3xl mt-8'>Memory Card Game</h1>
      <button
        onClick={ResetGame}
        className="mx-auto mt-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        New Game
      </button>
      <h1 className='text-white font-bold'>Score: {score}</h1>
      <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {inImages.map((image: ImageType, index: number) => (
            <div key={index} className={`relative w-32 h-32 cursor-pointer`}>
              {selectedCards.includes(index) || matchCard.includes(index) ? (
                <img
                  alt={`card-${index}`}
                  className={`absolute top-0 left-0 w-full h-full rounded-lg`}
                  src={image.src}
                />
              ) : (
                <div
                  onClick={() => SelectCard(index)}
                  className='absolute left-0 w-32 h-32 bg-gray-900 flex justify-center items-center'
                >
                  {/* Here you can customize the appearance of the back card */}
                  {/* <img className='h-32 rounded-lg' src="/backcard.png" alt="Memory Card Back" /> */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
