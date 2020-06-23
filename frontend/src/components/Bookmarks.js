import React, { Suspense, useState, forwardRef } from "react";
import { FixedSizeList } from "react-window";

import { getAllBookmarksDataWithLimit } from "../api/bookmarks";
import Bookmark from "./Bookmark";
import "./styles/Bookmarks.css";

const topBookmarks = getAllBookmarksDataWithLimit(0, 20);

export default function Bookmarks({ setEditing, setLowOpacity }) {
  return (
    <div id="bookmark-list">
      <Suspense fallback={<h1>Loading</h1>}>
        <BookmarkListWindow
          setEditing={setEditing}
          bookmarksReader={topBookmarks}
        />
      </Suspense>
    </div>
  );
}

function BookmarkListWindow({ setEditing, bookmarksReader }) {
  let bookmarks = bookmarksReader.read();

  return (
    <FixedSizeList
      setEditing={setEditing}
      itemData={bookmarks.map((bookmark) =>
        Object.assign(bookmark, { changeEditing: setEditing })
      )}
      height={900}
      width={700}
      itemSize={120}
      itemCount={20000}
    >
      {Bookmark}
    </FixedSizeList>
  );
}
