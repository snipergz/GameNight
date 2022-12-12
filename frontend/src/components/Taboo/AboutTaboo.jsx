import React from 'react'

const AboutTaboo = () => {
  return (
    <>
    <section id='taboo-about' className='container mx-auto p-4 h-auto max-w-full'>
      <h1 className='text-white text-center text-3xl lg:text-4xl font-navFontRS mb-4'>What is <span className='text-tabooPink'>Taboo</span> and How do You Play?</h1>
        <div className='grid xl:grid-cols-2 gap-8 max-w-[1240px] m-auto text-white'>
            <div className='order-2 xl:order-1 flex flex-col justify-center items-center xl:items-start w-full px-2 py-2 mb-5 sm:m-none'>
                <p className='text-xl lg:text-2xl'>
                    Taboo is a competetive game that is played between 2 groups of people who aim to successfully guess a word faster than their opposing team.
                    It is very similiar to the game Charades execept instead of using only body motions to allude to a word, you may use any words with several restrictions
                    based on what word you're given. Each player in each group will take a turn getting a random word and then describing or emoting their way into showing
                    teammates what the word is. The game is serperated into several rounds and in each round only one team may earn a point based on which team guesses the
                    word first. After the rounds are completed, the score is tallied up and the winning team is determined.
                </p>
            </div>
            <div className='order-1 xl:order-2 aspect-w-16 aspect-h-9 xl:h-[60%] xl:w-full xl:m-auto'>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/sEGgMcow7No" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>              
            </div>
        </div>
    </section>
    </>
  );

  
}

export default AboutTaboo