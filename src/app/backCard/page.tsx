// components/BackCard.tsx
import React from 'react';

const BackCard: React.FC = () => {
  return (
    <div className='absolute left-0 w-32 h-32 bg-red-600 flex justify-center items-center'>
      {/* You can uncomment this line if you want to use an image */}
      {/* <img className='h-32 rounded-lg' src="/backcard.png" alt="Memory Card Back" /> */}
    </div>
  );
}

export default BackCard;
