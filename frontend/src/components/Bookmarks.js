import React, {Suspense, useEffect, useMemo, useState} from 'react';
import {VariableSizeList} from 'react-window';
import {useWindowSize} from '../hooks';
import Bookmark from './Bookmark';
import Spinner from './Spinner';
import SpinnerCircle from './SpinnerCircle';

const AddBookmarkSkeleton = React.lazy(() => import('./AddBookmarkSkeleton'));

export default function Bookmarks({reader}) {
  let [bookmarks, setBookmarks] = useState(reader.read());

  useEffect(() => {
    setBookmarks(reader.read());
  }, [reader]);

  const handleSave = (bookmark) => {
    if (!Array.isArray(bookmark.tags)) bookmark.tags = [];
    setBookmarks((prev) => prev.concat(bookmark));
  };

  return (
    <div>
      <Suspense fallback={<p></p>}>
        <AddBookmarkSkeleton handleSave={handleSave} />
        <BookmarkListWindow bookmarks={bookmarks} />
      </Suspense>
    </div>
  );
}

function BookmarkListWindow({bookmarks}) {
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
      itemCount={bookmarks.length}>
      {Bookmark}
    </VariableSizeList>
  );
}
