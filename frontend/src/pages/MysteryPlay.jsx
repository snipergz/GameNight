import { useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
require("dotenv").config()


function MysteryPartyGamePage(){
  const [data, setData] = useState([]);
  const [sata, setSata] = useState([]);
  const [picd, setPicd] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async() =>{
    try{
      setLoading(true);
      const result = await axios(`https://gamenight-project.herokuapp.com:${process.env.PORT}/gamenight/server/data`);
      setLoading(false);
      setData(result.data[1]);
      setSata(result.data[0]);
      setPicd(result.data[2])
  } catch(error){
    setLoading(false);
    setError('data failed');
  }
};
fetch();

}, []);

const handleClick = (id, type, e) =>{
  console.log('you clicked', id);
  const next = async() =>{
    try{

    if(type === 'E'){
        setData(data.filter(item => item.type === 'C'));
        setSata(data.filter(item => item.type === 'E'));
    } else{
      const result = await axios.post(`https://gamenight-project.herokuapp.com:${process.env.PORT}/gamenight/server/next`, {
        id:id,
        type:type
      });
        setData(result.data[0]);
        setSata(data.filter(item => item.id === id));
        setPicd(result.data[1])
    }
  } catch(error){
    setError('next failed');
  }
};
next();
};

return(
  <>
  <Navbar/>
  <div className="container text-white max-w-[1024px] m-auto text-center">
    {loading
    ?
    <h2>Loading</h2>
    : error ?
    <div>
      <h2>Error</h2>
      <pre>{error}</pre>
    </div>
    :
    <div className="mt-8 p-4">
      <h1 className="text-center text-5xl lg:text-6xl font-navFontRS text-mysteryYellow ">Murder Mystery</h1>
          

      {sata.map(({C, R, id, type}) =>
        <div className="mt-8 mb-4" key={id}>
          <h5 className="text-left" onClick={e => handleClick(id, type, e)}>
             <div>{R}</div>
          </h5>
        </div>)}

      {picd.map(({pic}) =>
        <div className="mb-4">
          <div>
            <img src={pic} className="m-auto"/>
          </div>
        </div>)}

      {data.map(({C, R, id, type}) =>
        <div className="w-full p-4 bg-mysteryYellow mb-4 max-w-[650px] m-auto" key={id}>
          <h5 className="text-center" onClick={e => handleClick(id, type, e)}>
             <div className='text-white'>{C}</div>
          </h5>
        </div>)}

    </div>}
  </div>
  </>
  );
  
}

export default MysteryPartyGamePage;
