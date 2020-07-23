import {wrapPromise} from './utils';

let host = '';

if (process.env.NODE_ENV === 'production') {
  host = 'http://localhost:8080';
}

export async function saveBookmark({url, title, description, group, tags}) {
  let path = host + '/api/bookmarks/create';
  return await fetch(path, {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({url, title, description, group, tags}),
  });
}

export async function deleteBookmarkAsync(bookmarkId) {
  let path = host + `/api/bookmarks/${bookmarkId}/delete`;
  return await fetch(path, {
    method: 'DELETE',
    credentials: 'include',
  });
}

export async function getBookmarksOfGroupAsync(groupId) {
  let path = host + `/api/groups/${groupId}/bookmarks`;
  let data = await fetch(path, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  // if (data.status === 401) {
  //   return 401;
  // }
  return await data.json();
}

export function getBookmarksOfGroup(groupId) {
  let bookmarksPromise = getBookmarksOfGroupAsync(groupId);
  return wrapPromise(bookmarksPromise);
}
