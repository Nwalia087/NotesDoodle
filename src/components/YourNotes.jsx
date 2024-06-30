import React, { useContext, useEffect } from "react";
import NoteComponent from "./NoteComponent";
import NoteContext from "../context/notes/NoteContext";

export default function YourNotes() {
  const context = useContext(NoteContext);
  const { notes, fetchAllNotes } = context;
  useEffect(() => {
    fetchAllNotes();
  }, [fetchAllNotes]);
  return (
    <>
      <div className="YourNotes text-center mt-5 mb-4">
        <h1>
          Your <span className="text-warning">Notes</span>
        </h1>
      </div>
      <div className="container justify-content-center justify-content-lg-evenly d-flex flex-wrap">
        {notes.length === 0 ? (
          <div className="noNotesContainer">
            <h2>Oops, you have no notes</h2>
          </div>
        ) : (
          notes.map((element) => (
            <div className="col-md-6" key={element._id}>
              <NoteComponent id={element._id} title={element.title} description={element.description} />
            </div>
          ))
        )}
      </div>
    </>
  );
}
