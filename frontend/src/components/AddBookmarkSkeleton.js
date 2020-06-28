import React, { useState, useCallback, useRef } from "react";
import { saveBookmark } from "../api/bookmarks";
import SpinnerCircle from "./SpinnerCircle";

let CloseIcon = React.lazy(() => import("./icons/close"));

export default function AddBookmarkSkeleton({ group }) {
  let [isAdding, setAdding] = useState(false);
  let [url, setUrl] = useState("");
  let [description, setDescription] = useState("");
  let [title, setTitle] = useState("");
  let [loading, setLoading] = useState(false);
  let [tags, setTags] = useState([""]);

  const handleTagDelete = (index) => {
    setTags((prevTags) => prevTags.filter((_value, idx) => idx !== index));
  };

  const handleTagChange = (e) => {
    let value = e.target.value;
    if (value.endsWith(" ")) {
      // TODO: remove duplicates.
      setTags((prevTag) => prevTag.concat([value.slice(0, value.length - 1)]));
      e.target.value = "";
    }
  };

  const save = () => {
    setLoading(true);
    saveBookmark({ url, description, group, title }).then((v) => {
      setLoading(false);
      setAdding(false);
    });
  };

  const cancel = () => setAdding((v) => !v);

  let titleInputRef = useCallback((node) => {
    if (node) {
      node.focus();
    }
  }, []);

  return isAdding ? (
    <div className={`bg-gray-100 rounded-lg pt-5 pb-5 mb-3`}>
      <input
        onChange={(e) => setTitle(e.target.value)}
        ref={titleInputRef}
        className="m-3 bg-white focus:outline-none focus:border-indigo-400 border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal"
        type="text"
        placeholder="title"
      />
      <input
        onChange={(e) => setUrl(e.target.value)}
        className="m-3 bg-white focus:outline-none focus:border-indigo-400 border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal"
        type="text"
        placeholder="url"
      />
      <div className={`m-4 text-gray-700`}>
        <span>Tags (separated by space): </span>
        <input
          onChange={handleTagChange}
          type={"text"}
          placeholder={`tagname`}
          className={`bg-white w-24 focus:outline-none focus:border-indigo-400 border border-gray-300 rounded-lg p-2 appearance-none leading-normal`}
        />
        {tags.map((tag, index) => (
          <Tag
            handleDelete={handleTagDelete}
            key={index}
            index={index}
            tagName={tag}
          />
        ))}
      </div>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        className="m-3 bg-white focus:outline-none focus:border-indigo-400 border border-gray-300 rounded-lg py-2 w-3/4 px-4 block appearance-none leading-normal"
        placeholder="description"
      />
      <button
        style={{ color: "#1a73e8", minWidth: "4rem", maxWidth: "8rem" }}
        className={`m-3 p-1 text-lg rounded text-gray-700 hover:bg-gray-300 hover:text-blue-800 focus:outline-none focus:bg-gray-400 text-center`}
        onClick={save}
      >
        {loading ? (
          <div className={`flex flex-row`}>
            Save
            <SpinnerCircle /> : ""
          </div>
        ) : (
          "Save"
        )}
      </button>
      <button
        style={{ color: "#1a73e8" }}
        className={`m-3 p-1 focus:bg-gray-400 text-gray-700 hover:bg-gray-300 m-3 p-1 text-lg w-16 rounded focus:outline-none`}
        onClick={cancel}
      >
        Cancel
      </button>
    </div>
  ) : (
    <div
      onClick={() => setAdding(true)}
      className="p-3 mb-3 rounded focus:bg-gray-200 hover:bg-gray-100 cursor-pointer border border-gray-600 border-dashed text-center"
    >
      <p className="text-xl text-gray-600">Add Bookmark + </p>
    </div>
  );
}

export function Tag({ tagName, handleDelete, index }) {
  return (
    <span
      hidden={index === 0}
      style={{ borderRadius: "2em" }}
      className={`ml-2 border text-sm border-indigo-400 py-1 px-3`}
    >
      {tagName}
      <span onClick={() => handleDelete(index)} className={`cursor-pointer`}>
        <CloseIcon width={18} height={18} />
      </span>
    </span>
  );
}
