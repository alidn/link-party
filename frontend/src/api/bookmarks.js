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

export function getBookmarksOneByOne(from, to) {
  let result = [];
  for (let i = from; i < to; i++) {
    let bookmarkPromise = fetchAllBookmarksWithLimit(i, i + 1);
    result.push(wrapPromise(bookmarkPromise));
  }
  return result;
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
