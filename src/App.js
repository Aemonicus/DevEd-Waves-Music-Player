import { useState, useRef } from "react"
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';

import "./styles/app.scss"

import data from "./data"

function App() {
  const [ songs, setSongs ] = useState(data())
  const [ currentSong, setCurrentSong ] = useState(songs[ 0 ])
  const [ isPlaying, setIsPlaying ] = useState(false)
  const [ songInfo, setSongInfo ] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0
  })
  const [ libraryStatus, setLibraryStatus ] = useState(false)

  const audioRef = useRef(null)


  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime
    const duration = e.target.duration
    const roundedCurrent = Math.round(current)
    const roundedDuration = Math.round(duration)
    const animation = Math.round((roundedCurrent / roundedDuration) * 100)

    setSongInfo({ ...songInfo, currentTime: current, duration, animationPercentage: animation })
  }

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex(item => item.id === currentSong.id)

    // Le modulus operator permet de réaliser une boucle infinie
    // Ca veut dire que dans l'exemple ci-dessous, quand on arrive au bout du tableau de chansons, au lieu de crash car on dépasse le nombre d'éléments dans le tableau, le modulo renvoie 0 donc l'index revient à 0
    await setCurrentSong(songs[ (currentIndex + 1) % songs.length ])
    if (isPlaying) {
      audioRef.current.play()
    }
  }

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player setCurrentSong={setCurrentSong} setSongs={setSongs} songs={songs} setSongInfo={setSongInfo} songInfo={songInfo} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} />
      <Library libraryStatus={libraryStatus} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} />
      <audio onEnded={songEndHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
