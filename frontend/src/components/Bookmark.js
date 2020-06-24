import React, { useState, useContext } from "react";
import { ThemeContext } from "../App";

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
      className={`${
        themeContext.dark ? "bg-gray-800" : "bg-gray-100"
      } p-5 rounded-lg`}
      style={props.style}
    >
      <div className="">
        <div>
          <span
            className={`${
              themeContext.dark ? "text-gray-500" : "text-blue-600"
            } text-2xl`}
          >
            {title}{" "}
          </span>
          <span className="bookmark-edit bookmark-action" onClick={edit}>
            edit |
          </span>
          <span className="bookmark-delete bookmark-action"> delete</span>
        </div>

        <div className="bookmark-url">{url}</div>
        <Description description={description} isEditing={isEditing} />
        <span className="bookmark-creator">By you</span>
        <span className="bookmark-group">In personal bookmarks</span>
        <span className="bookmark-time">2 hours ago</span>
      </div>
    </div>
  );
}

function Title({ title, isEditing, setEditing }) {
  return <React.Fragment></React.Fragment>;
}

function Description({ isEditing, description }) {
  return (
    <div className="flex-column">
      <div className="bookmark-description">{description}</div>
    </div>
  );
}
