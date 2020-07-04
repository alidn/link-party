import { wrapPromise } from "./utils";

export async function saveBookmark({ url, title, description, group }) {
  let path = "/api/bookmarks/create";
  return await fetch(path, {
    method: "POST",
    credentials: "include",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({ url, title, description, group }),
  });
}

export async function deleteBookmarkAsync(bookmarkId) {
  let path = `/api/bookmarks/${bookmarkId}/delete`;
  return await fetch(path, {
    method: "DELETE",
    credentials: "include",
  });
}

export async function getBookmarksOfGroupAsync(groupId) {
  let path = `/api/groups/${groupId}/bookmarks`;
  let data = await fetch(path, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return await data.json();
}

export function getBookmarksOfGroup(groupId) {
  let bookmarksPromise = getBookmarksOfGroupAsync(groupId);
  return wrapPromise(bookmarksPromise);
}
