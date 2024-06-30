import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
export default function AddNewNote() {
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
  });
  const context = useContext(NoteContext);
  const { token } = context;
  const addnewnote = async (e) => {
    e.preventDefault();
    const response = await fetch("https://doodlenotes.onrender.com/api/notes/add-notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({
        title: newNote.title,
        description: newNote.description,
      }),
    });
    const result = await response.json();
  };
  return (
    <div style={{ caretColor: "transparent" }}>
      <h1 style={{ fontSize: "3.5rem", marginTop: "-2%" }} className="mb-2">
        Add a new note
      </h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputTitle1" className="form-label">
            <h5>Title</h5>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Your title goes here"
            id=" onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}"
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            aria-describedby="emailHelp"
            style={{ caretColor: "black" }}
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-3">
          <div className="form-floating">
            <label htmlFor="floatingTextarea2" style={{ position: "relative", padding: "0", overflow: "clip" }}>
              <h5>Description</h5>
            </label>
            <textarea
              className="form-control"
              placeholder="Describe your note here"
              id="floatingTextarea2"
              onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
              style={{ height: "300px", caretColor: "black" }}></textarea>
          </div>
        </div>
        <button type="submit" onClick={addnewnote} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
