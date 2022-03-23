import { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../utils/env";
import fs from "fs";
import { isAuthenticated } from "../../utils/server-only/authentication";

/**
 * Writes the translation data to the file.
 * The frontend is responsible for serializing the content into a writable format.
 */
const writeChanges = (req: NextApiRequest, res: NextApiResponse<unknown>) => {
  const authenticated = isAuthenticated(req.cookies);
  if (authenticated && req.method === "POST") {
    const { path, project, content }: RequestBody = JSON.parse(req.body);
    fs.writeFileSync(`${env.PROJECTS_DIRECTORY}/${project}/${path}`, content);

    res.status(200).json({});
  } else {
    res.status(404).json({});
  }
};

interface RequestBody {
  project: string;
  path: string;
  content: string;
}

export default writeChanges;
