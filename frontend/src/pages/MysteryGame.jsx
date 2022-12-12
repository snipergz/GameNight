import React from 'react'
import Choice from '../components/Mystery/MysteryGameChoice'
import Room from "../assets/Mystery/r.png";
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const MysteryGame = () => {
    return (
    <div>
    <Navbar/>
    <img className='w-[50%] md:w-[35%] mx-auto border border-black rounded-xl' src={Room} alt="" />
      <section className='container mx-auto p-4 h-auto max-w-full md:mt-20'>
          <div className='text-white mx-auto max-w-[1040px] relative'>
              <h1 className=' text-center text-3xl lg:text-3xl mb-4'>More in depth Rules:</h1>
              <p className='text-xl lg:text-2xl'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis aut laudantium cupiditate dolorum nisi doloribus placeat nulla, unde corrupti fuga tenetur at numquam, voluptatum nesciunt debitis quidem optio soluta. Excepturi, in officiis exercitationem esse perferendis adipisci sit, quo labore praesentium iusto unde repellat natus quis possimus error consequuntur suscipit eaque minus quisquam ducimus inventore autem minima! Eveniet recusandae ea sequi magnam distinctio, consequuntur illum enim cumque necessitatibus nostrum porro temporibus hic consectetur, non neque impedit laudantium ut aspernatur omnis fugit quasi, ipsum optio? Iste maiores veritatis illum, eum praesentium soluta ad provident eligendi dignissimos vel beatae aperiam, reprehenderit eaque voluptatem!
              </p>
              <Link className='block bg-mafiaRed mt-6 lg:mt-12 text-white py-3 px-6 w-[50%] text-center mx-auto border border-navy rounded' to='/MysteryPlay'>Play Mystery Party</Link>        
          </div>
      </section>
      </div>
    );
  
    
  }

export default MysteryGame;

/*
{
    return (
        <whole>
        <Navbar/>
        <div>
            <img src={Room} alt="Room Image"/>
            <Link className='hold' to='/MysteryPlay'>Play Mystery Party</Link>
        </div>
        <Choice/>
        </whole>
    );
}
*/