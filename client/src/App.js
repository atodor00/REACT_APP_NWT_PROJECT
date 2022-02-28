import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ContactAbout from "./pages/ContactAbout";
import Posts from "./pages/Posts";

import useLocalStorage from "./components/useLocalStorage";
import CreatePost from "./pages/PostManupulators/CreatePost";
import EditPost from "./pages/PostManupulators/EditPost";
import PostsEditing from "./pages/PostsEditing";

import { SiReact } from "react-icons/si";
import DarkModeIndikator from "./components/DarkModeIndicator";

///////////////////////////////////////////////////////////////////////

export default function App() {
  ///////////////////////////////////////////////////////////////////////////////////////////
  // https://javascript.plainenglish.io/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc //
  // pogledaj ovo kad vidiš parilo je pametno                                              //
  // 2:57 ujutro je                                                                        //
  //                                                                                       //
  //                                                                                       //
  //                                                                                       //
  //                                                                                       //
  //                                                                                       //
  ///////////////////////////////////////////////////////////////////////////////////////////

  const [registerNumber, setRegisterCnt] = useState(0);

  const [isLoged, SetLogedState] = useLocalStorage("isLoged", "");
  const [name, setName] = useLocalStorage("name", "");
  const [email, setEmail] = useLocalStorage("email", "");
  const [password, setPassword] = useLocalStorage("password", "");

  const [nameRegisterArray, setNameRegisterArray] = useLocalStorage(
    "nameRegisterArray",
    ["admin"]
  );
  const [emailRegisterArray, setEmailRegisterArray] = useLocalStorage(
    "emailRegisterArray",
    ["primarus@"]
  );
  const [passwordRegisterArray, setPasswordRegisterArray] = useLocalStorage(
    "passwordRegisterArray",
    ["12"]
  );
  const [lenRegisterArray, setLenRegisterArray] = useLocalStorage(
    "lenRegisterArray",
    1
  );

  const [emailLoged, setEmailLoged] = useState("");
  const [passwordLoged, setPasswordLoged] = useState("");

  const [titleForNewPost, setNewPostTitle] = useState("");
  const [bodyForNewPost, setNewPostBody] = useState("");
  // const [darkMode, SetDarkMode] = useState(false);
  const [darkMode, SetDarkMode] = useLocalStorage("darkMode", false);
  //komplikacije za createPost
  const callbackDarkMode = useCallback((childInfo) => {
    console.log(childInfo);
    SetDarkMode(childInfo.darkMode);
  }, []);
  const callbackRegister = useCallback((childInfo) => {
    setName(childInfo.name);
    setEmail(childInfo.email);
    setPassword(childInfo.password); //bilob nice da je hash

    setNameRegisterArray(() => {
      let tempArr = nameRegisterArray;
      tempArr[lenRegisterArray] = childInfo.name;
      return tempArr;
    });
    setEmailRegisterArray(() => {
      let tempArr = emailRegisterArray;
      tempArr[lenRegisterArray] = childInfo.email;
      return tempArr;
    });
    setPasswordRegisterArray(() => {
      let tempArr = passwordRegisterArray;
      tempArr[lenRegisterArray] = childInfo.password;
      return tempArr;
    });
    setLenRegisterArray(lenRegisterArray + 1);
  }, []);

  const callbackLogin = useCallback((p) => {
    setEmailLoged(p.email);
    setPasswordLoged(p.password);
    // SetLogedState(() => {
    //   if (email === p.email && password === p.password) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });

    if (!isLoged) {
      SetLogedState(() => {
        //for petlja kroz
        // nameRegisterArray
        // emailRegisterArray
        // passwordRegisterArray
        let retn = false;
        for (let index = 0; index < lenRegisterArray; index++) {
          console.log(index);
          let Name = nameRegisterArray[index];
          let Email = emailRegisterArray[index];
          let Password = passwordRegisterArray[index];

          if (Email === p.email && Password === p.password) {
            setName(Name);
            return true;
          }
        }
      });

      setEmailLoged(p.email);
      setPasswordLoged(p.password);
    }
  }, []);

  useEffect(() => {
    darkMode && changeToDarkMode();
    !darkMode && changeToLightMode();
  }, [darkMode]);

  function changeToDarkMode() {
    console.log("you have entered dark mode");
    // document.querySelector("body").style.backgroundColor = "black";
    // document.querySelector("body").style.color = "white";
    document.querySelector("body").style.backgroundColor = "rgb(9 8 8)";
    document.querySelector("body").style.color = "rgb(109 29 32)";
    // document.querySelector(" .form ").style.backgroundColor =
    //   "background: #4f0101";
    // document.querySelector(" .form ").style.background = "#4f0101";
  }
  function changeToLightMode() {
    console.log("you have entered light mode");
    document.querySelector("body").style.backgroundColor = "rgb(252 255 198)";
    document.querySelector("body").style.color = "#3a463a";

    //   document.querySelector(" .form ").style.background =
    //     "background: #cbc5c58a";
  }
  const callbackLogout = useCallback((childInfo) => {
    SetLogedState(false);
    setName("");
    console.log("you have been loged out");
  }, []);

  const callbackCreatePostMustSendDAtaToPost = useCallback((childInfo) => {
    setNewPostTitle(childInfo.title);
    setNewPostBody(childInfo.body);
    console.log(childInfo.title, childInfo.body, name);
  }, []);

  const callbackEditPostMustSendDAtaToPost = useCallback((childInfo) => {
    setNewPostTitle(childInfo.title);
    setNewPostBody(childInfo.body);
    console.log(childInfo.title, childInfo.body, name);
  }, []);

  return (
    <div>
      <span className={isLoged && "userNameSpan"}>
        {name ? (
          <>
            <SiReact /> Welcome user {name} <SiReact />
          </>
        ) : (
          <></>
        )}
      </span>
      <DarkModeIndikator
        parentCallback={callbackDarkMode}
        darkBool={darkMode}
      />
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <MenuBar isLoged={isLoged} parentCallback={callbackLogout} />
                <Home isLoged={isLoged} name={name} />
              </>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <>
                <MenuBar isLoged={isLoged} parentCallback={callbackLogout} />

                <Login parentCallback={callbackLogin} isLoged={isLoged} />
              </>
            }
          />
          <Route
            exact
            path="/register"
            element={
              <>
                <MenuBar isLoged={isLoged} parentCallback={callbackLogout} />

                <Register
                  parentCallback={callbackRegister}
                  props={(name, email)}
                  isLoged={isLoged}
                />
              </>
            }
          />

          <Route
            exact
            path="/contact-about-us"
            element={
              <>
                <MenuBar isLoged={isLoged} parentCallback={callbackLogout} />

                <ContactAbout />
              </>
            }
          />
          <Route
            exact
            path="/posts"
            element={
              <div>
                <MenuBar isLoged={isLoged} parentCallback={callbackLogout} />
                <Posts isLoged={isLoged} />
              </div>
            }
          />
          <Route
            exact
            path="/createPost"
            element={
              <>
                <MenuBar isLoged={isLoged} parentCallback={callbackLogout} />

                <Posts
                  isLoged={isLoged}
                  name={name}
                  titleForNewPost={titleForNewPost}
                  bodyForNewPost={bodyForNewPost}
                  Component={
                    <CreatePost
                      parentCallback={callbackCreatePostMustSendDAtaToPost}
                    />
                  }
                />
              </>
            }
          ></Route>
          <Route
            exact
            path="/editPost"
            element={
              <>
                <MenuBar isLoged={isLoged} parentCallback={callbackLogout} />

                <PostsEditing
                  isLoged={isLoged}
                  name={name}
                  titleForNewPost={titleForNewPost}
                  bodyForNewPost={bodyForNewPost}
                  Component={
                    <EditPost
                      parentCallback={callbackEditPostMustSendDAtaToPost}
                    />
                  }
                />
              </>
            }
          ></Route>

          <Route
            path="*"
            element={
              <h1>
                <br />
                <br />
                Page not found ^-^
              </h1>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
///////////////////////////////////////////////////////////////////////7
