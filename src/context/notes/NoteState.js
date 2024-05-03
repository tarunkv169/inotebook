// now using noteContext we made components to access "state" defined in this "NoteState.js"
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState=(props)=>{
    //  s1 obj
    let s1={
        name:"tarun",
        class:"5b"
    }

    // giving state a default value s1
    const[state,setState] = useState(s1);

    // using update func to change state value
    let update=()=>{
        setTimeout(()=>{
           setState({
            name:"parm",
            class:"6b"
           })
        },2000)
    }

    // then returning state and update to be use by other components
    return(
        <noteContext.Provider value={{state,update}}>
            {props.children};
        </noteContext.Provider>
    )
}


// exporting to be use by App.js see wrap all return in <NoteState>
export default NoteState;