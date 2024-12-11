import NavBar from '../components/NavBar/Navbar';
import React from 'react';
import RandomCard from '../components/RandomCard/RandomCard';

const Flashcards: React.FC = () => {
  return (
    <div>
      <NavBar></NavBar>
      <RandomCard />
    </div>
  );
};

export default Flashcards;