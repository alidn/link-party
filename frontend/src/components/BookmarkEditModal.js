import React, { useEffect } from "react";
import "./styles/BookmarkEditModal.css";

import { useNotification } from "./notification";

export default function BookmarkEditModal({
  setEditing,
  hidden,
  title,
  description,
  url,
}) {
  let addNotif = useNotification();

  useEffect(() => {
  }, [addNotif]);

  const save = () => {};
  const cancel = () => {
    setEditing(false);
  };

  return (
    <div id="modal" hidden={hidden} className="bookmark-edit-modal">
      <div className="title-input-container">
        <label className="title-input-label">title</label>
        <input
          className="title-input"
          defaultValue={title}
          placeholder="title"
        />
      </div>
      <div className="bookmark-url">{url}</div>

      <div
        transition={{ duration: 0.1 }}
        className="description-textarea-container"
      >
        <label className="description-textarea-label">description</label>
        <textarea
          className="description-textarea"
          placeholder="Link Description"
          rows={5}
          defaultValue={description}
        />
      </div>
      <div>
        <span className="bookmark-creator">By you</span>
        <span className="bookmark-group">In personal bookmarks</span>
        <span className="bookmark-time">2 hours ago</span>
      </div>

      <button
        onClick={() => addNotif("success", 1000)}
        className="bookmark-edit-modal-save"
      >
        Save
      </button>
      <button onClick={cancel} className="bookmark-edit-modal-cancel">
        Cancel
      </button>
    </div>
  );
}
