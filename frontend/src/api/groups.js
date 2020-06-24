import { wrapPromise } from "./utils";

async function getAllGroupsAsync() {
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
