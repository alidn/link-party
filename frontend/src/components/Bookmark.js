import React, {
  useState,
  useContext,
  useCallback,
  Suspense,
  useEffect,
} from "react";
import { ThemeContext } from "../App";
import { addTagAsync, deleteTagAsync, fetchTagsAsync } from "../api/tags";
import SpinnerCircle from "./SpinnerCircle";
import { Tag } from "./AddBookmarkSkeleton";
import { useNotification } from "./notification";
import { motion } from "framer-motion";
import { addModal } from "./ModalProvider";
import { deleteBookmarkAsync } from "../api/bookmarks";
import { selectorFamily, useRecoilValue } from "recoil/dist";

let EditIcon = React.lazy(() => import("./icons/edit"));
let DeleteIcon = React.lazy(() => import("./icons/delete"));

export default function Bookmark(props) {
  const { id, url, title, description, dateCreated } = props.data[props.index];
  let [isEditing, setEditing] = useState(false);
  let [addedTag, setAddedTag] = useState(null);
  let themeContext = useContext(ThemeContext);
  const showNotification = useNotification();

  const handleAddTag = (tagName) => {
    addTagAsync(tagName, id).then(() => {
      setAddedTag({
        name: tagName,
        id: id,
      });
    });
  };

  const edit = () => {
    let bookmarkEditModal = (
      <div className={`flex flex-col`}>
        <h1 className={`m-3 mx-5 text-2xl text-gray-700`}>Edit Bookmark</h1>
        <div>
          <span className={`ml-3 text-gray-800`}>Title: </span>
          <input
            placeholder={"title"}
            defaultValue={title}
            style={{ color: "#1a73e8" }}
            className={`bg-white w-3/4 m-3 text-lg focus:outline-none focus:border-indigo-400 border border-gray-300 rounded-lg p-2 appearance-none leading-normal`}
          />
        </div>
        <div>
          <span className={`ml-3 text-gray-800`}>Url: </span>
          <input
            className={`bg-white text-gray-700 w-3/4 m-3 focus:outline-none focus:border-indigo-400 border border-gray-300 rounded-lg p-2 appearance-none leading-normal`}
            placeholder={"url"}
            defaultValue={url}
          />
        </div>

        <div>
          <span className={`ml-3 text-gray-800`}>Description: </span>
          <textarea
            placeholder={"description"}
            defaultValue={description}
            style={{ width: "90%" }}
            rows={4}
            className={`bg-white text-gray-700  m-3 focus:outline-none focus:border-indigo-400 border border-gray-300 rounded-lg p-2 appearance-none leading-normal`}
          />
        </div>
      </div>
    );
    addModal(bookmarkEditModal);
  };

  const deleteBookmark = () => {
    let deleted = deleteBookmarkAsync(id)
      .then((resp) => resp.body)
      .then((body) => {
        const reader = body.getReader();
        reader.read().then(({ value }) => (deleted = value));
      });
    if (deleted) {
      showNotification("Bookmark deleted", "success", 2000);
    } else {
      showNotification(
        "There was a problem, couldn't deleted the bookmark",
        "error",
        3000
      );
    }
  };

  const handleDeleteTag = async (index, tagId) => {
    let deleted = await deleteTagAsync(id, tagId).then((v) => {
      return v;
    });
    if (deleted) {
      showNotification("Deleted tag", "success", 2000);
    } else {
      showNotification(
        "There was a problem, couldn't delete the tag",
        "error",
        2000
      );
    }
    return deleted;
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
          <a
            target={"_blank"}
            href={url.startsWith("http") ? url : `http://${url}`}
          >
            <span
              style={{ color: "#1a73e8" }}
              className={`${
                themeContext.dark ? "text-gray-500" : "text-indigo-500"
              } text-2xl hover:underline cursor-pointer mr-10`}
            >
              {title}
            </span>
          </a>
          <div
            className={`flex flex-row absolute`}
            style={{ top: "1rem", right: "1rem" }}
          >
            <span
              className="flex flex-row text-sm cursor-pointer"
              onClick={edit}
            >
              <Suspense fallback={""}>
                <EditIcon tailwindColor={`text-gray-600`} />
              </Suspense>
              <span className={`text-gray-600 hover:text-blue-500`}>edit </span>
            </span>
            <span className="flex flex-row text-sm cursor-pointer">
              <Suspense fallback={""}>
                <DeleteIcon tailwindColor={`text-gray-600`} />
              </Suspense>
              <span
                onClick={deleteBookmark}
                className={`text-gray-600 hover:text-red-500`}
              >
                {" "}
                delete
              </span>
            </span>
          </div>
        </div>

        <div className="bookmark-url text-gray-600 mb-3">{url}</div>
        <Description description={description} isEditing={isEditing} />
        <Suspense fallback={<SpinnerCircle />}>
          <Tags
            handleDelete={handleDeleteTag}
            bookmarkId={id}
            handleAddTag={handleAddTag}
            addedTag={addedTag}
          />
        </Suspense>
        <span className="bookmark-creator">By you </span>
        <span className="bookmark-time">2 hours ago</span>
      </div>
    </div>
  );
}

const tagsQuery = selectorFamily({
  key: "TagQuery",
  get: (bookmarkID) => async () => {
    return await fetchTagsAsync(bookmarkID);
  },
});

function Tags({ bookmarkId }) {
  const tags = useRecoilValue(tagsQuery(bookmarkId));

  return (
    <div className="mt-1 mb-1">
      <span>Tags: </span>
      <TagSkeleton />
      {tags ? (
        tags.map((tag, index) => (
          <Tag key={tag.id} index={index} tagName={tag.name} tagId={tag.id} />
        ))
      ) : (
        <span>Loading...</span>
      )}
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
      style={{ borderRadius: "2rem" }}
      className="p-1 pl-4 w-24 text-gray-600 ml-2 focus:outline-none focus:border-indigo-400 border border-gray-400 rounded appearance-none leading-normal"
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

function Description({ description }) {
  return (
    <div className={`flex-column mb-3`}>
      <div className="bookmark-description text-gray-800">{description}</div>
    </div>
  );
}
