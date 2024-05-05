import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

export default function Addnote() {
  const ncontext=useContext(noteContext);
    const {addnote}=ncontext;

    const [note,setNote]=useState({title:"",description:"",tag:""})

    const handleclick=(e)=>{
        e.preventDefault();
        addnote(note.title,note.description,note.tag);
    }
    
    const handlechange=(e)=>{
       setNote({ ...note ,    [e.target.name]: e.target.value   });
    }

    return (
    <div>
        <div className="container">
          <h2>Add a note</h2>
          <form>
            <div className="mb-3 my-4">
              <label htmlFor="title" className="form-label">title</label>
              <input type="text" className="form-control" id="title" name='title'  onChange={handlechange} />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">description</label>
              <input type="text" className="form-control" id="description" name='description' onChange={handlechange} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="tag">tag</label>
              <input type="text" className="form-check-input" id="tag" name='tag' onChange={handlechange} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
          </form>
        </div>
      
        
    </div>
    )
}
