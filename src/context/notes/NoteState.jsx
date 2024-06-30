import NoteContext from "./NoteContext";
import { useState, useEffect } from "react";

const NoteState = (props) => {
  // Initial state setup with JSON.parse and default values
  const initIsLoggedin = JSON.parse(localStorage.getItem("isLogedIn")) || null; // Modified: Ensure this initializes as null if not found
  const initNotes = JSON.parse(localStorage.getItem("notes")) || [];
  const initToken = localStorage.getItem("token") || "";
  const initNoteInView = JSON.parse(localStorage.getItem("noteInView")) || { id: null, title: "", description: "" };
  const initLoginSignup = localStorage.getItem("loginSignup") || "login";

  const [notes, setNotes] = useState(initNotes);
  const [token, setToken] = useState(initToken);
  const [loginSignup, setLoginSignup] = useState(initLoginSignup);
  const [noteInView, setNoteInView] = useState(initNoteInView);
  const [isLogedIn, setIslogedIN] = useState(initIsLoggedin);
  const [progress, setProgress] = useState(0);

  const updateLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`LocalStorage quota exceeded for ${key}`, e);
    }
  };

  useEffect(() => {
    updateLocalStorage("notes", notes);
  }, [notes]);

  useEffect(() => {
    updateLocalStorage("isLogedIn", isLogedIn); // Modified: Ensure isLogedIn is properly updated
  }, [isLogedIn]);

  useEffect(() => {
    localStorage.setItem("loginSignup", loginSignup);
  }, [loginSignup]);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    updateLocalStorage("noteInView", noteInView);
  }, [noteInView]);

  // Modified: Ensure isLogedIn is reset when there's no user logged in
  useEffect(() => {
    if (!token) {
      setIslogedIN(null);
    }
  }, [token]);

  const fetchAllNotes = async () => {
    const response = await fetch("https://doodlenotes.onrender.com/api/notes/fetch-all-notes", {
      method: "GET",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setNotes(data);
    } else {
      setNotes([]);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        token,
        fetchAllNotes,
        setToken,
        noteInView,
        setNoteInView,
        loginSignup,
        setLoginSignup,
        isLogedIn,
        setIslogedIN,
        progress,
        setProgress,
      }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
