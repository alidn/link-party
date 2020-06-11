import React, { useEffect, useState } from "react";

const fetchUser = async () => {
  const url = "/api/user";

  let data = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const user = await data.json();
  console.log(user);
  return user;
};

export default function Main() {
  let [user, setUser] = useState({ username: null });

  useEffect(() => {
    fetchUser().then((u) => setUser(u));
  }, []);

  return <div>{user.username ? user.username : "Not found"}</div>;
}
