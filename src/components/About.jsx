import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  return (
    <>
      <h1>
        Unleash Your Creativity with <span style={{ color: "#ffc105" }}>D</span>oodle
        <span style={{ color: "#2ba5da" }}>N</span>otes!
      </h1>
      <p className="mt-4" style={{ fontSize: "18px" }}>
        Welcome to <span style={{ color: "#ffc105" }}>DoodleNotes</span>, your one-stop shop for capturing and
        organizing your thoughts online! We understand the power of a good idea, and we're here to help you turn those
        fleeting thoughts into something tangible. Whether you're a student jotting down lecture notes, a writer
        crafting your next masterpiece, or a busy professional managing your to-do list,{" "}
        <span style={{ color: "#2ba5da" }}>DoodleNotes</span> provides a secure and convenient platform to store your
        notes online.
      </p>

      <h3 className="mt-5">
        Here's why you'll love <span style={{ color: "#ffc105" }}>D</span>oodle
        <span style={{ color: "#2ba5da" }}>N</span>otes:
      </h3>
      <div className="d-flex flex-wrap justify-content-around">
        <div className="card my-3" style={{ width: "24rem" }}>
          <div className="card-body">
            <h5 className="card-title" style={{ color: "#ffc105" }}>
              Enhanced Security:
            </h5>
            <p className="card-text">
              We prioritize your privacy. Your notes are secured with industry-standard encryption to ensure your
              information stays safe.
            </p>
          </div>
        </div>
        <div className="card my-3" style={{ width: "24rem" }}>
          <div className="card-body">
            <h5 className="card-title" style={{ color: "#ffc105" }}>
              Always Accessible:
            </h5>
            <p className="card-text">
              Access your notes anytime, anywhere, from your phone, tablet, or computer.{" "}
              <span style={{ color: "#ffc105" }}>D</span>oodle
              <span style={{ color: "#2ba5da" }}>N</span>otes keeps your thoughts with you, wherever you go.
            </p>
          </div>
        </div>
        <div className="card my-3" style={{ width: "24rem" }}>
          <div className="card-body">
            <h5 className="card-title" style={{ color: "#ffc105" }}>
              Collaboration Made Easy:
            </h5>
            <p className="card-text">
              Share notes with colleagues, friends, or family with just a few clicks. Collaborate in real time and
              brainstorm together seamlessly.
            </p>
          </div>
        </div>
        <div className="card my-3" style={{ width: "24rem" }}>
          <div className="card-body">
            <h5 className="card-title" style={{ color: "#ffc105" }}>
              Organize Your Thoughts:
            </h5>
            <p className="card-text">
              Organize your notes using folders, tags, and color coding. Find the information you need in a flash with
              our powerful search functionality.
            </p>
          </div>
        </div>
        <div className="card my-3" style={{ width: "24rem" }}>
          <div className="card-body">
            <h5 className="card-title" style={{ color: "#ffc105" }}>
              Effortless Note Taking:
            </h5>
            <p className="card-text">
              Create notes in seconds with our intuitive interface. Type, paste, or even upload images and files to
              capture your ideas in any format.
            </p>
          </div>
        </div>
        <div className="card my-3" style={{ width: "24rem" }}>
          <div className="card-body">
            <h5 className="card-title" style={{ color: "#ffc105" }}>
              Cloud Storage:
            </h5>
            <p className="card-text">
              Never lose your notes again! Your data is securely stored in the cloud, accessible from any device with an
              internet connection.
            </p>
          </div>
        </div>
      </div>
      <div className="my-5 d-flex justify-content-between align-items-center">
        <h2 className="">
          Join the <span style={{ color: "#ffc105" }}>D</span>oodle
          <span style={{ color: "#2ba5da" }}>N</span>otes community and unlock your creative potential!
        </h2>
        <button type="button" onClick={goToHome} className="btn px-4 btn-warning text-light">
          <b>SignUp/Login</b>
        </button>
      </div>
    </>
  );
}
