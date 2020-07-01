import React, { Suspense, useEffect, useState } from "react";
import { VariableSizeList } from "react-window";
import { useWindowSize } from "../hooks";
import { motion, AnimatePresence } from "framer-motion";

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
    index = bookmarks.length - index - 1;
    const minSize = 175;
    const descriptionLineSize = 25;
    const titleLineSize = 15;

    let descriptionLines = Math.ceil(bookmarks[index].description.length / 84);
    let titleLines = Math.ceil(bookmarks[index].title.length / 40);
    return (
      minSize +
      descriptionLines * descriptionLineSize +
      titleLines * titleLineSize
    );
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
