import { useCallback, useState } from "react";

import useLocalStorage from "../components/useLocalStorage";

import { BsFillBrightnessHighFill, BsFillMoonFill } from "react-icons/bs";
///////////////////////////////////////////////////////////////////////

export default function DarkModeIndikator({ parentCallback, darkBool }) {
  const [darkMode, SetDarkMode] = useLocalStorage("darkMode", false);
  parentCallback({ darkMode });

  const handleClick = (e) => {
    SetDarkMode(!darkMode);
    parentCallback({ darkMode });
  };
  return (
    <span className="darkModeIndicatorContainer">
      {darkMode ? (
        <BsFillMoonFill onClick={handleClick} />
      ) : (
        <BsFillBrightnessHighFill onClick={handleClick} />
      )}
    </span>
  );
}
///////////////////////////////////////////////////////////////////////7
