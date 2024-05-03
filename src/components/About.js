import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

export default function About() {

  const a = useContext(noteContext);   // with help of useContext(hook) we use "noteContext powers" given to a
  useEffect(()=>{
    a.update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  // as name and class is in state so using state.name and state.class
  return (
    <div>
       this is {a.state.name} and read in {a.state.class};  
    </div>
  )
}

