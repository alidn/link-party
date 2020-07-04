import React, { Suspense } from "react";
import { VariableSizeList } from "react-window";
import { useWindowSize } from "../hooks";
import { getBookmarksOfGroupAsync } from "../api/bookmarks";
import Bookmark from "./Bookmark";
import Spinner from "./Spinner";
import AddBookmarkSkeleton from "./AddBookmarkSkeleton";
import { selector, selectorFamily, useRecoilValue } from "recoil/dist";
import { currentGroupIDState } from "./Groups";

const bookmarksQuery = selectorFamily({
  key: "BookmarksQuery",
  get: (bookmarkID) => async () => {
    return await getBookmarksOfGroupAsync(bookmarkID);
  },
});

const currentBookmarksQuery = selector({
  key: "CurrentBookmarksQuery",
  get: ({ get }) => get(bookmarksQuery(get(currentGroupIDState))),
});

export default function Bookmarks() {
  const bookmarks = useRecoilValue(currentBookmarksQuery);

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <AddBookmarkSkeleton />
        <BookmarkListWindow bookmarks={bookmarks} />
      </Suspense>
    </div>
  );
}

function BookmarkListWindow({ bookmarks }) {
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
