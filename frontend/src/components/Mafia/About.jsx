import React from 'react'

const About = () => {
  return (
    <>
    <section id='about' className='container mx-auto p-4 h-auto'>
        <div className='grid md:grid-cols-2 max-w-[1240px] m-auto text-white'>
            <div className='flex flex-col justify-center items-center xl:items-start w-full px-2 py-2 mb-5 sm:m-none'>
              <h1 className='text-3xl lg:text-4xl font-navFontRS mb-4'>What is Mafia and How do You Play?</h1>
                <p className='text-xl lg:text-2xl'>
                    Mafia is a strategic game best played by 8 people including a moderator but needs a minimum of 
                    6. There are two main goals to the game. To the mafia, the goal of the game is to eliminate the
                    other players such that the mafia outnumber the citizens. The mafia does this by choosing a player
                    to execute during every round. As for the citizens, their goal is to eliminate the mafia by voting 
                    them out and assist their community through the help of the doctor who can vote to grant a citizen
                    protection and the detective who can figure out the roles of other players. If you're ready to put 
                    on your poker face scroll below to learn more about the different roles and their abilities.
                </p>
            </div>
            <div className=''>
              <div className='w-full md:w-[75%] text-lg mx-auto border border-x-neonPink border-y-neonBlue rounded-xl p-6 mb-8'>
                Can be played Anywhere and Anytime 🎉
              </div>
              <div className='w-full md:w-[75%] text-lg mx-auto border border-x-neonPink border-y-neonBlue rounded-xl p-6 mb-8'>
                Great for small groups of 2-10 People 👥👥
              </div>
              <div className='w-full md:w-[75%] text-lg mx-auto border border-x-neonPink border-y-neonBlue rounded-xl p-6 mb-8'>
                Great for Bonding and Connecting 🫶
              </div>
            </div>
        </div>
    </section>
    </>
  );

  
}

export default About