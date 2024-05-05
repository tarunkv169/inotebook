// now using noteContext we made components to access "state" defined in this "NoteState.js"
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState=(props)=>{
    //            //  s1 obj
    // let s1={
    //     name:"tarun",
    //     class:"5b"
    // }

    //            // giving state a default value s1
    // const[state,setState] = useState(s1);

    //           // using update func to change state value
    // let update=()=>{
    //     setTimeout(()=>{
    //        setState({
    //         name:"parm",
    //         class:"6b"
    //        })
    //     },2000)
    // }

    //          // then returning state and update to be use by other components
    // return(
    //     <noteContext.Provider value={{state,update}}>
    //         {props.children};
    //     </noteContext.Provider>
    // )










    
    const notesinitial=[                                //2️⃣.1️⃣ declaring notesinitial
        {
          "_id": "66361e8288f2c25d4e4b3224",
          "user": "6627754530d183dad9617f05",
          "title": "the rich man",
          "description": "the rich man the poor man",
          "tag": "personal",
          "date": "2024-05-04T11:39:46.634Z",
          "__v": 0
        },
        {
          "_id": "66361e8488f2c25d4e4b3226",
          "user": "6627754530d183dad9617f05",
          "title": "the rich man",
          "description": "the rich man the poor man",
          "tag": "personal",
          "date": "2024-05-04T11:39:48.220Z",
          "__v": 0
        },
        {
          "_id": "66361e8888f2c25d4e4b3228",
          "user": "6627754530d183dad9617f05",
          "title": "the rich man",
          "description": "the rich man the poor man",
          "tag": "personal",
          "date": "2024-05-04T11:39:52.050Z",
          "__v": 0
        }
      ]


      const [notes,setNotes]=useState(notesinitial);      //2️⃣.2️⃣ initializing notes(with notesinitial) using usestate



      const head = "http://localhost:5000";

      //getnotes
      const getnote = async ()=>                        // 2️⃣.3️⃣ creating func getnote()---to fetch notes(fetch,GET,auth_token,setNotes)
      {
             const response = await fetch(`${head}/api/notes/fetch_notes`, {
                 method: "GET", 
         
                 headers: {
                           "Content-Type": "application/json",
                           "auth_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyNzc1NDUzMGQxODNkYWQ5NjE3ZjA1In0sImlhdCI6MTcxNDg5OTQzOH0.aE6IZiaBHvsaizMlz7XtpqFVXLQc3SBRmBInq1jSVzg"
                          },

                 });

             const json = await response.json();
             console.log(json);
             setNotes(json);                            // 2️⃣.4️⃣ fetched data is converted into json and fill in {setNotes}
      }
       







      const addnote=async(title,description,tag)=>{
         const response = await fetch(`${head}/api/notes/add_note`,{
             method: "POST",
             headers:{
               "Content-Type":"application/json",
               "auth_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyNzc1NDUzMGQxODNkYWQ5NjE3ZjA1In0sImlhdCI6MTcxNDg5OTQzOH0.aE6IZiaBHvsaizMlz7XtpqFVXLQc3SBRmBInq1jSVzg"
             },

             body: JSON.stringify({title,description,tag})
         });

         console.log("adding note",{response});
         const note={
          "_id": "66361e8888f2c25d4e4b3228",
          "user": "6627754530d183dad9617f05",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2024-05-04T11:39:52.050Z",
          "__v": 0
        }

        setNotes(notes.concat(note));
      }





      // //addnote
      // const addnote = async(title,description,tag)=>{
      //   const response = await fetch(`${head}/api/notes/add_note`, {
      //     method: "POST", 
         
      //     headers: {
      //       "Content-Type": "application/json",
      //       "auth_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyNzc1NDUzMGQxODNkYWQ5NjE3ZjA1In0sImlhdCI6MTcxMzg5OTM4NH0.VPFKLByucoEdkePMPTx8nnRvjIWO4jycdZVJoz-42Nw"
      //     },

      //     body: JSON.stringify({title,description,tag}),
      //   });
       
      
      
  
      //    setNotes(notes.concat(response));
      // }










      //delete the note
     //delete the note
const deletenote = async (id) => {
  try {
          const response = await fetch(`${head}/api/notes/delete_note/${id}`, {
          method: "DELETE",
          headers: {
                   "Content-Type": "application/json",
                   "auth_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyNzc1NDUzMGQxODNkYWQ5NjE3ZjA1In0sImlhdCI6MTcxNDg5OTQzOH0.aE6IZiaBHvsaizMlz7XtpqFVXLQc3SBRmBInq1jSVzg"
                   }
          });
    
          if (!response.ok) 
          {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const json = await response.json();
          console.log("Deleting note", json);

          // Update the notes state after successful deletion
          const newNotes = notes.filter((note) => note._id !== id);
          setNotes(newNotes);
  } 
  catch(error)
  {
    console.error("Error deleting note:", error);
  }
};












      //edit the note
      // const editnote=()=>{

      // }




      return(                                                     // 2️⃣.5️⃣ passing which we   initialize,define in   (VALUE) to use by  (others) -----------> go to Note.js(2️⃣.6️⃣)---------->
            <noteContext.Provider value={{notes,setNotes,getnote,addnote,deletenote}}>     
                 {props.children}
            </noteContext.Provider>
      )





}


// exporting to be use by App.js see wrap all return in <NoteState>
export default NoteState;