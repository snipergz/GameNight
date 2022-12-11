import React from 'react'
import { Link } from 'react-router-dom';

const Rules = () => {
  return (
    <section className='container mx-auto p-4 h-auto max-w-full md:mt-20'>
        <div className='text-white mx-auto max-w-[1240px] relative'>
            <h1 className=' text-center text-3xl lg:text-4xl mb-4'>More in depth Rules:</h1>
            <p className='text-xl lg:text-2xl'>
                The objective of Mafia is for either the Mafia members to win by outnumbering the civillians, or for the Civillians to win by eliminating all mafia members. The Civillian roles are serperated into the Doctor who can ensure one players safety each round, the Detective who can investigate one player each round, and plain Civillians who have no special actions. Mafia is serperated into rounds where all players take turns discussing who they believe is likely a mafia member within a certain time limit. At any point the players may choose to call for a vote so that they may eliminate a player via majority rules. when a player is voted out they are removed from the game and their role is kept hidden until the game is over. After the time is up or someone is voted out in the round, the game moves to a mafia round where mafia members secretly meet without alerting the civillians and they choose a civillian they wish to eliminate. After the mafia has chosen their target, they end their meeting and the doctor is allowed to choose who they wish to protect for the round. Once the doctor has chosen, the detective then chooses someone to investigate. The role of the investigated player is revealed to the detective in secret and they are now allowed to discuss their findings with other players in the following rounds. This process is then repeated until the win conditions are met. If at any point at the end of a civillian round they eliminate the last mafia member the civillians are declared winners. If at any point in the civillian round or mafia round the mafia members outnumber the remaining civillians, the mafia is declared the winners.
            </p>
            <Link className='block bg-mafiaRed mt-6 lg:mt-12 text-white py-3 px-6 w-[50%] text-center mx-auto border border-navy rounded' to='/mafia/server'>Play Mafia</Link>        
        </div>
    </section>
  );

  
}

export default Rules