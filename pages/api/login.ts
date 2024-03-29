import { NextApiRequest, NextApiResponse } from "next";
import { AUTHENTICATION_COOKIE_NAME } from "../../app.config";
import { getAuthenticationToken } from "../../utils/server-only/authentication";

const login = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { username, password } = JSON.parse(req.body);
    const token = getAuthenticationToken(username, password);
    res.setHeader(
      "Set-Cookie",
      `${AUTHENTICATION_COOKIE_NAME}=${token}; Path=/`
    );
    res.status(200).json({});
  } else {
    res.status(404).json({});
  }
};

export default login;
