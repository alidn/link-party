export async function fetchUsernameByIdAsync(userId) {
  let path = `/api/users/${userId}`;
  let data = await fetch(path, {
    credentials: "include",
    method: "GET"
  });

  return await data.json();
}