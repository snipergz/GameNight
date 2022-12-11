//import './App.css';
import { useState, useEffect} from 'react';
import axios from 'axios';

function MysteryPartyGamePage(){
  const [data, setData] = useState([]);
  const [sata, setSata] = useState([]);
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
        setData(result.data);
        setSata(data.filter(item => item.id === id));
  } catch(error){
    setError('delete failed');
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
          <h2 className="text-center ">
            {sata.map(({C, R, id}) =>
        <div className="col-md-4" key={id}>
          <h5 className="text-left" onClick={e => handleClick(id, e)}>
             <div>{R}</div>
             <div hidden>{R}</div>
          </h5>
        </div>)}
          </h2>
          <div>
          <img src="https://i.imgur.com/IFCmBO4l.png" class="center"/>
          </div>
      {data.map(({C, R, id}) =>
        <div className="col-md-4 text-white" key={id}>
          <h5 className="text-right" onClick={e => handleClick(id, e)}>
             <div className='text-white'>{C} </div>
             <div hidden>{R}</div>
          </h5>
        </div>)}
    </div>}
  </div>
  );
}

export default MysteryPartyGamePage;