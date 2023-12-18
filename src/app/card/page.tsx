'use client'
// Import statements
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Card: React.FC<{ images: any }> = ({ images }) => {
  // State variables
  const [inImages, setInImages]: any = useState([]);
  const [selectedCards, setSelectedCards]: any = useState([]);
  const [matchCard, setMatchCard]: any = useState([]);
  const [score, setScore]: any = useState(0);

  // Reset the game state with a delay
  const ResetGame = () => {
    const shuffleImages = [...images, ...images].sort(() => Math.random() - 0.5);
    setInImages(shuffleImages);
    setSelectedCards([]);
    setMatchCard([]);
    setScore(0);
  };

  // Handle card selection
  const SelectCard = (index: any) => {
    if (selectedCards.length < 2) {
      setSelectedCards([...selectedCards, index]);

      if (selectedCards.length === 1) {
        const firstCardIndex = selectedCards[0];
        const secondCardIndex = index;

        const firstCard = inImages[firstCardIndex];
        const secondCard = inImages[secondCardIndex];

        if (firstCard && secondCard && firstCard.src === secondCard.src) {
          // If cards match, keep them visible
          setMatchCard([...matchCard, firstCardIndex, secondCardIndex]);
          setScore(score + 1);
          setSelectedCards([]);
        } else {
          // If cards do not match, hide them after a delay
          setTimeout(() => {
            setSelectedCards([]);
          }, 1000); // You can adjust the delay (in milliseconds) as needed
        }
      }
    } else {
      setSelectedCards([]);
    }
  };
  // if you completed game
  useEffect(() => {
    if (matchCard.length === 20) {
      toast.success('Congratulations! You have won the game!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000, // Adjust the duration of the toast message
      });
      ResetGame()
    }
  }, [matchCard]);

  // Initialize the game on mount
  useEffect(() => {
    ResetGame();
  }, []);

  return (
    <>
      <div className='text-center w-screen h-screen bg-blue-300 overflow-x-hidden'>
        <h1 className='text-white font-bold text-3xl mt-8'>Memory Card Game</h1>
        <button
          onClick={ResetGame}
          className="mx-auto mt-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          New Game
        </button>
        <h1 className='text-white font-bold'>Score:{score}</h1>
        {/* image div */}
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {/* Map front and back cards */}
            {inImages.map((image: any, index: any) => (
              <div key={index} className={`relative w-32 h-32 cursor-pointer`}>
                {/* Conditionally render front or back card */}
                {selectedCards.includes(index) || matchCard.includes(index) ? (
                  // Render front card
                  <img
                    alt={`card-${index}`}
                    className={`absolute top-0 left-0 w-full h-full rounded-lg`}
                    src={image.src}
                  />
                ) : (
                  // Render back card
                  <div
                    onClick={() => SelectCard(index)}
                    className='absolute left-0 w-32 h-32 bg-gray-900 flex justify-center items-center'
                  >
                    {/* Customize the appearance of the back card here */}
                    {/* <img className='h-32 rounded-lg' src="/backcard.png" alt="Memory Card Back" /> */}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
