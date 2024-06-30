import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import postItImage from "../assets/post-it.png";
import NoteContext from "../context/notes/NoteContext";

export default function Navbar() {
  const context = useContext(NoteContext);
  const { token } = context;

  let location = useLocation();
  const currentPath = location.pathname.replace("/inotebook", "/");

  const [path, setPath] = useState(currentPath);
  useEffect(() => {
    setPath(currentPath);
  }, [currentPath]);
  const getActiveDropDownItem = () => {
    if (path === "/add-new-note") {
      return "New Note";
    } else if (path === "/your-notes") {
      return "Your Notes";
    } else {
      return "Notes";
    }
  };
  const activeDropDownItem = getActiveDropDownItem();
  return (
    <>
      <nav className="navbar bg-white fixed-top navbar-expand-lg navbar-light">
        <Link className="ms-5 navbar-brand" to="/">
          <img src={postItImage} width="30" height="30" className=" d-inline-block align-top mx-2" alt="" />
          <span className="text-warning">D</span>oodle
          <span style={{ color: " #29a4d9" }}>N</span>otes
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {token === "" ? (
              <>
                <li className={`nav-item ${path === "/about" ? "active" : ""}`}>
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li style={{ width: "108px" }} className={`text-center nav-item dropdown`}>
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {activeDropDownItem}
                  </Link>
                  <ul className="dropdown-menu py-0">
                    <li>
                      <Link
                        id="NewNoteDropDownItem"
                        className={`dropdown-item  ${path === "/add-new-note" ? "active" : ""}`}
                        to="/add-new-note">
                        New Note
                      </Link>
                    </li>
                    <li>
                      <Link className={`dropdown-item  ${path === "/your-notes" ? "active" : ""}`} to="/your-notes">
                        Your Notes
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={`nav-item ${path === "/about" ? "active" : ""}`}>
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
