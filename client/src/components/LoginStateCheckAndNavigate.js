import { Navigate } from "react-router-dom";
export function LoginStateCheckAndNavigate({ isLoged }) {
  return (
    <>
      {!isLoged && (
        <>
          <Navigate to="/" />
          console.log("not loged menu")
        </>
      )}
    </>
  );
}

export function LoginOutStateCheckAndNavigate({ isLoged }) {
  return (
    <>
      {isLoged && (
        <>
          <Navigate to="/" />
          console.log("not loged menu")
        </>
      )}
    </>
  );
}
