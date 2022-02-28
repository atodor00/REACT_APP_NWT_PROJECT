import { useState } from "react";

function EditPost({ parentCallback }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [errorType, setErrorTypeMessage] = useState("");
  // Handling the name change

  // Handling the title change
  const handleTitle = (e) => {
    setTitle(e.target.value);
    setSubmitted(false);
  };

  // Handling the body change
  const handleBody = (e) => {
    setBody(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "" || body === "") {
      setError(true);
      setErrorTypeMessage("ispuni formu");
    } else {
      setSubmitted(true);
      parentCallback({ title, body });
      console.log({ title, body });
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
        <h4>new post data in buffer</h4>
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
      <>
        <div className="form">
          <div>
            <h1>EditPost</h1>
          </div>

          {/* Calling to the methods */}
          <div className="messages">
            {errorMessage()}
            {successMessage()}
          </div>

          <form>
            {/* Labels and inputs for form data */}

            <label className="label">Title</label>
            <input
              onChange={handleTitle}
              className="input"
              value={title}
              type="title"
            />

            <label className="label">Body</label>
            <input
              onChange={handleBody}
              className="input"
              value={body}
              type="textarea"
            />

            <button onClick={handleSubmit} className="btn" type="submit">
              Edit
            </button>
          </form>
        </div>
      </>
    </>
  );
}

export default EditPost;
