import Card from './card/page'

const Home = () => {
  
  const initialImages = [
    { src: "/bootstrap.jpg", id: 6 },
    { src: "/c++.png", id: 7 },
    { src: "/css.jpg", id: 8 },
    { src: "/html.png", id: 9 },
    { src: "/js.png", id: 10 },
    { src: "/next.png", id: 11 },
    { src: "/paython.jpg", id: 12 },
    { src: "/react.png", id: 13 },
    { src: "/tailwind.jpg", id: 14 },
    { src: "/java.png", id: 15 },
  ];

  return (
    <>
      <div>
        
        <Card images={initialImages} />
      </div>
    </>
  );
};

export default Home;