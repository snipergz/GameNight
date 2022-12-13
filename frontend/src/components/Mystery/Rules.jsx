import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Rules = () => {

  let shufflebuttontext = 'Shuffle Mystery Party Game';
  const handleClick = (e) =>{
    const shuf = async() =>{
      try{
        const result = await axios.post('http://localhost:8080/gamenight/server/shuffle', {});
        let shufflebuttontext = 'Shuffled!';
      } catch(error){
          console.log('shuffle failed');
      }
    };
    shuf();
  };

  return (
    <section className='container mx-auto p-4 h-auto max-w-full md:mt-20'>
          <div className='text-white mx-auto max-w-[1040px] relative'>
            <div>
              <h1 className=' text-center text-3xl lg:text-3xl mb-4'>More in depth Rules:</h1>
              <p className='text-xl lg:text-2xl'>
              In Mystery Party, You play as one of many players in a group who have all awoken within a mysterious mansion! To escape, you and your fellow teammates will have to choose-your-own-adventure as you all VOTE which path to take down the continuous corridors of the dark mansion. Some choices lead you in loops while others can lead you to your very death! With any luck you'll be able decide as a group the best choice of action to lead to your salvation. Becareful to pay attention to your surrounding! You never now what might be around the corner or in the very room your in for that matter. Remember!!! Team work is your greatest ally. Do not be afraid to talk to the people around you. This is a team tactics game aimed at analysis in a group setting. Here, an open discourse is a part of the game and without it, no one will win.  
              </p>
              
              <Link className='block bg-mafiaRed mt-6 lg:mt-12 text-white py-3 px-6 w-[50%] text-center mx-auto border border-navy rounded' to='/MysteryPlay'>Play Mystery Party</Link>
            </div>
            
            <div>
              <p className='text-xl lg:text-2xl'>Press the button bellow to shuffle the choices you encounter in Mystery Party!</p>
              <Link className='block bg-mafiaRed mt-6 lg:mt-12 text-white py-3 px-6 w-[50%] text-center mx-auto border border-navy rounded' onClick={e => handleClick(e)}>{shufflebuttontext}</Link>      
            </div>
          </div>
      </section>
  );
}

export default Rules