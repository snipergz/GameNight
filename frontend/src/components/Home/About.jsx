import React from 'react'

const About = () => {
  return (
    <>
    <section id='about' className='container mx-auto p-4 h-[500px]'>
        <div className='grid md:grid-cols-2 max-w-[1240px] m-auto text-white'>
            <div className='flex flex-col justify-center items-center xl:items-start w-full px-2 py-2 mb-5 sm:m-none'>
              <h1 className='text-3xl lg:text-4xl font-navFontRS'>What is GameNight?</h1>
              <p className="text-xl lg:text-2xl my-4">
                The drinks are cold 🧊, the pizzas are hot 🔥, and the night is young 🥳 but the communation and interaction within a small group has gone down. What shall they do?
                GameNight is the answer to this question. GameNight is a fullstack web application built with the purpose of helping people connect and develop bonds 🤣🤝 through games 🕹️.
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