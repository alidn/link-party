import React, {Suspense, useEffect} from 'react';
import {FixedSizeList} from 'react-window';
import {getAllGroups} from '../api/groups';
import {useWindowSize} from '../hooks';
import {useParams} from 'react-router-dom';
import {atom, selectorFamily, useSetRecoilState} from 'recoil/dist';
import {getBookmarksOfGroupAsync} from '../api/bookmarks';
import Spinner from './Spinner';
import {Group} from './Group';
import AddGroup from './AddGroup';

const groups = getAllGroups();

export const currentBookmarksState = atom({
  key: 'currentBookmarksState',
  default: [],
});

export const currentGroupIDState = atom({
  key: 'group-id',
  default: sessionStorage.getItem('group-id') || 0,
});

export const currentHoverGroupId = atom({
  key: 'hover-id',
  default: sessionStorage.getItem('group-id') || 0,
});

export default function Groups() {
  let {id} = useParams();
  let setCurrentGroupIDState = useSetRecoilState(currentGroupIDState);

  useEffect(() => {
    setCurrentGroupIDState(parseInt(id));
  }, [id]);

  return (
    <Suspense fallback={<Spinner />}>
      <div className="ml-10 mr-10">
        <AddGroup />
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
