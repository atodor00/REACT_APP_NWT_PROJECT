import { useEffect, useState } from "react";
import { LoginOutStateCheckAndNavigate } from "../components/LoginStateCheckAndNavigate";

export default function Register({ parentCallback, props, isLoged }) {
  // States for registration
  const [name, setName] = useState(props.name || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [errorType, setErrorTypeMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      submitted && window.location.reload(false);
    }, 1200);
  }, [submitted]);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
  const handlePasswordR = (e) => {
    setPasswordR(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setError(true);
      setErrorTypeMessage("fill the form please");
    } else if (password !== passwordR) {
      setError(true);
      setErrorTypeMessage("password and repeat password do not match");
    } else {
      setSubmitted(true);
      parentCallback({ name, email, password });
      setError(false);
      setErrorTypeMessage("");
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User {name} successfully registered!!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <>
          <h1 className="errorMessage">{errorType}</h1>
        </>
      </div>
    );
  };

  return (
    <div className="form">
      <div>
        <h1>User Registration</h1>
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        {/* Labels and inputs for form data */}
        <label className="label">Name</label>
        <input
          onChange={handleName}
          className="input"
          value={name}
          type="text"
        />

        <label className="label">Email</label>
        <input
          onChange={handleEmail}
          className="input"
          value={email}
          type="email"
        />

        <label className="label">Password</label>
        <input
          onChange={handlePassword}
          className="input"
          value={password}
          type="password"
        />

        <label className="label">Password repeat</label>
        <input
          onChange={handlePasswordR}
          className="input"
          value={passwordR}
          type="password"
        />
        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
      <LoginOutStateCheckAndNavigate isLoged={isLoged} />
    </div>
  );
}
