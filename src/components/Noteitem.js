import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

export default function Noteitem(props) {
    const {note}=props;                         //----->come from 4️⃣---->4️⃣.1️⃣  using (note of notes) we make card of note

    const {deletenote} = useContext(noteContext);
    const handledelete=(e)=>{
       e.preventDefault();
        deletenote(note._id);
    }
  return (                                      // 4️⃣.2️⃣ (col-md-3) is use to show row wise data
                                                // 4️⃣.3️⃣ (d-flex) and inside h5(p-2 flex-grow-1) is used to customize icon (i-took from font awesome)
    <div className="col-md-3">                  
      <div className="card">
        <div className="card-body">

          <div className="d-flex">              
             <h5 className="card-title p-2 flex-grow-1">{note.title}</h5>
             <i className="fa-solid fa-trash-can mx-2" onClick={handledelete}></i>
             <i className="fa-solid fa-pen-to-square mx-2"></i>
          </div>  

             <p className="card-text">{note.description}</p> 
         </div>
      </div>
    </div>
  )
}
