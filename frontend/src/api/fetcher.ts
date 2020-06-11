import {User} from './types';
import base64 from 'base-64';

export const login = async (username: string, password: string): Promise<boolean> {
  const url = "/auth/login";
  const data = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
    }),
  });
  return data.status != 200;
};

export const fetchCurrentUser = async ():Promise<User> => {
    const url = "/api/user";
    const data = await fetch(url, {
      method: "GET",
      credentials: "include"
    });
    const user: User = await data.json();
    return user;
};