import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";

const ViewNote = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const { noteInView, notes, token } = useContext(NoteContext);
  const note = notes.find((n) => n._id === noteInView.id);
  const [viewTitle, setViewTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (note) {
      setViewTitle(note.title);
      setDescription(note.description);
    }
  }, [note]);

  const handleOnClickBackButton = (e) => {
    e.preventDefault();
    navigate("/your-notes");
  };

  const handleOnClickEdit = async (e) => {
    e.preventDefault();

    console.log("Edit button clicked");

    const response = await fetch(`https://doodlenotes.onrender.com/api/notes/update-notes/${noteInView.id}`, {
      method: "PUT",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: viewTitle,
        description: description,
      }),
    });

    const result = await response.json();
    console.log("Edit response:", result);

    setAlertMessage("Note updated");
    setTimeout(() => {
      setAlertMessage("");
    }, 1000);
  };

  const handleOnClickDelete = async (e) => {
    e.preventDefault();

    console.log("Delete button clicked");

    const response = await fetch(`https://doodlenotes.onrender.com/api/notes/delete-notes/${noteInView.id}`, {
      method: "DELETE",
      headers: {
        "auth-token": token,
      },
    });

    const result = await response.json();
    console.log("Delete response:", result);

    setAlertMessage("Note deleted");
    setTimeout(() => {
      setAlertMessage("");
    }, 1000);
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          <h5>Title</h5>
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Your title goes here"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          style={{ caretColor: "black", color: "black" }}
          value={viewTitle}
          onChange={(e) => setViewTitle(e.target.value)}
        />
        <div id="emailHelp" className="form-text"></div>
      </div>
      <div className="mb-3">
        <div className="form-floating ">
          <label
            htmlFor="floatingTextarea2 "
            style={{ position: "relative", padding: "0", overflow: "clip" }}
            className="form-label">
            <h5>Description</h5>
          </label>
          <textarea
            className="form-control "
            placeholder="Describe your note here"
            id="floatingTextarea2"
            style={{ color: "black", height: "300px", caretColor: "black" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
      </div>
      <button type="button" onClick={handleOnClickBackButton} className="btn btn-primary">
        Back To Your Notes
      </button>
      <button type="button" onClick={handleOnClickEdit} className="btn mx-3 btn-warning">
        Edit Note
      </button>
      <button type="button" onClick={handleOnClickDelete} className="btn btn-danger">
        Delete Note
      </button>
      {alertMessage && (
        <div className="alert alert-success  fade show" role="alert" style={{ top: "15%" }}>
          {alertMessage}
        </div>
      )}
    </form>
  );
};

export default ViewNote;
