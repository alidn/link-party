import React, { useState, useEffect } from "react";
import "./styles/Bookmark.css";
import { getNotificationCreator, useNotification } from "./notification";

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
    <div style={props.style} className={"bookmark-container"}>
      <div className="bookmark-inner-container">
        <div>
          <Title isEditing={isEditing} title={title} setEditing={setEditing} />
          <span className="bookmark-edit bookmark-action" onClick={edit}>
            edit |{" "}
          </span>
          <span className="bookmark-delete bookmark-action">delete</span>
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
  return (
    <React.Fragment>
      <span className="bookmark-title">{title}</span>
    </React.Fragment>
  );
}

function Description({ isEditing, description }) {
  return (
    <div className="flex-column">
      <div className="bookmark-description">{description}</div>
    </div>
  );
}
