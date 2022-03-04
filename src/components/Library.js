import React from 'react'
import LibrarySong from "./LibrarySong"

const Library = ({ audioRef, songs, setCurrentSong, isPlaying, setSongs, libraryStatus }) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <div className="library-songs">
        <h2>Library</h2>
        {songs.map(song =>
          <LibrarySong isPlaying={isPlaying} setSongs={setSongs} audioRef={audioRef} song={song} songs={songs} key={song.id} id={song.id} setCurrentSong={setCurrentSong} />
        )}
      </div>
    </div>
  )
}

export default Library