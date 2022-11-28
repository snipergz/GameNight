import Navbar from '../components/Navbar'
import JoinCreateMafiaServer from '../components/Mafia/JoinCreateMafiaServer'

const MafiaServer = ({gameName}) => {
  return (
    <>
        <Navbar/>
        <JoinCreateMafiaServer gameName={gameName}/>
    </>
  )
}

export default MafiaServer