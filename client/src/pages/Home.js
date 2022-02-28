import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home({ name, isLoged }) {
  return (
    <>
      {isLoged && <h1>Welcome [{name}]</h1>}
      {!isLoged && <h1>Welcome, you are still not loged in... :(</h1>}
      <div className="centerDivClass">
        <p>Ovo je projekt za nwt kolegiji</p>
        <Link to="/register">Register</Link>
        <br></br>
        <Link to="/">Home</Link>
        <br></br>
        <Link to="/login">Login</Link>
        <br></br>
        <Link to="/contact-about-us">About-Contact</Link>
      </div>
    </>
  );
}

export default Home;
