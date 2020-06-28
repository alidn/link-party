import { wrapPromise } from "./utils";

async function getAllGroupsAsync() {
  let path = "/api/groups";
  let data = await fetch(path, {
    credentials: "include",
    method: "GET"
  });
  return await data.json();
  
  let fakeGroup = {
    name: "Coding",
    creator: "Zas",
    id: 0,
    membersCount: 20,
  };

  let groups = [];
  for (let i = 0; i < 200; i++) {
    groups.push(fakeGroup);
  }
  return groups;
}

export function getAllGroups() {
  let groupsPromise = getAllGroupsAsync();
  return wrapPromise(groupsPromise);
}
