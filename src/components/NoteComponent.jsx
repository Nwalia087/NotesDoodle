import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";

export default function NoteComponent(props) {
  const context = useContext(NoteContext);
  const { setNoteInView } = context;
  const navigate = useNavigate();

  const handleOnClickViewNote = () => {
    navigate("/view-note");
    setNoteInView({
      id: props.id,
      title: props.title,
      description: props.description,
    });
  };

  return (
    <div className=" NoteComponent bg-white mx-4 note my-3 rounded border p-4">
      <h2 style={{color:"#2ba5da"}}>{props.title}</h2>
      <p className="mt-4 NoteComponentDescription">{props.description}</p>
      <div className="d-flex flex-row-reverse justify-content-between mt-5">
        <button type="button" style={{}} onClick={handleOnClickViewNote} className="px-5 text-white text-center btn btn-warning">
          View Note
        </button>
      </div>
    </div>
  );
}
