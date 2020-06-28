import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { ThemeContext } from "../App";

let EditIcon = React.lazy(() => import("./icons/edit"));
let DeleteIcon = React.lazy(() => import("./icons/delete"));

export default function Bookmark(props) {
  const {
    changeEditing,
    id,
    url,
    title,
    description,
    dateCreated,
  } = props.data[props.index];
  let [isEditing, setEditing] = useState(false);
  let themeContext = useContext(ThemeContext);

  const edit = () => {
    changeEditing(true);
  };

  const save = () => {
    setEditing((v) => !v);
  };

  const cancel = () => {
    setEditing((v) => !v);
    changeEditing(false);
  };

  return (
    <div
      className={` ${
        themeContext.dark ? "bg-gray-900" : "bg-gray-100"
      } p-5 rounded-lg`}
      style={{
        ...props.style,
        top: props.style.top + 10,
        height: props.style.height - 10,
      }}
    >
      <div className="">
        <div className="flex flex-row items-center">
          <a href={url.startsWith("http") ? url : `http://${url}`}>
            <span
              style={{ color: "#1a73e8" }}
              className={`${
                themeContext.dark ? "text-gray-500" : "text-blue-500"
              } text-2xl hover:underline cursor-pointer mr-10`}
            >
              {title}{" "}
            </span>
          </a>
          <span className="flex flex-row text-sm cursor-pointer" onClick={edit}>
            <EditIcon tailwindColor={`text-gray-600`} />
            <span className={`text-gray-600 hover:text-blue-500`}>edit |</span>
          </span>
          <span className="flex flex-row text-sm cursor-pointer">
            <DeleteIcon tailwindColor={`text-gray-600`} />
            <span className={`text-gray-600 hover:text-red-500`}>delete</span>
          </span>
        </div>

        <div className="bookmark-url">{url}</div>
        <Description description={description} isEditing={isEditing} />
        <Tags />
        <span className="bookmark-creator">By you </span>
        <span className="bookmark-time">2 hours ago</span>
      </div>
    </div>
  );
}

function Tags({ tags }) {
  return (
    <div className="mt-1 mb-1">
      <span>Tags: </span>
      <TagSkeleton />
    </div>
  );
}

function TagSkeleton({ handleAddTag }) {
  let [isAdding, setAdding] = useState(false);
  const inputRef = useCallback((node) => {
    if (node) {
      node.focus();
    }
  }, []);

  const handleTagChange = (e) => {
    let value = e.target.value;
    if (value.endsWith(" ")) {
      handleAddTag(value.slice(0, value.length - 1));
      e.target.value = "";
    }
  };

  const handleAdd = () => {
    setAdding(true);
  };

  return isAdding ? (
    <input
      ref={inputRef}
      onBlur={() => setAdding(false)}
      onChange={handleTagChange}
      placeholder={"tag"}
      className="p-1 w-24 text-gray-600 ml-2 focus:outline-none focus:border-indigo-400 border rounded-xl border-gray-400 rounded appearance-none leading-normal"
    />
  ) : (
    <span
      className="border cursor-pointer hover:bg-gray-200 p-1 border-dashed border-gray-600 text-gray-600 rounded-full"
      onClick={handleAdd}
    >
      add +
    </span>
  );
}

function Description({ isEditing, description }) {
  return (
    <div className="flex-column">
      <div className="bookmark-description">{description}</div>
    </div>
  );
}
