import React, { Suspense, useEffect, useState } from "react";
import { VariableSizeList } from "react-window";
import { useWindowSize } from "../hooks";

import { getBookmarksOfGroup } from "../api/bookmarks";
import Bookmark from "./Bookmark";
import Spinner from "./Spinner";
import AddBookmarkSkeleton from "./AddBookmarkSkeleton";

export default function Bookmarks({ selectedGroup }) {
  let topBookmarks = useBookmarks(selectedGroup);

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <AddBookmarkSkeleton group={selectedGroup} />
        <BookmarkListWindow bookmarksReader={topBookmarks} />
      </Suspense>
    </div>
  );
}

function BookmarkListWindow({ bookmarksReader }) {
  let bookmarks = bookmarksReader.read();
  const [, height] = useWindowSize();

  const getItemSize = (index) => {
    let descriptionLines = Math.floor(bookmarks[index].description.length / 84);
    let titleLines = Math.floor(bookmarks[index].title.length / 40);
    return 210 + descriptionLines * 20 + titleLines * 30;
  };

  return (
    <VariableSizeList
      itemData={bookmarks.map((bookmark) => Object.assign(bookmark)).reverse()}
      height={(height * 85) / 100}
      width={700}
      itemSize={getItemSize}
      itemCount={bookmarks.length}
    >
      {Bookmark}
    </VariableSizeList>
  );
}

function useBookmarks(groupId) {
  let [topBookmarks, setTopBookmarks] = useState({
    read: () => [],
  });

  useEffect(() => {
    setTopBookmarks(getBookmarksOfGroup(groupId));
  }, [groupId]);

  return topBookmarks;
}
