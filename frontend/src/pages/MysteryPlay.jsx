//import './App.css';
import { useState, useEffect} from 'react';
import axios from 'axios';

function MysteryPartyGamePage(){
  const [data, setData] = useState([]);
  const [sata, setSata] = useState([]);
  const [picd, setPicd] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let pics = [];

  useEffect(() => {
    const fetch = async() =>{
    try{
      setLoading(true);
      const result = await axios('http://localhost:8080/gamenight/server/data');
      setLoading(false);
      setData(result.data[1]);
      console.log(result.data[1]);

      setSata(result.data[0]);
      console.log(result.data[0]);

      setPicd(result.data[2])
      console.log(result.data[2]);

  } catch(error){
    setLoading(false);
    setError('data not retreied');
  }
};
fetch();

}, []);

const handleClick = (id, e) =>{
  console.log('you clicked', id);
  const next = async() =>{
    try{
      console.log('sending ajax del post');
      const result = await axios.post('http://localhost:8080/gamenight/server/next', {
        id:id
      });
        setData(result.data[0]);
        console.log(result.data[0]);

        setSata(data.filter(item => item.id === id));
        console.log(data.filter(item => item.id === id));

        setPicd(result.data[1])
        console.log(result.data[1]);

  } catch(error){
    setError('delete failed');
  }
};
next();
};


return(
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
      <h1 className="text-center text-5xl lg:text-6xl font-navFontRS text-mysteryYellow ">MysteryParty</h1>
          
      {sata.map(({C, R, id}) =>
        <div className="mt-8 mb-4" key={id}>
          <h5 onClick={e => handleClick(id, e)}>
             <div>{R}</div>
          </h5>
        </div>)}

      {picd.map(({pic}) =>
        <div className="mb-4">
          <div>
            <img src={pic} className="m-auto"/>
          </div>
        </div>)}

      {data.map(({C, R, id}) =>
        <div className="w-full p-4 bg-mysteryYellow mb-4 max-w-[650px] m-auto" key={id}>
          <h5 className="text-center" onClick={e => handleClick(id, e)}>
             {C}
          </h5>
        </div>)}

    </div>}
  </div>
  );
}

export default MysteryPartyGamePage;
