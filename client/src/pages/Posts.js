import { useCallback, useEffect, useState } from "react";
import { LoginStateCheckAndNavigate } from "../components/LoginStateCheckAndNavigate";
import MenuBarPost from "../components/MenuBarPost";
import useLocalStorage from "../components/useLocalStorage";
import uuid from "react-uuid";

function Posts({ isLoged, name, Component, titleForNewPost, bodyForNewPost }) {
  const [nameArray, setNameArray] = useLocalStorage("nameArray", [
    "Ante",
    "Šime",
    "Juraj",
  ]);

  const [titleArray, setTitleArray] = useLocalStorage("titleAkkrray", [
    "adcnaskdncank",
    "title2",
    "afmlska asmkldfl",
  ]);
  const [bodyArray, setBodyArray] = useLocalStorage("bodkyArray", [
    "texst adv adsv  as d sda c as  dcasdcjas djc jska c jacjadsjkcjas ccsjadcksadjc asdcj asdc  asd c ascsa dc  asd c as dc as c a s c sa c s cs sc  dc ac  sd ca scd as c as c das cas ",
    "h ajd cascn nad che",
    `iasjdic
    sfdfe sdfajkdf askdfkdsf asfdasf
    asdfa afaf af dsa fa ad fag
    asjdixdkjkasld`,
  ]);
  const [titleForOldPost, setTitleForOldPost] = useLocalStorage(
    "OldTitleForNewPost",
    ""
  );
  const [bodyForOldPost, setBodyForOldPost] = useLocalStorage(
    "OldBodyForNewPost",
    ""
  );

  const [len, setLen] = useState(nameArray.length);

  const [post, setPost] = useState({
    len,
    nameArray,
    titleArray,
    bodyArray,
  });
  const [deleted, setDeleted] = useState(false);
  const handleDelete = (e) => {
    e.preventDefault();
    console.log("handleDelete");
    let t = e.currentTarget.querySelector("span").className;

    console.log(t);

    setNameArray(() => {
      let rez = [];
      for (let index = 0; index < nameArray.length; index++) {
        let item = nameArray[index];
        if (index != t) {
          let rezlen = rez.length;
          rez[rezlen] = item;
          console.log(rez);
        }
      }

      return rez;
    });
    setTitleArray(() => {
      let rez = [];
      for (let index = 0; index < titleArray.length; index++) {
        let item = titleArray[index];
        if (index != t) {
          let rezlen = rez.length;
          rez[rezlen] = item;
          console.log(rez);
        }
      }

      return rez;
    });
    setBodyArray(() => {
      let rez = [];
      for (let index = 0; index < bodyArray.length; index++) {
        let item = bodyArray[index];
        if (index != t) {
          let rezlen = rez.length;
          rez[rezlen] = item;
          console.log(rez);
        }
      }

      return rez;
    });
    setLen(() => {
      return len - 1;
    });
    setPost(() => {
      const temp = {
        len,
        nameArray,
        titleArray,
        bodyArray,
      };
      return temp;
    });
    setDeleted(true);
  };
  useEffect(() => {
    if (
      titleForNewPost !== titleForOldPost &&
      bodyForNewPost !== bodyForOldPost
    ) {
      titleForNewPost && bodyForNewPost && handleCreate();
      console.log(titleForNewPost, titleForOldPost);
    }
  }, [titleForNewPost, bodyForNewPost]);

  useEffect(() => {
    setTimeout(() => {
      deleted && window.location.reload(false);
    }, 120);
  }, [deleted]);

  function handleCreate() {
    console.log("handleCreate");
    setNameArray(() => {
      let tempArr = nameArray;
      tempArr[len] = name;
      return tempArr;
    });

    setTitleArray(() => {
      let tempArr = titleArray;
      tempArr[len] = titleForNewPost;
      return tempArr;
    });
    setBodyArray(() => {
      let tempArr = bodyArray;
      tempArr[len] = bodyForNewPost;
      return tempArr;
    });
    setLen(len + 1);
    setPost(() => {
      const temp = {
        len,
        nameArray,
        titleArray,
        bodyArray,
      };
      return temp;
    });

    setBodyForOldPost(bodyForNewPost);
    setTitleForOldPost(titleForNewPost);
  }

  const runCallback = (cb) => {
    return cb();
  };
  return (
    <div className="main-body-container ">
      <MenuBarPost key={"MenuBarPost"} />
      <>{Component}</>

      <div className="post-container">
        {runCallback(() => {
          const row = [];
          for (var i = 0; i < len; i++) {
            row.push(
              <div key={uuid() + "i" + i} className={"post-card " + i}>
                <strong>Author: {post.nameArray[i]}</strong> <br />
                <span>
                  <h3>{post.titleArray[i]}</h3> {post.bodyArray[i]}
                </span>{" "}
                <br />
                <button
                  className="style-btn btn"
                  onClick={handleDelete}
                  type="submit"
                >
                  <span className={i}>Delete</span>
                </button>
              </div>
            );
          }
          return row;
        })}
      </div>
      <LoginStateCheckAndNavigate isLoged={isLoged} />
    </div>
  );
}

export default Posts;
