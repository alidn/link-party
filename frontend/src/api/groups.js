import { wrapPromise } from "./utils";

async function getAllGroupsAsync() {
  let path = "/api/groups";
  let data = await fetch(path, {
    credentials: "include",
    method: "GET",
    headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  return await data.json();
}

export function getAllGroups() {
  let groupsPromise = getAllGroupsAsync();
  return wrapPromise(groupsPromise);
}
