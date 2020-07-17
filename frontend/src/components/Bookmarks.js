import React, {Suspense} from 'react';
import {VariableSizeList} from 'react-window';
import {useWindowSize} from '../hooks';
import Bookmark from './Bookmark';
import Spinner from './Spinner';
import SpinnerCircle from './SpinnerCircle';

const AddBookmarkSkeleton = React.lazy(() => import('./AddBookmarkSkeleton'));

export default function Bookmarks({reader}) {
  const bookmarks1 = reader.read();

  return (
    <div>
      <Suspense fallback={<p></p>}>
        <AddBookmarkSkeleton />
        <BookmarkListWindow bookmarks={bookmarks1} />
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
