import { wrapPromise, wrapPromiseWithFakeDelay } from "./utils";

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
