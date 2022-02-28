import { useCallback, useEffect, useState } from "react";
import { LoginStateCheckAndNavigate } from "../components/LoginStateCheckAndNavigate";
import MenuBarPost from "../components/MenuBarPost";
import useLocalStorage from "../components/useLocalStorage";
import uuid from "react-uuid";
import { Navigate } from "react-router-dom";

function PostsEditing({
  isLoged,
  name,
  Component,
  titleForNewPost,
  bodyForNewPost,
}) {
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
  const [pickedEdit, setPickedEditMutator] = useState("no");
  const [editNum, setEditNum] = useState(0);

  const [len, setLen] = useState(nameArray.length);

  const [post, setPost] = useState({
    len,
    nameArray,
    titleArray,
    bodyArray,
  });

  //   useEffect(() => {
  //     if (
  //       titleForNewPost !== bodyForOldPost &&
  //       bodyForNewPost !== titleForOldPost
  //     ) {
  //       titleForNewPost && bodyForNewPost && console.log("ss");
  //     }
  //   }, [titleForNewPost, bodyForNewPost]);

  const handleEdit = (e) => {
    console.log("handleEdit");
    e.preventDefault();
    if (
      pickedEdit !== "no" &&
      titleForNewPost !== "" &&
      !bodyForNewPost !== ""
    ) {
      console.log("handleEdit well");
      setPickedEditMutator(true);
      setEditNum(e.currentTarget.querySelector("span").className);

      const target = e.currentTarget.querySelector("span").className;
      console.log(target);
      setNameArray(() => {
        let tempArr = nameArray;
        tempArr[target] = name;
        return tempArr;
      });

      setTitleArray(() => {
        let tempArr = titleArray;
        tempArr[target] = titleForNewPost;
        return tempArr;
      });
      setBodyArray(() => {
        let tempArr = bodyArray;
        tempArr[target] = bodyForNewPost;
        return tempArr;
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
      setPickedEditMutator(false);
    } else {
      setPickedEditMutator(true);
    }
  };

  const runCallback = (cb) => {
    return cb();
  };
  return (
    <div className="main-body-container ">
      {/* {uuid()} */}
      <MenuBarPost key={"MenuBarPost"} />
      <>{Component}</>
      {/* <CreatePost></CreatePost> */}
      <div className="post-container">
        {runCallback(() => {
          const row = [];
          for (var i = 0; i < len; i++) {
            row.push(
              <div key={uuid() + "i" + i} className={"post-card " + i}>
                <strong>Author: {post.nameArray[i]}</strong> <br />
                <span>
                  <h3>{post.titleArray[i]}</h3>: {post.bodyArray[i]}
                </span>{" "}
                <br />
                <>
                  <button
                    onClick={handleEdit}
                    className="style-btn btn"
                    type="submit"
                  >
                    <>
                      <span className={i}>Choose this to edit</span>
                    </>
                  </button>{" "}
                </>
              </div>
            );
          }
          return row;
        })}
      </div>
      {!pickedEdit && (
        <>
          <Navigate to="/posts" />
        </>
      )}
      <LoginStateCheckAndNavigate isLoged={isLoged} />
    </div>
  );
}

export default PostsEditing;
