import React from 'react'
import { LibrarySong } from './LibrarySong'

export const Library = ({songs,setCurrentSong,autoPlayHandler,setSongs, isNavOpen}) => {
  return (
    <div className={`library ${isNavOpen && 'active-library'}`}>
        <h2>Library</h2>
        <div className="library-songs">
             {songs.map((song) => <LibrarySong setSongs ={setSongs} songs={songs} autoPlayHandler={autoPlayHandler} setCurrentSong={setCurrentSong} song={song} key={song.id}/>)}
        </div>
    </div>
  )
}
