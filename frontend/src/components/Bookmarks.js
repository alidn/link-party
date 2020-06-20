import React, { Suspense, useState, useEffect } from "react";
import { getAllBookmarksDataWithLimit } from "../api/bookmarks";
import Bookmark from "./Bookmark";
import "./styles/Bookmarks.css";

const topBookmarks = getAllBookmarksDataWithLimit(0, 20);
const otherBookmarks = getAllBookmarksDataWithLimit(20, 200);

export default function Bookmarks() {
  let [o, setO] = useState({ read: () => [] });

  useEffect(() => {
    setTimeout(() => {
      setO(otherBookmarks);
    }, 0);
  }, []);

  return (
    <div id="bookmark-list">
      <BookmarkList bookmarksReader={topBookmarks} />
      <Suspense fallback={<h1>Loading...</h1>}>
        <BookmarkList bookmarksReader={o} />
      </Suspense>
    </div>
  );
}

function BookmarkList({ bookmarksReader }) {
  let bookmarks = bookmarksReader.read();

  return (
    <React.Fragment>
      {bookmarks.map((bookmark) => (
        <Bookmark key={bookmark.id} {...bookmark} />
      ))}
    </React.Fragment>
  );
}
