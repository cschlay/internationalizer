import { readFileSync } from "fs";
import { AUTHENTICATION_COOKIE_NAME } from "../config";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

// RUN ONLY IN SERVER SIDE

export const isAuthenticated = (cookies: NextApiRequestCookies): boolean => {
  return verifyToken(cookies[AUTHENTICATION_COOKIE_NAME]);
};

export const getAuthenticationToken = (
  username: string,
  password: string
): string => {
  const users = getUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    return user.token;
  }
  throw new Error("Invalid credentials...");
};

const verifyToken = (token: string): boolean => {
  const users = getUsers();
  return users.find((u) => u.token === token) !== undefined;
};

const getUsers = () => {
  const data = readFileSync("users.json");
  return JSON.parse(data.toString());
};
