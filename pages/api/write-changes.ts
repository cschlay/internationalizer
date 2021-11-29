import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticated } from "../../utils/authentication";

/**
 * Writes the translation data to the file.
 * The frontend is responsible into serializing the content into writable format.
 */
const writeChanges = (req: NextApiRequest, res: NextApiResponse<{}>) => {
  const authenticated = isAuthenticated(req.cookies);
  if (authenticated && req.method !== "POST") {
    const { path, project, content }: RequestBody = JSON.parse(req.body);
    fs.writeFileSync(
      `${process.env.PROJECTS_DIRECTORY}/${project}/${path}`,
      content
    );

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
