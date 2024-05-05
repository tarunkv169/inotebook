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



    
    const notesinitial=[]                               //0️⃣.0️⃣ declaring notesinitial
      
    const [notes,setNotes]=useState(notesinitial);      //0️⃣.0️⃣ initializing notes(with notesinitial) using usestate

    const head = "http://localhost:5000";






      //getnotes
      const getnote = async ()=>                             //2️⃣.0️⃣ creating getnote()
      {
                                                                  // 2️⃣.1️⃣ creating func getnote()---to fetch notes(fetch,GET,auth_token,setNotes) <-----
             //📅📅📅📅this is to fetch(GET) from database📅
             const response = await fetch(`${head}/api/notes/fetch_notes`, {
                 method: "GET", 
         
                 headers: {
                           "Content-Type": "application/json",
                           "auth_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyNzc1NDUzMGQxODNkYWQ5NjE3ZjA1In0sImlhdCI6MTcxNDg5OTQzOH0.aE6IZiaBHvsaizMlz7XtpqFVXLQc3SBRmBInq1jSVzg"
                          },

                 });
             
            
             //🖼️🖼️🖼️🖼️this is to show on (UI) fetch data🖼️
             const json = await response.json();
             console.log(json);
             setNotes(json);                            // 2️⃣.2️⃣ fetched data is converted into json and fill in {setNotes}


      }
       


      

 
      const addnote=async(title,description,tag,id)=>                   //5️⃣.0️⃣ creating addnote()---->go to return🔚
        {
                                                                     //5️⃣.5️⃣in this adding note in database and UI <-----------5️⃣.5️⃣-----from Addnote.js<----------
           //📅📅📅📅this is to add(POST) note on database📅
           const response = await fetch(`${head}/api/notes/add_note`,{
               method: "POST",
               headers:{
                 "Content-Type":"application/json",
                 "auth_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyNzc1NDUzMGQxODNkYWQ5NjE3ZjA1In0sImlhdCI6MTcxNDg5OTQzOH0.aE6IZiaBHvsaizMlz7XtpqFVXLQc3SBRmBInq1jSVzg"
               },
  
               body: JSON.stringify({title,description,tag})
           });
  
           
           
           
           
           //🖼️🖼️🖼️🖼️this is to show on (UI) added data🖼️
           
                const note = await response.json();
                setNotes(notes.concat(note)); // Using callback form of setNotes to ensure we have the latest state
           
           
  
        }
  
  
  
  
      

             //delete the note
       const deletenote = async (id) =>                    //7️⃣.0️⃣ creating deletenote()---->go to return🔚
       {      console.log("this is id",id)                                              //7️⃣.6️⃣in this deleting note in database and UI <-----------7️⃣.6️⃣-----from Noteitem.js<----------       
         try {
  
            //📅📅📅📅this is to delete(DELETE) ON database📅
            const response = await fetch(`${head}/api/notes/delete_note/${id}`, {
            method: "DELETE",
            headers: {
                     "Content-Type": "application/json",
                     "auth_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyNzc1NDUzMGQxODNkYWQ5NjE3ZjA1In0sImlhdCI6MTcxNDg5OTQzOH0.aE6IZiaBHvsaizMlz7XtpqFVXLQc3SBRmBInq1jSVzg"
                     }
            });
      
            
  
            const json = await response.json();
            console.log("Deleting note", json);
  
  
  
  
            //🖼️🖼️🖼️🖼️this is to show on (UI) deleted data🖼️
            const newNotes = notes.filter((note) => note._id !== id);
            setNotes(newNotes);
  
  
         } 
         catch(error)
         {
           console.error("Error deleting note:", error);
         }
  
      };
  


      //edit the note
      const editnote=async(title,description,tag,id)=>                   //8️⃣.0️⃣ creating editnote()---->go to return🔚
      {
                                                                         //8️⃣.9️⃣update in database(PUT,header,body(title,des,tag))          <------------from Notes.js8️⃣.8️⃣----
         const response = await fetch(`${head}/api/notes/update/${id}`,{
                method:"PUT",
                headers:{
                  "Content-Type":"application/json",
                  "auth_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyNzc1NDUzMGQxODNkYWQ5NjE3ZjA1In0sImlhdCI6MTcxNDg5OTQzOH0.aE6IZiaBHvsaizMlz7XtpqFVXLQc3SBRmBInq1jSVzg"
                },

            body: JSON.stringify({title,description,tag})
         });
         
         const json = await response.json();
         console.log(json);
         
         
         let newnotes = JSON.parse(JSON.stringify(notes));             //8️⃣.🔟 to show in UI---do JSON.parse of JSON.stringify of notes---8️⃣.🔟.1️⃣then apply loop to match id of all notes if match then change title,des,tag---then break------8️⃣.🔟.2️⃣setNotes(newnotes)

         for(let index=0; index<newnotes.length; index++)
          {  const element = newnotes[index];
             if(element._id===id)
              {
                newnotes[index].title=title;
                newnotes[index].description=description;
                newnotes[index].tag=tag;

                break;
              }
          }

          setNotes(newnotes);

      }


                                                                 //2️⃣.3️⃣---------------->2️⃣.4️⃣Note.js----->
                                                                 //5️⃣.0️⃣---------------->5️⃣.0️⃣Note.js--->
      return(                                                    //7️⃣.0️⃣---------------->7️⃣.0️⃣Note.js---->
                                                                 //8️⃣.0️⃣---------------->8️⃣.1️⃣Note.js----->
            <noteContext.Provider value={{notes,setNotes,getnote,addnote,deletenote,editnote}}>     
                 {props.children}
            </noteContext.Provider>
      )





}


// exporting to be use by App.js see wrap all return in <NoteState>
export default NoteState;