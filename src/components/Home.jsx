import React, { useContext, useEffect, useState } from "react";
import gifImg from "../assets/output-onlinegiftools.gif";
import NoteContext from "../context/notes/NoteContext";

export default function Home() {
  const [alertMessage, setAlertMessage] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    Username: "",
    password: "",
  });
  const [loginUser, setLoginUser] = useState({
    Username: "",
    password: "",
  });
  const [userLogedIn, setUserLogedIn] = useState("user");
  const context = useContext(NoteContext);
  const { loginSignup, setLoginSignup, token, setToken, setIslogedIN, setNotes, setNoteInView, setProgress } = context;

  const changeToSignup = () => {
    setLoginSignup("signup");
  };

  const changeToLogin = () => {
    setLoginSignup("login");
  };
  const onLogout = () => {
    setProgress(20);
    setIslogedIN("");
    setProgress(40);
    setUserLogedIn("");
    setProgress(60);
    setNotes([]);
    setProgress(80);
    setNoteInView({ description: "", id: null, title: "" });
    setToken("");
    setLoginSignup("login"); // Set loginSignup to "login"
    setProgress(100);
  };

  const fetchUserDetails = async () => {
    if (token) {
      const response = await fetch("https://doodlenotes.onrender.com/api/auth/get-user", {
        method: "POST",
        headers: {
          "auth-token": token,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setIslogedIN({ name: result.name, id: result._id });
        setUserLogedIn(result.name);
      }
    }
  };

  const handleOnClickSignup = async (e) => {
    e.preventDefault();
    try {
      setProgress(10);
      const response = await fetch("https://doodlenotes.onrender.com/api/auth/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newUser.name,
          Username: newUser.Username,
          password: newUser.password,
        }),
      });
      const result = await response.json();

      setProgress(40);
      if (!response.ok) {
        // Check if the error message indicates an already existing user
        const errorMessage = result.errors && result.errors[0] && result.errors[0].msg;
        if (errorMessage === "You already have an account, please login with your credentials") {
          setAlertMessage(errorMessage);
        } else {
          setAlertMessage(errorMessage);
        }
      } else {
        setProgress(70);
        setToken(result);
        setAlertMessage("");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
    setProgress(100);
  };

  const handleOnClickLogin = async (e) => {
    e.preventDefault();
    try {
      setProgress(10);
      const response = await fetch("https://doodlenotes.onrender.com/api/auth/login-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username: loginUser.Username,
          password: loginUser.password,
        }),
      });
      const result = await response.json();
      setProgress(40);

      if (!response.ok) {
        const errorMessage = result.errors && result.errors[0] && result.errors[0].msg;

        if (errorMessage === "please enter valid credentials") {
          setAlertMessage(errorMessage);
        } else {
          setAlertMessage(errorMessage);
        }
      } else {
        setToken(result);
        setAlertMessage("");
        setProgress(80);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An unexpected error occurred. Please try again later.");
    }

    setProgress(100);
  };
  useEffect(() => {
    fetchUserDetails();
  }, [token]);

  return (
    <div className="HeroContent mt--5 position-relative" style={{ caretColor: "transparent" }}>
      <h1 style={{ fontSize: "6rem" }}>
        Welcome to <span className="text-warning">D</span>oodle
        <span style={{ color: " #29a4d9" }}>N</span>otes
      </h1>
      <h4 style={{ color: " #29a4d9" }}>
        An easy and safe way to store and access your
        <span className="text-warning"> Notes </span>
        online
      </h4>
      <div className="d-flex heroGifAndFormContainer mt-5">
        {token === "" ? (
          <>
            {loginSignup === "login" ? (
              <div>
                <form className=" pb-4 border-bottom" onSubmit={handleOnClickLogin}>
                  <h4 className="mb-4">Login to access your Notes</h4>
                  <div className="mb-3 inputFields">
                    <input
                      type="email"
                      placeholder="Username"
                      onChange={(e) => setLoginUser({ ...loginUser, Username: e.target.value })}
                      className="form-control"
                      id="loginUsername"
                      aria-describedby="emailHelp"
                      style={{ caretColor: "black" }}
                      autoComplete="Username"
                    />
                  </div>
                  <div className="mb-3 inputFields">
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })}
                      className="form-control"
                      id="loginPassword"
                      style={{ caretColor: "black" }}
                      autoComplete="current-password"
                    />
                  </div>
                  {alertMessage && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      {alertMessage}
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => {
                          setAlertMessage("");
                        }}
                        data-bs-dismiss="alert"
                        aria-label="Close"></button>
                    </div>
                  )}

                  <button type="submit" className={`btn px-4 btn-primary `}>
                    <b>Login</b>
                  </button>
                </form>
                <div className="d-flex mt-4 align-items-center">
                  <h5 className="m-0">Don't have an Account?</h5>
                  <button type="button" onClick={changeToSignup} className="mx-3 px-3 btn btn-warning text-light">
                    <b>Sign-up</b>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <form className=" pb-4 border-bottom" onSubmit={handleOnClickSignup}>
                  <h4 className="mb-4">Tell Us About Yourself</h4>
                  <div className="mb-3 inputFields">
                    <input
                      type="text"
                      placeholder="Your Name"
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="form-control"
                      id="signupName"
                      style={{ caretColor: "black" }}
                      autoComplete="name"
                    />
                  </div>
                  <div className="mb-3 inputFields">
                    <input
                      type="email"
                      placeholder="Username"
                      onChange={(e) => setNewUser({ ...newUser, Username: e.target.value })}
                      className="form-control"
                      id="signupUsername"
                      aria-describedby="emailHelp"
                      style={{ caretColor: "black" }}
                      autoComplete="Username"
                    />
                  </div>
                  <div className="mb-3 inputFields">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      id="signupPassword"
                      style={{ caretColor: "black" }}
                      autoComplete="new-password"
                    />
                  </div>

                  <button type="submit" className={`btn px-4 btn-primary `}>
                    <b>SignUp</b>
                  </button>
                </form>
                {alertMessage && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {alertMessage}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => {
                        setAlertMessage("");
                      }}
                      data-bs-dismiss="alert"
                      aria-label="Close"></button>
                  </div>
                )}
                <div className="d-flex mt-4 align-items-center">
                  <h5 className="m-0">Already have an Account?</h5>
                  <button type="button" onClick={changeToLogin} className="mx-3 px-3 btn btn-warning text-light">
                    <b>Login</b>
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mt-5">
              <h3 className="mx-0">Welcome</h3>
              <br />{" "}
              <h1 className="" style={{ marginTop: "-5%", fontSize: "64px" }}>
                <span style={{ color: "#ffc105", textTransform: "uppercase" }}>{userLogedIn.charAt(0)}</span>
                <span style={{ color: "#2ba5da" }}>{userLogedIn.charAt(1)}</span>
                {userLogedIn.substring(2, userLogedIn.length)}
              </h1>
              <p className="mt-2" style={{ fontSize: "20px", fontWeight: "400" }}>
                You can Access your Notes now
              </p>
              <button type="button" onClick={onLogout} className=" px-3 btn btn-warning text-light">
                <b>LogOut</b>
              </button>
            </div>
          </>
        )}

        <img className="position-absolute" draggable="false" src={gifImg} alt="" />
      </div>
    </div>
  );
}
