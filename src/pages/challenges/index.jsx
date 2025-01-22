import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RecieveChallenges from './pages/recieveChallenges';
import AllChallenges from './pages/challenges';

const Challenges = () => {
  return (
    <Routes>
      <Route path='/' element={<AllChallenges />} />
      <Route path='/recieve-challenges' element={<RecieveChallenges />} />
    </Routes>
  );
};

export default Challenges;
