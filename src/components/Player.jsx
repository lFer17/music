import React, { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'


export const Player = ({currentSong, isPlaying, setIsPlaying, audioRef,songs,setSongs,setCurrentSong, autoPlayHandler}) => {
    const [updateTime, setUpdateTime] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0
    });



    useEffect(() => {
        const newSongs = songs.map((song) => {
          if(song.id === currentSong.id){
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
      }, [currentSong])

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        const roundedCurrent = Math.round(current);
        const roundedDuration = Math.round(duration);
        const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100);
        setUpdateTime({...updateTime, currentTime: current, duration, animationPercentage:animationPercentage});
    }

    const timeFormat = (time) => {
        if (isNaN(time) || time === null || time === undefined) {
            return "0:00"; 
        }
        
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const playHandler = () => {
        if(isPlaying){
            audioRef?.current?.pause();
            setIsPlaying(!isPlaying);
        }else{
            audioRef?.current?.play();
            setIsPlaying(!isPlaying);
        }
    }

    const dragTimeHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setUpdateTime({...updateTime, currentTime: e.target.value});
    }

 

    const skipBack = () => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if((currentIndex - 1 ) % songs.length === -1){
            setCurrentSong(songs[songs.length - 1]);
            autoPlayHandler();
            return;
        }
        setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        autoPlayHandler();
        
        const newSongs = songs.map((song) => {
            if(song.id === currentSong.id){
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
        
    }

    const skipForward = () => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        autoPlayHandler();
        const newSongs = songs.map((song) => {
            if(song.id === currentSong.id){
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
    }

    const trackAnim = {
        transform: `translateX(${updateTime.animationPercentage}%)`
    }



  return (
    <div className="player">
        <div className="time-control">  
            <p>{timeFormat(updateTime.currentTime)}</p>
            <div className="track" style={{background:`linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}}>
            <input
             min = {0} 
             value={updateTime.currentTime} 
             max={updateTime.duration | 0} 
             type="range"
             onChange={dragTimeHandler}
             />
             <div style={trackAnim} className="animate-track"></div>
             </div>
            <p>{timeFormat(updateTime.duration)}</p>
        </div>
        <div  className="play-control">
            <FontAwesomeIcon onClick={skipBack} className="skip-back" icon={faAngleLeft} size="2x"/>
            <FontAwesomeIcon onClick={playHandler} className="play" icon={ isPlaying? faPause : faPlay} size="2x"/>
            <FontAwesomeIcon onClick={skipForward} className="skip-forward" icon={faAngleRight} size="2x"/>
        </div>
        <audio 
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef} 
        src={currentSong.audio}/>
    </div>
  )
}
