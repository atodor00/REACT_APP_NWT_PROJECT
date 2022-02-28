import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function MyProfile({ name, email, password, isLoged }) {
  // States for login
  const [name, setName] = useState(name || "");
  const [email, setEmail] = useState(email || "");
  const [password, setPassword] = useState(password || "");

  return (
    <div>
      <>welcome to my profile component</>
      {isLoged && (
        <>
          <Navigate to="/" />
          console.log("not loged menu")
        </>
      )}
    </div>
  );
}
