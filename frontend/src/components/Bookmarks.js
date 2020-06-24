import React, { Suspense, useEffect, useMemo, useState } from "react";
import { FixedSizeList } from "react-window";
import { useWindowSize } from "../hooks";

import { getBookmarksOfGroup } from "../api/bookmarks";
import Bookmark from "./Bookmark";

export default function Bookmarks({ selectedGroup, setEditing }) {
  let [topBookmarks, setTopBookmarks] = useState(
    getBookmarksOfGroup(selectedGroup)
  );
  useEffect(() => {
    setTopBookmarks(getBookmarksOfGroup(selectedGroup));
  }, [selectedGroup]);

  return (
    <div>
      <Suspense fallback={<h1>Loading</h1>}>
        <BookmarkListWindow
          selectedGroup={selectedGroup}
          setEditing={setEditing}
          bookmarksReader={topBookmarks}
        />
      </Suspense>
    </div>
  );
}

function BookmarkListWindow({ setEditing, bookmarksReader }) {
  let bookmarks = bookmarksReader.read();
  const [_width, height] = useWindowSize();

  return (
    <FixedSizeList
      setEditing={setEditing}
      itemData={bookmarks.map((bookmark) =>
        Object.assign(bookmark, {
          changeEditing: setEditing,
        })
      )}
      height={(height * 85) / 100}
      width={700}
      itemSize={120}
      itemCount={bookmarks.length}
    >
      {Bookmark}
    </FixedSizeList>
  );
}
