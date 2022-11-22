import {useState} from 'react'
import axios from 'axios';


const StartButton = ({player, players}) => {
    const [clickStart, setStart] = useState(false);
    let startGame = true;

    const handleStartClick = async () => {
        if(player.name === "Moderator"){
          for (player of players){
            if(player.status === false){
              startGame = false
            }
          }
          if(!startGame)
            return
          else{
            console.log(player.name + " clicked Start")
            const result = await axios.patch(`http://localhost:8080/gamenight/server/mafia/player/${player.serverCode}/${player.playerID}`)
            localStorage.setItem('player', JSON.stringify(result.data))
            console.log(result)
            setStart(!clickStart)
            return
          }
        }
        console.log(player.name + " clicked Start")
        const result = await axios.patch(`http://localhost:8080/gamenight/server/mafia/player/${player.serverCode}/${player.playerID}`)
        localStorage.setItem('player', JSON.stringify(result.data))
        console.log(result)
        setStart(!clickStart)
    }

  return (
    <div className={clickStart  ? "bg-mafiaRed absolute bottom-0 left-0 right-0 text-white py-3 px-6 md:w-[50%] w-full border border-navy rounded" : "bg-[#269754] absolute bottom-0 left-0 right-0 color-white py-3 px-6 md:w-[50%] m-auto w-full border border-navy rounded"} onClick={handleStartClick}>Start Button</div>
  )
}

export default StartButton