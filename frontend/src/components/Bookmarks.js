import React, { Suspense } from "react";
import { getAllBookmarksDataWithLimit } from "../api/bookmarks";
import Bookmark from "./Bookmark";

const topBookmarks = getAllBookmarksDataWithLimit(0, 20);
const otherBookmarks = getAllBookmarksDataWithLimit(20, 100);

export default function Bookmarks() {
  return (
    <div>
      <BookmarkList bookmarksReader={topBookmarks} />
      <Suspense>
        <BookmarkList bookmarksReader={otherBookmarks} />
      </Suspense>
    </div>
  );
}

function BookmarkList({ bookmarksReader }) {
  let bookmarks = bookmarksReader.read();

  return (
    <div>
      {bookmarks.map((bookmark) => (
        <Bookmark key={bookmark.id} {...bookmark} />
      ))}
    </div>
  );
}
