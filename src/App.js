// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Alert from "./components/Alert";
import { useState } from "react";

function App() {

  const [alerttt,setalerttt] = useState(null);

  const showalert=(msg,type)=>
  {
      setalerttt({ msg: msg, type: type})

      setTimeout(()=>{setalerttt(null)},1500)
  }



  return (
    
    <div className="App">
      <NoteState>
        <div className="container">
          <Router>
            <Navbar />
            <Alert  alert={alerttt} />
            <Routes>
              <Route path="/" element={<Home showalert={showalert} />}></Route>
              <Route path="/About" element={<About />}></Route>
              <Route path="/Login" element={<Login showalert={showalert} />}></Route>             
              <Route path="/Signup" element={<Signup showalert={showalert} />}></Route>
            </Routes>
          </Router>
        </div>
      </NoteState>
    </div>
    
  );                                                             // 9️⃣.1️⃣do(put login and signup comp in Route)<--------from Navbar.js
}                                                                // go to login comp------->9️⃣.2️⃣-login.js---->

export default App;
