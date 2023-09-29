
import React, { useState, useRef, useEffect } from 'react'
import { Player } from './components/Player'
import { Song } from './components/Song'
import data from './util'
import { Library } from './components/Library'
import { Nav } from './components/Nav'

export const  App = ()=> {
 
  const [isPlaying,setIsPlaying] = useState(false)
  const [isNavOpen,setIsNavOpen] = useState(false)
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const audioRef = useRef(null);


  const autoPlayHandler = () => {
    if(isPlaying){
        const playPromise = audioRef.current.play();
        if(playPromise !== undefined){
          playPromise.then((audio) => {
            audioRef.current.play();
          })
        }
      }
    }
    
    return (
      <>
    <Nav
    setIsNavOpen = {setIsNavOpen}
    isNavOpen = {isNavOpen}
    />
      <Song currentSong = {currentSong} isPlaying={isPlaying}/>
      <Player
      setSongs = {setSongs}
       songs = {songs}
       currentSong = {currentSong} 
       isPlaying = {isPlaying}
       setCurrentSong={setCurrentSong}
       setIsPlaying = {setIsPlaying}
       audioRef={audioRef}
       autoPlayHandler={autoPlayHandler}
       />
       <Library
        isNavOpen = {isNavOpen}
        isPlaying = {isPlaying}
        songs={songs} 
        setCurrentSong={setCurrentSong}
        autoPlayHandler={autoPlayHandler}
        setSongs = {setSongs}
        />
    </>
  )
}
