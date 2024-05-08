import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

export default function Addnote(props) {
  const ncontext=useContext(noteContext);


    const {addnote}=ncontext;                                          //5️⃣.1️⃣ getting addnote() from noteContext                  

    const [note,setNote]=useState({title:"",description:"",tag:""})    //5️⃣.2️⃣ initialize with empty note

    const handleclick=(e)=>{                                           //5️⃣.4️⃣ onsubmit send our added note to store in database and show on UI-------->go to NoteState.js with passing parameters to func()5️⃣.5️⃣------->
        e.preventDefault();
        addnote(note.title,note.description,note.tag,note._id);
        setNote({title:"",description:"",tag:""})    //🛑to do function on value of <input> ----like previous remain or erase--- then use (value={note.title etc})
        
        props.showalert("Note added successfully","success");
    }
    
    const handlechange=(e)=>{                                           //5️⃣.3️⃣ inputting note with (value) from user 
       setNote({ ...note ,    [e.target.name]: e.target.value   });
       
    }

    return (
    <div className='my-3'>
        <div className="container">
          <h2>Add a note</h2>
          <form>
            <div className="mb-3 my-2">
              <label htmlFor="title" className="form-label"><strong>Title</strong></label>
              <input type="text" className="form-control" id="title" name='title'  value={note.title} onChange={handlechange} minLength={5} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label"><strong>Description</strong></label>
              <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={handlechange} minLength={5} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label"><strong>Tag</strong></label>
              <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={handlechange} minLength={5} required/>
            </div>
  
            <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick} >Add Note</button>
          </form>
        </div>
      
        
    </div>
    )
}
