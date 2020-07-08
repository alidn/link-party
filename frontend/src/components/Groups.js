import React, {Suspense, useState, useContext} from 'react';
import {FixedSizeList} from 'react-window';
import {getAllGroups} from '../api/groups';
import {useWindowSize} from '../hooks';
import {useHistory} from 'react-router-dom';
import {ThemeContext} from '../App';
import SpinnerCircle from './SpinnerCircle';
import {
  atom,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil/dist';
import {getBookmarksOfGroupAsync} from '../api/bookmarks';

const groups = getAllGroups();

export const currentBookmarksState = atom({
  key: 'currentBookmarksState',
  default: [],
});

export const currentGroupIDState = atom({
  key: 'group-id',
  default: 5,
});

export default function Groups() {
  return (
    <Suspense fallback={<SpinnerCircle />}>
      <div className="ml-10 mr-10">
        <GroupListWindow groupsReader={groups} />
      </div>
    </Suspense>
  );
}

export const bookmarksQuery = selectorFamily({
  key: 'BookmarksQuery',
  get: (groupID) => async () => {
    return await getBookmarksOfGroupAsync(groupID);
  },
});

function Group({index, data, style}) {
  let themeContext = useContext(ThemeContext);
  let history = useHistory();
  let [creatorName] = useState('');
  let groupID = useRecoilValue(currentGroupIDState);
  const {name, id, membersCount} = data[index];
  let setCurrentGroupID = useSetRecoilState(currentGroupIDState);

  const handleClick = () => {
    setCurrentGroupID(id);
    history.push('/' + id);
  };

  return (
    <div
      onClick={handleClick}
      className={`mt-2 cursor-pointer rounded-lg p-5 border ${
        groupID === id
          ? ` border-transparent ${
              themeContext.dark ? 'bg-gray-900' : ' bg-indigo-100'
            }`
          : ` ${
              themeContext.dark ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
            }  border-transparent`
      }  `}
      style={{
        ...style,
        top: style.top + 5,
        height: style.height - 5,
      }}>
      <span>
        <span
          className={`${
            themeContext.dark ? 'text-gray-300' : 'text-gray-700'
          } text-sm`}>
          {creatorName} /{' '}
        </span>
        <span
          className={`${
            themeContext.dark ? 'text-gray-400' : 'text-gray-800'
          } text-lg`}>
          {name}
        </span>
      </span>
      <div
        className={`${
          themeContext.dark ? 'text-gray-400' : 'text-gray-700'
        } text-sm`}>
        <span>{membersCount} members</span>
      </div>
    </div>
  );
}

function GroupListWindow({groupsReader}) {
  let groups = groupsReader.read();
  const [, height] = useWindowSize();

  return (
    <FixedSizeList
      itemData={groups}
      height={(height * 85) / 100}
      width={300}
      itemSize={100}
      itemCount={groups.length}>
      {Group}
    </FixedSizeList>
  );
}
