import {useState} from 'react'
import axios from 'axios';


const StartButton = ({player}) => {
    const [clickStart, setStart] = useState(false);

    const handleStartClick = () => {
        console.log(player.name + " clicked Start")
        setStart(!clickStart)
    }

  return (
    <div className="bg-mafiaRed text-white py-3 px-6 min-w-[145px] border border-navy rounded" onClick={handleStartClick}>Start Button</div>
  )
}

export default StartButton