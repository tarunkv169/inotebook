import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';

export default function Note() {
  
    const ncontext=useContext(noteContext);                         //1️⃣starting from here  use the noteContext
    const {notes,getnote,editnote} = ncontext;                               //2️⃣ in {} which we want to use we can use------>go to NoteState2️⃣.1️⃣------>




    useEffect(()=>{                                                 //2️⃣.5️⃣useEffect() is applied when something is changing so in getnote() we do setNotes  2️⃣.5️⃣ <----------------from NoteState.js
        getnote();                                                  //2️⃣.6️⃣open backend terminal--->"npm install cors" and import( var cors = require('cors') and app.use(cors())) in index.js of backend
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  
    
    






    
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note,setNote] = useState({etitle:"",edescription:"",etag:"",id:""});  //8️⃣.4️⃣.1️⃣ initialize with empty 
    let updatenote=(currentnote)=>{   //8️⃣.4️⃣--- ⬆️-(8️⃣.4️⃣.1️⃣)---when edit icon click this func will run and setNote(with currentdata of editing note)
    
        ref.current.click();            //8️⃣.5️⃣---useref of current define (in className="btn btn-primary d-none" do ref={ref}) and (outer do const ref= useRef(null))
        setNote({etitle: currentnote.title,edescription: currentnote.description, etag: currentnote.tag, id: currentnote._id})

    }


    const handlechange=(e)=>{          //8️⃣.6️⃣---onChange--setNote(with oldnote+newnote)
        setNote({...note,[e.target.name]: e.target.value})
    }


    const updateclick=(e)=>{   //8️⃣.7️⃣---onClick--call--editnote()--with parameter of edited note to save in database and show on UI
        editnote(note.etitle , note.edescription , note.etag , note.id)
        refClose.current.click();        //8️⃣.8️⃣---(in close button ref={refClose}) and (outer do const refClose= useRef(null))------------------->8️⃣.9️⃣go to NoteState.js---->
    }









    return (                                                        //5️⃣.0️⃣ Addnote comp ---------->goto Addnote.js5️⃣.1️⃣------>
                                                                    //8️⃣.0️⃣ creating modal   and   inserting(addnote form in className="modal-body") change id,name,className
        <>
        <Addnote/>     
        
        <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop" ref={ref}>
        </button>

        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
               <form>
                   <div className="mb-3 my-4">
                       <label htmlFor="etitle" className="form-label">title</label>
                       <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={handlechange} minLength={5} required/>
                   </div>
                   <div className="mb-3">
                       <label htmlFor="edescription" className="form-label">description</label>
                       <input type="text" className="form-control" id="edescription" name='edescription'value={note.edescription} onChange={handlechange} minLength={5} required/>
                   </div>
                   <div className="mb-3">
                       <label htmlFor="etag" className="form-label">tag</label>
                       <input type="text" className="form-control" id="etag" name='etag'value={note.etag} onChange={handlechange} minLength={5} required/>
                   </div>
  
               </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5}type="button" className="btn btn-primary" onClick={updateclick} >Update Notes</button>
            </div>
          </div>
        </div>
        </div>  





        <div className="row my-5">
            <h2>Your Notes</h2>
            <div className="container mx-2">
                {notes.length===0 && "No notes to Display"}
            </div>
            {  
                notes.map((note)=>{                                 //6️⃣ using map() we use Noteitem.js because in this we integrate the fetch_notes
                    return <Noteitem key={note._id} updatenote={updatenote} note={note}/>   //7️⃣.0️⃣ now we make Noteitem.js in which we send (each note of notes) -----====> go to Noteitem.js with(🛑note={note}7️⃣.1️⃣---------->
                })                                                                          //8️⃣.1️⃣---(🛑updatenote(updatenote))passing to Noteitme--------------8️⃣.2️⃣go to Noteitem.js------> -->
            }

        </div>
        </>
     )
}
