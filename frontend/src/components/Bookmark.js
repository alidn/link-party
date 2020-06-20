import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./styles/Bookmark.css";
import { getNotificationCreator } from "./notification";

const variants = {
  normal: { opacity: 0, display: "none", scale: 0 },
  editing: { opacity: 1, display: "block", scale: 1 },
};

const containerVariants = {
  normal: { scale: 0.91, margin: "10px", marginLeft: "10px" },
  editing: { scale: 1.1, margin: "20px", marginLeft: "50px" },
};

export default function Bookmark({ id, url, title, description, dateCreated }) {
  let [isEditing, setEditing] = useState(false);
  let [addNotif, setAddNotif] = useState(() => {});

  useEffect(() => {
    setTimeout(() => {
      setAddNotif(getNotificationCreator);
    }, 0);
  }, []);

  const save = () => {
    setEditing((v) => !v);
    addNotif("success", 2000);
  };

  const edit = () => {
    setEditing((v) => !v);
  };

  const cancel = () => {
    setEditing((v) => !v);
  };

  return (
    <motion.div
      className={isEditing ? "shadow" : ""}
      initial={{ scale: 0.8 }}
      animate={isEditing ? "editing" : "normal"}
      variants={containerVariants}
      transition={{ ease: "backOut", duration: 0.4 }}
      id="bookmark-container"
    >
      <div id="bookmark-inner-container">
        <div>
          <div hidden={!isEditing}>
            <span onClick={save} className="bookmark-action" id="bookmark-save">
              save{" | "}
            </span>
            <span
              onClick={cancel}
              id="bookmark-cancel"
              className="bookmark-action"
            >
              cancel
            </span>
          </div>

          <div hidden={isEditing}>
            <span id="bookmark-title">{title}</span>
            <span id="bookmark-edit" onClick={edit} className="bookmark-action">
              edit |{" "}
            </span>
            <span id="bookmark-delete" className="bookmark-action">
              delete
            </span>
          </div>

          <motion.div
            id="title-input-container"
            animate={isEditing ? "editing" : "normal"}
            variants={variants}
            transition={{ duration: 0.2 }}
          >
            <label id="title-input-label">title</label>
            <motion.input
              id="title-input"
              defaultValue={title}
              placeholder="title"
            />
          </motion.div>
        </div>

        <div id="bookmark-url">{url}</div>
        <div className="flex-column">
          <div hidden={isEditing} id="bookmark-description">
            {description}
          </div>
          <motion.div
            animate={isEditing ? "editing" : "normal"}
            variants={variants}
            transition={{ duration: 0.2 }}
            id="description-textarea-container"
          >
            <label id="description-textarea-label">description</label>
            <motion.textarea
              id="description-textarea"
              placeholder="Link Description"
              rows={5}
              defaultValue={description}
            />
          </motion.div>
        </div>

        <span id="bookmark-metadata">By you | 2 hours ago</span>
      </div>
    </motion.div>
  );
}
