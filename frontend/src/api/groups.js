import {wrapPromise} from './utils';

let url = '';

if (process.env.NODE_ENV === 'production') {
  url = 'http://localhost:8080';
}

async function getAllGroupsAsync() {
  let path = url + '/api/groups';
  let data = await fetch(path, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return await data.json();
}

export function getAllGroups() {
  let groupsPromise = getAllGroupsAsync();
  return wrapPromise(groupsPromise);
}

export async function saveGroupAsync(group) {
  let path = url + '/api/groups/create';
  return await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(group),
  });
}
