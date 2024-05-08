import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

export default function Noteitem(props) {
    const {note,updatenote}=props;                         //7️⃣.1️⃣using (note of notes) we make card of note and 🛑getting id of this particular note  <------7️⃣.1️⃣---from Note.js------
                                                     //8️⃣.2️⃣ using updatenote from props and put in edit icon        <----------8️⃣.2️⃣-from Note.js---------




    const {deletenote} = useContext(noteContext);  //7️⃣.2️⃣ getting func form noteContext
    const handledelete=(e)=>{                    // 7️⃣.5️⃣ on click on delete icon ---passing (id of note) to deletenote() in NoteState.js-------->7️⃣.6️⃣------>NoteState.js
       e.preventDefault();
        deletenote(note._id);
        props.showalert("Deleted successfully","success");
    }





    

  return (                                      // 7️⃣.3️⃣ (col-md-3) is use to show row wise data
                                                // 7️⃣.4️⃣ (d-flex) and inside h5(p-2 flex-grow-1) is used to customize icon (i-took from font awesome)
                                                // 8️⃣.3️⃣ onClick edit icon call ( 🛑updatenote() with parameter of currentnote data(title,des,tag) of editing note ) ------------->8️⃣.4️⃣Note.js--->
    <div className="col-md-3">                  
      <div className="card">
        <div className="card-body">

          <div className="d-flex">              
             <h5 className="card-title p-2 flex-grow-1">{note.title}</h5>
             <i className="fa-solid fa-trash-can mx-2" onClick={handledelete}></i>
             <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}}></i>    
          </div>  

             <p className="card-text">{note.description}</p> 
         </div>
      </div>
    </div>
  )
}
