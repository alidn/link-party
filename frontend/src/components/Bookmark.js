import React, {
  useState,
  useContext,
  useCallback,
  Suspense,
  useEffect,
} from 'react';
import {ThemeContext} from '../App';
import {addTagAsync, deleteTagAsync, fetchTagsAsync} from '../api/tags';
import SpinnerCircle from './SpinnerCircle';
import {Tag} from './AddBookmarkSkeleton';
import {useNotification} from './notification';
import {addModal} from './ModalProvider';
import {deleteBookmarkAsync} from '../api/bookmarks';
import {selectorFamily, useRecoilValue} from 'recoil/dist';
import {motion} from 'framer-motion';

let EditIcon = React.lazy(() => import('./icons/edit'));
let DeleteIcon = React.lazy(() => import('./icons/delete'));

function daysElapsedSince(date) {
  let elapsedMs = new Date().getTime() - date.getTime();
  return 30 - Math.floor(-elapsedMs / (1000 * 60 * 60 * 24));
}

function parseDate(date) {
  let [year, month, day] = date.split('-');
  return new Date(year, month, day);
}

export default function Bookmark(props) {
  const {id, url, title, description, handleDelete, createdDate} = props.data[
    props.index
  ];
  let daysPassed = daysElapsedSince(parseDate(createdDate));
  let [isEditing] = useState(false);
  let [addedTag, setAddedTag] = useState(null);
  let themeContext = useContext(ThemeContext);
  const showNotification = useNotification();

  const handleAddTag = (tagName) => {
    addTagAsync(tagName, id).then(() => {
      setAddedTag({
        name: tagName,
        id: id,
      });
    });
  };

  const edit = () => {
    let bookmarkEditModal = (
      <div className={`flex flex-col`}>
        <h1 className={`m-3 mx-5 text-2xl text-gray-700`}>Edit Bookmark</h1>
        <div>
          <span className={`ml-3 text-gray-800`}>Title: </span>
          <input
            placeholder={'title'}
            defaultValue={title}
            style={{color: '#1a73e8'}}
            className={`bg-white w-3/4 m-3 text-lg focus:outline-none focus:border-indigo-400 border border-gray-300 rounded p-2 appearance-none leading-normal`}
          />
        </div>
        <div>
          <span className={`ml-3 text-gray-800`}>Url: </span>
          <input
            className={`bg-white text-gray-700 w-3/4 m-3 focus:outline-none focus:border-indigo-400 border border-gray-300 rounded p-2 appearance-none leading-normal`}
            placeholder={'url'}
            defaultValue={url}
          />
        </div>

        <div>
          <span className={`ml-3 text-gray-800`}>Description: </span>
          <textarea
            placeholder={'description'}
            defaultValue={description}
            style={{width: '90%'}}
            rows={4}
            className={`bg-white text-gray-700  m-3 focus:outline-none focus:border-indigo-400 border border-gray-300 rounded p-2 appearance-none leading-normal`}
          />
        </div>
      </div>
    );
    addModal(bookmarkEditModal);
  };

  const deleteBookmark = () => {
    handleDelete(id);
  };

  const handleDeleteTag = async (index, tagId) => {
    let deleted = await deleteTagAsync(id, tagId).then((v) => {
      return v;
    });
    if (deleted) {
      showNotification('Deleted tag', 'success', 2000);
    } else {
      showNotification(
        "There was a problem, couldn't delete the tag",
        'error',
        2000
      );
    }
    return deleted;
  };

  return (
    <div
      className={` ${
        themeContext.dark ? 'bg-gray-800' : 'bg-gray-100'
      } p-5 rounded-lg`}
      style={{
        backgroundColor: themeContext.dark ? '#363c48' : '',
        ...props.style,
        top: props.style.top + 10,
        height: props.style.height - 10,
      }}>
      <div className="">
        <div className="flex flex-row items-center">
          <a
            target={'_blank'}
            href={url.startsWith('http') ? url : `http://${url}`}>
            <span
              style={{color: themeContext.dark ? '#ffa7c4' : '#1a73e8'}}
              className={`${
                themeContext.dark ? 'text-gray-200' : 'text-indigo-500'
              } text-2xl hover:underline cursor-pointer mr-10`}>
              {title}
            </span>
          </a>
          <div
            className={`flex flex-row absolute`}
            style={{top: '1rem', right: '1rem'}}>
            <span
              className="flex flex-row text-sm cursor-pointer"
              onClick={edit}>
              <Suspense fallback={''}>
                <EditIcon tailwindColor={`text-gray-600`} />
              </Suspense>
              <span
                className={`${
                  themeContext.dark ? 'text-gray-200' : 'text-gray-600'
                } hover:text-blue-500`}>
                edit{' '}
              </span>
            </span>
            <span className="flex flex-row text-sm cursor-pointer">
              <Suspense fallback={''}>
                <DeleteIcon tailwindColor={`text-gray-600`} />
              </Suspense>
              <span
                onClick={deleteBookmark}
                className={`${
                  themeContext.dark ? 'text-gray-200' : 'text-gray-600'
                } hover:text-red-500`}>
                {' '}
                delete
              </span>
            </span>
          </div>
        </div>

        <div className="bookmark-url text-gray-600 mb-3">{url}</div>
        <Description
          dark={themeContext.dark}
          description={description}
          isEditing={isEditing}
        />
        <Suspense fallback={<SpinnerCircle />}>
          <Tags
            dark={themeContext.dark}
            handleDelete={handleDeleteTag}
            bookmarkId={id}
            handleAddTag={handleAddTag}
            addedTag={addedTag}
          />
        </Suspense>
        <span
          className={`${
            themeContext.dark ? 'text-gray-300' : 'text-gray-600'
          }`}>
          By you{' '}
        </span>
        <span
          className={`${
            themeContext.dark ? 'text-gray-300' : 'text-gray-600'
          }`}>
          {daysPassed === 0 ? 'today' : `${daysPassed} days ago`}
        </span>
      </div>
    </div>
  );
}

const tagsQuery = selectorFamily({
  key: 'TagQuery',
  get: (bookmarkID) => async () => {
    return await fetchTagsAsync(bookmarkID);
  },
});

function Tags({bookmarkId, dark}) {
  const initTags = useRecoilValue(tagsQuery(bookmarkId));
  let [tags, setTags] = useState([]);
  const addNotification = useNotification();

  useEffect(() => {
    setTags(initTags);
  }, [initTags]);

  const handleAddTag = (newTag) => {
    addTagAsync(newTag, bookmarkId)
      .then((v) => v.json())
      .then((t) => {
        setTags((prev) => prev.concat(t));
      });
  };

  const handleDeleteTag = (index, tagId) => {
    deleteTagAsync(bookmarkId, tagId).then((deleted) => {
      if (deleted) {
        addNotification('deleted tag', 'success', 2000);
        setTags((prev) => prev.filter((el) => el.id !== tagId));
      } else {
        addNotification('there was an error', 'error', 2000);
      }
    });
  };

  return (
    <div className="mt-1 mb-1">
      <span className={`${dark ? 'text-gray-200' : 'text-gray-600'}`}>
        Tags:{' '}
      </span>
      <TagSkeleton handleAddTag={handleAddTag} dark={dark} />
      {tags ? (
        tags.map((tag, index) => (
          <Tag
            handleDelete={handleDeleteTag}
            dark={dark}
            key={tag.id}
            index={index}
            tagName={tag.name}
            tagId={tag.id}
          />
        ))
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}

function TagSkeleton({handleAddTag, dark}) {
  let [isAdding, setAdding] = useState(false);
  const inputRef = useCallback((node) => {
    if (node) {
      node.focus();
    }
  }, []);

  const handleTagChange = (e) => {
    let value = e.target.value;
    if (value.endsWith(' ')) {
      handleAddTag(value.slice(0, value.length - 1));
      e.target.value = '';
    }
  };

  const handleAdd = () => {
    setAdding(true);
  };

  return isAdding ? (
    <input
      ref={inputRef}
      onBlur={() => setAdding(false)}
      onChange={handleTagChange}
      placeholder={'tag'}
      style={{borderRadius: '2rem'}}
      className={`p-1 pl-4 w-24 ${dark && 'bg-gray-600'} ${
        dark ? 'text-gray-200' : 'text-gray-600 ml-2'
      } focus:outline-none focus:border-indigo-400 border border-gray-400 rounded appearance-none leading-normal`}
    />
  ) : (
    <span
      className={`border cursor-pointer ${
        dark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
      } p-1 border-dashed border-gray-600 ${
        dark ? 'text-gray-200' : 'text-gray-600'
      } rounded-full`}
      onClick={handleAdd}>
      add +
    </span>
  );
}

function Description({description, dark}) {
  return (
    <div className={`flex-column mb-3`}>
      <div
        className={`bookmark-description ${
          dark ? 'text-gray-300' : 'text-gray-800'
        }`}>
        {description}
      </div>
    </div>
  );
}
