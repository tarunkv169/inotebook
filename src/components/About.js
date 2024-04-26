import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

export default function About() {

  const a = useContext(noteContext);
  useEffect(()=>{
    a.update();
  },[])

  return (
    <div>
       this is {a.state.name} and read in {a.state.class};
    </div>
  )
}

