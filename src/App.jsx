import "./App.css";
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import YourNotes from "./components/YourNotes";
import AddNewNote from "./components/AddNewNote";
import ViewNote from "./components/NoteView";
import LoadingBar from "react-top-loading-bar";
import NoteContext from "./context/notes/NoteContext";

function App() {
  return (
    <NoteState>
      <AppContent />
    </NoteState>
  );
}

function AppContent() {
  const context = useContext(NoteContext);
  const { progress } = context;

  return (
    <Router>
      <LoadingBar color="#2ba5da" progress={progress} />
      <Navbar />
      <div className="container contentcontainer my-3" style={{ maxWidth: "1290px" }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route path="/your-notes" element={<YourNotes />} />
          <Route path="/add-new-note" element={<AddNewNote />} />
          <Route path="/view-note" element={<ViewNote />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
