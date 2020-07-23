import {wrapPromise} from './utils';

export async function fetchTagsAsync(bookmarkId) {
  let path = `/api/bookmarks/${bookmarkId}/tags`;
  let data = await fetch(path, {
    method: 'GET',
    credentials: 'include',
  });
  return await data.json();
}

export async function deleteTagAsync(bookmarkId, tagId) {
  let path = `/api/bookmarks/${bookmarkId}/tags/${tagId}/delete`;
  let data = await fetch(path, {
    method: 'DELETE',
    credentials: 'include',
  });
  return await data.json();
}

export function fetchTags(bookmarkId) {
  let tagsPromise = fetchTagsAsync(bookmarkId);
  return wrapPromise(tagsPromise);
}

export async function addTagAsync(tagName, bookmarkId) {
  let path = `/api/bookmarks/${bookmarkId}/tags/create/${tagName}`;
  return await fetch(path, {
    method: 'POST',
    credentials: 'include',
  });
}

export function addTag(tagName, bookmarkId) {
  let addTagPromise = addTagAsync(tagName, bookmarkId);
  return wrapPromise(addTagPromise);
}
