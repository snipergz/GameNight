import React from 'react'

const About = () => {
  return (
    <>
    <section id='mafia-about' className='container mx-auto p-4 h-auto max-w-full'>
      <h1 className='text-white text-center text-3xl lg:text-4xl font-navFontRS mb-4'>What is <span className='text-mafiaRed'>Mafia</span> and How do You Play?</h1>
        <div className='grid xl:grid-cols-2 gap-8 max-w-[1240px] m-auto text-white'>
            <div className='order-2 xl:order-1 flex flex-col justify-center items-center xl:items-start w-full px-2 py-2 mb-5 sm:m-none'>
                <p className='text-xl lg:text-2xl'>
                    Mafia is a strategic game best played by 8 people including a moderator but needs a minimum of 
                    7. There are two main goals to the game. To the mafia, the goal of the game is to eliminate the
                    other players such that the mafia outnumber the citizens. The mafia does this by choosing a player
                    to execute during every round. As for the citizens, their goal is to eliminate the mafia by voting 
                    them out and assist their community through the help of the doctor who can vote to grant a citizen
                    protection and the detective who can figure out the roles of other players. If you're ready to put 
                    on your poker face scroll below to learn more about the different roles and their abilities.
                </p>
            </div>
            <div className='order-1 xl:order-2 aspect-w-16 aspect-h-9 xl:h-[60%] xl:w-full xl:m-auto'>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/dOgS78vRw3w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
        </div>
    </section>
    </>
  );

  
}

export default About