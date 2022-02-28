import { empty } from "apollo-boost";
import { Link } from "react-router-dom";

export default function MenuBar({ isLoged, parentCallback }) {
  let isDifferent = true;
  let btnStyle = {
    background:
      "repeating-radial-gradient(rgb(255 247 4), rgb(56 39 72) 180px)",

    border: "4px double #f9f7f75e",
    borderRadius: "21px",
    padding: "4px",
    fontStyle: "bold",
    fontFamily: "'Quicksand', sans-serif",
    background: "#c6c6c6b0",
  };
  if (isLoged) {
    btnStyle = {
      background: "repeating-radial-gradient(white, black 180px)",
      border: "4px double #f9f7f75e",
      borderRadius: "21px",
      padding: "4px",
      fontStyle: "bold",
      fontFamily: "'Quicksand', sans-serif",
    };
  }
  let btnStyleDiff = {
    background:
      "repeating-radial-gradient(rgb(201 204 71), rgb(0 0 0 / 0%) 180px)",
    border: "4px double #f9f7f75e",
    borderRadius: "21px",
    padding: "4px",
    fontStyle: "bold",
    color: "white",
    fontFamily: "'Quicksand', sans-serif",
    background: "rgb(118 123 91)",
  };

  const emptyAll = (e) => {
    localStorage.clear();
    window.location.reload(false);
  };
  return (
    <div
      className="navBar"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        border: "1px solid black",
        padding: "6px",
        background: "repeating-radial-gradient(#db4e4e, #020000a6 2000px)",
        background: "#000305a1",
      }}
    >
      <Link to="/">
        {" "}
        <button style={btnStyle}>Home</button>
      </Link>

      {!isLoged && (
        <>
          <Link to="/register">
            {" "}
            <button style={btnStyle}>Register</button>
          </Link>
          <Link to="/login">
            {" "}
            <button style={btnStyle}>Login</button>
          </Link>
        </>
      )}

      <Link to="/contact-about-us">
        <button style={btnStyle}>About-Contact</button>
      </Link>

      {isLoged && (
        <>
          <Link to="/posts">
            <button style={btnStyle}>Posts</button>
          </Link>

          <button
            className="btn-logout"
            style={btnStyle}
            onClick={parentCallback}
          >
            Logout
          </button>

          <button className="btn-logout" style={btnStyle} onClick={emptyAll}>
            Empty all("localStorage")
          </button>
        </>
      )}
      {!isLoged && (
        <>
          <button className="btn-logout" style={btnStyle} onClick={emptyAll}>
            Empty all("localStorage")
          </button>
        </>
      )}
    </div>
  );
}
