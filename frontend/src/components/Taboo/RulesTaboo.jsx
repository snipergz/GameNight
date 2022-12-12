import React from 'react'
import { Link } from 'react-router-dom';

const Rules = () => {
  return (
    <section className='container mx-auto p-4 h-auto max-w-full md:mt-20'>
        <div className='text-white mx-auto max-w-[1240px] relative'>
            <h1 className=' text-center text-3xl lg:text-4xl mb-4'>More in depth Rules:</h1>
            <p className='text-xl lg:text-2xl'>
                The objective of Taboo is for your team to score the most points after all rounds are completed. Players are divided into two teams. Each Team alternates as the active team for the round and will have one member act as the clue giver who will read the word given to them and must use words to successfully have their team guess the word. Each word has a set of taboo words associated that cannot be said in any form or variation. The active team can guess as often as they want within the time limit alloted. When a word is successfully guessed the clue giver will be given a new word and this process will repeat until the time for the round runs out. The clue giver can at any time discard a word and be given a new one. At any point in a round, the opposing team acts as moderators for the active team's clue giver. Should the clue giver violate any rules stated before such as using Taboo words, the opposing team will activate an alarm button that means the clue giver must discard their card and draw a new one. At the end of each round, the active team gains one point for every successfully guessed word and the opposing team gains one point for every discarded word. After one team has done a round of guessing, the teams alternate and a new round begins. This will repeat until all members of both teams have been the clue giver at least once. The score after all the rounds are complete is then tallied up and the team with the higher score is declared the winner!
            </p>
            <Link className='block bg-mafiaRed mt-6 lg:mt-12 text-white py-3 px-6 w-[50%] text-center mx-auto border border-navy rounded' to='/mafia/server'>Play Mafia</Link>        
        </div>
    </section>
  );

  
}

export default Rules