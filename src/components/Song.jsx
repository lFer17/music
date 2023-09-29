import React from 'react'

export const Song = ({currentSong, isPlaying}) => {


  return (
    <div className="song-container">
        <img className='animation-rotate'  style={{ animationPlayState: isPlaying ? "running" : "paused" }} src={currentSong.cover} alt="" />
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
    </div>
  )
}

