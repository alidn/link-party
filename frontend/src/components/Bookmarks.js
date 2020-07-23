import React, {Suspense, useEffect, useMemo, useState, useRef} from 'react';
import {VariableSizeList} from 'react-window';
import {useWindowSize} from '../hooks';
import Bookmark from './Bookmark';
import {useHistory} from 'react-router-dom';
import {motion} from 'framer-motion';
import {
  useSetRecoilState,
  useRecoilCallback,
  useRecoilValue,
} from 'recoil/dist';
import {currentGroupIDState} from './Groups';
import {deleteBookmarkAsync} from '../api/bookmarks';
import {useNotification} from './notification';
import Spinner from './Spinner';
import SearchInput from './SearchInput';

const AddBookmarkSkeleton = React.lazy(() => import('./AddBookmarkSkeleton'));

export default function Bookmarks({reader}) {
  let [bookmarks, setBookmarks] = useState(reader.read());
  let [searchResult, setSearchResult] = useState([]);
  let [filteredBookmarks, setFilteredBookmarks] = useState(bookmarks);
  let [isPending, setPending] = useState(false);
  let setCurrentBookmarkID = useSetRecoilState(currentGroupIDState);
  let groupId = useRecoilValue(currentGroupIDState);
  let history = useHistory();

  useEffect(() => {
    setBookmarks(reader.read());
  }, [reader]);

  useEffect(() => {
    if (searchResult.length === 0) {
      setFilteredBookmarks(bookmarks);
      return;
    }
    setFilteredBookmarks(() => {
      console.log(
        bookmarks.filter((bookmark) => searchResult.includes(bookmark.id))
      );
      return bookmarks.filter((bookmark) => searchResult.includes(bookmark.id));
    });
  }, [searchResult, bookmarks]);

  if (bookmarks === 401) {
    history.push('/unauthorized');
    setCurrentBookmarkID(-1);
    return <p></p>;
  }

  const handleSave = (bookmark) => {
    if (!Array.isArray(bookmark.tags)) bookmark.tags = [];
    setBookmarks((prev) => prev.concat(bookmark));
  };

  const search = async (value) => {
    let keywords = value.split(' ');
    setPending(true);
    let ids = await fetch(`/api/groups/${groupId}/bookmarks/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        keywords: keywords,
      }),
    }).then((resp) => resp.json());
    setPending(false);
    setSearchResult(ids);
  };

  const clear = () => {
    setSearchResult([]);
  };

  return (
    <div>
      <Suspense fallback={<p></p>}>
        {isPending && <Spinner />}
        <AddBookmarkSkeleton handleSave={handleSave} />
        <SearchInput clear={clear} search={search} />
        <BookmarkListWindow bookmarks={filteredBookmarks} />
      </Suspense>
    </div>
  );
}

function BookmarkListWindow({bookmarks}) {
  const [, height] = useWindowSize();
  let showNotification = useNotification();
  let [deleted, setDeleted] = useState([]);
  let listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0, true);
    }
  }, [bookmarks]);

  const getItemSize = (index) => {
    index = bookmarks.length - index - 1;
    const minSize = 175;
    const descriptionLineSize = 22;
    const titleLineSize = 15;

    let descriptionLines = Math.ceil(bookmarks[index].description.length / 84);
    let titleLines = Math.ceil(bookmarks[index].title.length / 40);
    return (
      minSize +
      descriptionLines * descriptionLineSize +
      titleLines * titleLineSize
    );
  };

  const handleDelete = (id) => {
    let deleted = deleteBookmarkAsync(id)
      .then((resp) => resp.body)
      .then((body) => {
        const reader = body.getReader();
        reader.read().then(({value}) => (deleted = value));
      });
    if (deleted) {
      // window.location.reload();
      setDeleted((prev) => prev.concat(id));
      showNotification('Deleted bookmark', 'success', 1500);
    } else {
      showNotification(
        "There was a problem, couldn't deleted the bookmark",
        'error',
        3000
      );
    }
  };

  return (
    <VariableSizeList
      ref={listRef}
      itemKey={(index, data) => {
        return data[index].id;
      }}
      itemData={bookmarks
        .map((bookmark) =>
          Object.assign(bookmark, {
            handleDelete: handleDelete,
          })
        )
        // .filter((bookmark) => !deleted.includes(bookmark.id))
        .reverse()}
      height={(height * 85) / 100}
      width={700}
      itemSize={getItemSize}
      itemCount={bookmarks.length}>
      {Bookmark}
    </VariableSizeList>
  );
}
