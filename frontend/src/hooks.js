import { useState, useEffect } from "react";

export function useWindowSize() {
  let [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize");
    };
  }, []);

  return size;
}

export function useClassName(defaultName, conditionals) {
  let [name, setName] = useState(defaultName);
  if (!conditionals) conditionals = [];

  useEffect(() => {
    name = defaultName;
    for (let { className, condition } of conditionals) {
      if (condition) {
        name += " " + className;
      }
    }
  }, conditionals);
}
