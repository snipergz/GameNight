import {useState} from 'react'
import axios from 'axios';


const StartButton = ({player}) => {
    const [clickStart, setStart] = useState(false);

    const handleStartClick = async () => {
        console.log(player.name + " clicked Start")
        const result = await axios.patch(`http://localhost:8080/gamenight/server/mafia/player/${player.serverCode}/${player.playerID}`)
        console.log(result)
        setStart(!clickStart)
    }

  return (
    <div className={clickStart  ? "absolute bottom-0 bg-mafiaRed text-white py-3 px-6 md:w-[50%] w-full border border-navy rounded" : "bg-[#269754] color-white py-3 px-6 md:w-[50%] w-full border border-navy rounded"} onClick={handleStartClick}>Start Button</div>
  )
}

export default StartButton