// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Signup from "./components/Signup";
import Login from "./components/Login";


function App() {
  return (
    
    <div className="App">
      <NoteState>
        <div className="container">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/About" element={<About />}></Route>
              <Route path="/Login" element={<Login />}></Route>             
              <Route path="/Signup" element={<Signup />}></Route>
            </Routes>
          </Router>
        </div>
      </NoteState>
    </div>
    
  );                                                             // 9️⃣.1️⃣do(put login and signup comp in Route)<--------from Navbar.js
}                                                                // go to login comp------->9️⃣.2️⃣-login.js---->

export default App;
