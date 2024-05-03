// react i want to use Context Api so let me create a context
import { createContext } from "react";

// ok creating notecontext
const noteContext = createContext();

// exporting so to be use by "NoteState" and by the "components"
export default noteContext;