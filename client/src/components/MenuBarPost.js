import { Link } from "react-router-dom";

export default function MenuBarPost({ isLoged, parentCallback }) {
  const btnStyle = {
    // background: "repeating-radial-gradient(azure, rgb(56 39 72) 180px)",
    border: "3px solid #f9f7f75e",
    borderRadius: "15px",
    padding: "3px",
    fontStyle: "italic",
    fontFamily: "'Quicksand', sans-serif",
  };

  return (
    <div
      className="navBar bottomborderRadiusclass"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        border: "1px solid black",
        padding: "4px",
        background: "#b6b48ce8",
        // background: "repeating-radial-gradient(#db4e4e, #020000a6 2000px)",
        // background: "background: #2879b4a1",
      }}
    >
      {" "}
      <>
        <Link to="/createPost">
          <button style={btnStyle}>Create/Delete post</button>
        </Link>
        <Link as="button" to="/editPost">
          <button style={btnStyle}>Edit post</button>
        </Link>
      </>
    </div>
  );
}
