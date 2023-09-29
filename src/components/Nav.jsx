import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
export const Nav = ({setIsNavOpen,isNavOpen}) => {
  return (
    <nav>
        <h1>Waves</h1>
        <button onClick={()=> setIsNavOpen(!isNavOpen)}>
         Library 
        <FontAwesomeIcon icon={faMusic} />
        </button>
    </nav>
  )
}
