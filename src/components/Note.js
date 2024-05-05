import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';

export default function Note() {
  
    const ncontext=useContext(noteContext);                         //1️⃣starting from here  use the noteContext
    const {notes,getnote} = ncontext;                               //2️⃣ in {} which we want to use we can use------>go to NoteState2️⃣.1️⃣------>




    useEffect(()=>{                                                 //2️⃣.6️⃣useEffect() is applied when something is changing so in getnote() we do setNotes  2️⃣.6️⃣ <----------------
        getnote();                                                  //2️⃣.7️⃣open backend terminal--->"npm install cors" and import( var cors = require('cors') and app.use(cors())) in index.js of backend
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  


    return (                                                        //5️⃣ Addnote comp
        <>
        <Addnote/>                                                 
        <div className="row">

            <h2>Your Notes</h2>

            {  
                notes.map((note)=>{                                 //3️⃣ using map() we use Noteitem.js because in this we integrate the fetch_notes
                    return <Noteitem key={note._id} note={note}/>   //4️⃣ now we make Noteitem.js in which we send (each note of notes) -----====> go to 4️⃣.1️⃣---------->
                })
            }

        </div>
        </>
     )
}
