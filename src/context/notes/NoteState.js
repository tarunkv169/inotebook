import noteContext from "./noteContext";
import { useState } from "react";

const NoteState=(props)=>{
    let s1={
        name:"tarun",
        class:"5b"
    }

    const[state,setState] = useState(s1);

    let update=()=>{
        setTimeout(()=>{
           setState({
            name:"parm",
            class:"6b"
           })
        },2000)
    }

    return(
        <noteContext.Provider value={{state,update}}>
            {props.children};
        </noteContext.Provider>
    )
}


export default NoteState;