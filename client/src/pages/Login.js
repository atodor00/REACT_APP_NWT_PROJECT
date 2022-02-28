import { useState } from "react";
import { Navigate } from "react-router-dom";
import { LoginOutStateCheckAndNavigate } from "../components/LoginStateCheckAndNavigate";

export default function Login({ parentCallback, isLoged }) {
  // States for login

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [errorType, setErrorTypeMessage] = useState("");
  // Handling the name change

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

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError(true);
      setErrorTypeMessage("ispuni formu");
    } else {
      setSubmitted(true);
      parentCallback({ email, password });
      setError(false);
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
        <h2>login data sent... Wrong credentials</h2>
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
    <>
      <LoginOutStateCheckAndNavigate isLoged={isLoged} />
      <div className="form">
        <div>
          <h1>User Login</h1>
        </div>

        {/* Calling to the methods */}
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>

        <form>
          {/* Labels and inputs for form data */}

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

          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
