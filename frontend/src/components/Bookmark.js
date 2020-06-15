import React from "react";
import { motion } from "framer-motion";
import "./styles/Bookmark.css";

export default function Bookmark({ url, title, description, dateCreated }) {
  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      id="bookmark-container"
    >
      <div id="bookmark-inner-container">
        <span id="bookmark-title">{title}</span>
        <div id="bookmark-url">{url}</div>
        <div id="bookmark-description">{description}</div>
      </div>
    </motion.div>
  );
}
