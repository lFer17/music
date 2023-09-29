import React, { useEffect } from 'react'

export const LibrarySong = ({ song : songPlay ,setCurrentSong,autoPlayHandler,setSongs, songs }) => {

  const handlerSongSelected = async () => {
     await setCurrentSong(songPlay)

      const newSongs = songs.map((song) => {
        if(song.id === songPlay.id){
          return {
            ...song,
            active: true
          }
        }else{
          return {
            ...song,
            active: false
          }
        }
      })
      setSongs(newSongs);

      autoPlayHandler();
  }

  
  return (
    <div className={`library-song ${songPlay.active && "active"}`}  onClick={handlerSongSelected}>
      <img src={songPlay.cover} alt={songPlay.name} />
      <div className="song-description">
        <h3>{songPlay.name}</h3>
        <h4>{songPlay.artist}</h4>
      </div>
    </div>
  )
}

