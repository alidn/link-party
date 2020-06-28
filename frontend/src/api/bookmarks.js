import {wrapPromise} from "./utils";

export async function saveBookmark({url, title, description, group}) {
  let path = "/api/bookmarks/create";
  return await fetch(path, {
    method: "POST",
    credentials: "include",
    headers: new Headers({
      'Content-Type': "application/json"
    }),
    body: JSON.stringify({url, title, description, group})
  });
}

async function fetchAllBookmarksWithLimit(from, to) {
  let url = "/api/bookmarks/" + from + "/" + to;
  let data = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  let bookmark = {
    url: "www.linkmine.ca",
    title: "LinkMine",
    description: "A bookmarking website",
    creator: "you",
  };
  let list = [];
  for (let i = from + 1; i < to; i++) {
    list.push({ ...bookmark, ...{ id: i } });
  }
  return list;
  // return await data.json();
}

async function getBookmarksOfGroupAsync(groupId) {
  let path = `/api/groups/${groupId}/bookmarks`;
  let data = await fetch(path, {
    credentials: "include",
    method: "GET"
  });
  return await data.json();

  let bookmark = {
    url: "www.linkmine.ca " + groupId,
    title: "LinkMine",
    description: "A bookmarking website",
    creator: "you",
  };
  let list = [];
  for (let i = 0; i < 200; i++) {
    list.push({ ...bookmark, ...{ id: i } });
  }
  return list;
}

export function getBookmarksOfGroup(groupId) {
  let bookmarksPromise = getBookmarksOfGroupAsync(groupId);
  return wrapPromise(bookmarksPromise);
}

export function getAllBookmarksDataWithLimit(from, to) {
  let bookmarksPromise = fetchAllBookmarksWithLimit(from, to);
  return wrapPromise(bookmarksPromise);
}

export function fetchFakeDataWithTimeout(fakeData, timeoutMs) {
  let promise = new Promise((resolve) =>
    setTimeout(() => resolve(fakeData), timeoutMs)
  );
  return wrapPromise(promise);
}

export function asyncFetchDataWithTimeout(fakeData, timeoutMs) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(fakeData), timeoutMs)
  );
}
