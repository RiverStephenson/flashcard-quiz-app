import NavBar from "../components/NavBar";
import React from 'react';
import RandomCard from '../components/RandomCard';

const Flashcards: React.FC = () => {
  return (
    <div>
      <NavBar />
      <RandomCard />
    </div>
  );
};

export default Flashcards;