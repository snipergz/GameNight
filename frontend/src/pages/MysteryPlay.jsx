import { useState, useEffect} from 'react';
import axios from 'axios';

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
      const result = await axios('http://localhost:8080/gamenight/server/data');
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

    if(type == 'E'){
        setData(data.filter(item => item.type === 'C'));
        setSata(data.filter(item => item.type === 'E'));
    } else{
      const result = await axios.post('http://localhost:8080/gamenight/server/next', {
        id:id
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
  <div className="container text-white">
    {loading
    ?
    <h2>Loading</h2>
    : error ?
    <div>
      <h2>Error</h2>
      <pre>{error}</pre>
    </div>
    :
    <div className="row mt-5">
      
      <h1 className="text-center text-white">
        MysteryParty
      </h1>
          
      {sata.map(({C, R, id, type}) =>
        <div className="col-md-4" key={id}>
          <h5 className="text-left" onClick={e => handleClick(id, type, e)}>
             <div>{R}</div>
          </h5>
        </div>)}

      {picd.map(({pic}) =>
        <div className="col-md-4 text-white">
          <div>
            <img src={pic} class="center"/>
          </div>
        </div>)}

      {data.map(({C, R, id, type}) =>
        <div className="col-md-4 text-white" key={id}>
          <h5 className="text-right" onClick={e => handleClick(id, type, e)}>
             <div className='text-white'>{C}</div>
          </h5>
        </div>)}

    </div>}
  </div>
  );
}

export default MysteryPartyGamePage;
