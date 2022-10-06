import React from 'react'

const JoinForm = ({handleJoinClick}) => {
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="playerName">Player Name</label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="playerName" type="text" placeholder="Player Name"></input>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="password">Server Code</label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="serverCode" type="text" placeholder="*********"></input>
      <p className="text-red-500 text-xs italic">Feel free to use any name that you'd like</p>
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-mafiaRed text-white py-3 px-6 min-w-[145px] border border-navy rounded" type="button">Join Server</button>
      <button onClick={handleJoinClick} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">Go Back?</button>
    </div>
  </form>
  )
}

export default JoinForm