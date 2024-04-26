// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <div className="App">
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/Home" element={<Home />}></Route>
            <Route path="/About" element={<About />}></Route>
          </Routes>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
