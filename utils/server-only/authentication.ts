import { AUTHENTICATION_COOKIE_NAME } from "../../app.config";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { User } from "../../types";
import { readFileSync } from "fs";

export const isAuthenticated = (cookies: NextApiRequestCookies): boolean => {
  return verifyToken(cookies[AUTHENTICATION_COOKIE_NAME]);
};

export const getAuthenticationToken = (
  username: string,
  password: string
): string => {
  const users = getUsers();
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user && user.token) {
    return user.token;
  }
  throw new Error("Invalid credentials...");
};

const verifyToken = (token: string): boolean => {
  const users = getUsers();
  return users.find((user) => user.token === token) !== undefined;
};

const getUsers = (): User[] => {
  const data = readFileSync("users.json");
  return JSON.parse(data.toString());
};
