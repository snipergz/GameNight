//import './App.css';
import { useState, useEffect} from 'react';
import axios from 'axios';

function TP(){
  const [data, setData] = useState([]);
  const [sata, setSata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('rendering app');

  //let def = {};
  let dan = [];
  let crash = 'this works';

  useEffect(() => {
    const fetch = async() =>{
    try{
      console.log('sending ajax calls');
      setLoading(true);
      const result = await axios('http://localhost:8081/data');
      console.log('data has returned');
      console.log(result);
      setLoading(false);
      setData(result.data[1]);
      setSata(result.data[0]);
      //let def = result.data[0];
      console.log(result.data[0]);
      console.log(sata);
      console.log(result.data[1]);
      console.log(data);
      //console.log(def);
      console.log('it crashed');
  } catch(error){
    setLoading(false);
    setError('unable to retreie data from server, plese try again');
  }
};
fetch();

}, []);

const handleClick = (id, e) =>{
  console.log('you clicked', id);
  const del = async() =>{
    try{
      console.log('sending ajax del post');
      const result = await axios.post('http://localhost:8081/next', {
        id:id
      });
      //if(result.data.status == 'OK'){
        //console.log('...delete succeeded');
        setData(result.data);
        setSata(data.filter(item => item.id === id));
        //setData(data.R);
     // }else{
       // console.log('...delete failed')
     // }
      //console.log(data);
      //setData(result.data[1]);
  } catch(error){
    setError('delete failed');
  }
};
del();
};

const handleTop = (id, e) =>{
  console.log('you clicked', id);
  const fel = async() =>{
    try{
      console.log('sending ajax del post');
      const result = await axios.post('http://localhost:8080/delete', {
        id:id
      });
      if(result.data.status == 'OK'){
        console.log('...delete succeeded');
        setData(data.filter(item => item.id === id));
        //setData(data.R);
      }else{
        console.log('...delete failed')
      }
      console.log(data);
      //setData(result.data[1]);
  } catch(error){
    setError('delete failed');
  }
};
fel();
};

console.log('...rendering');

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
          <h5 className="text-center" onClick={e => handleClick(id, e)}>
             <div>{R}</div>
             <div hidden>{R}</div>
          </h5>
        </div>)}
          </h2>
          <h3 className="text-center">
            
          </h3>
      {data.map(({C, R, id}) =>
        <div className="col-md-4 text-white" key={id}>
          <h5 className="text-center" onClick={e => handleClick(id, e)}>
             <div className='text-white'>{C} </div>
             <div hidden>{R}</div>
          </h5>
        </div>)}
    </div>}
  </div>
  );
}

export default MysteryPartyGamePage;