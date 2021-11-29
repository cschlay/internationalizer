import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Writes the translation data to the file.
 * The frontend is responsible into serializing the content into writable format.
 */
const writeChanges = (req: NextApiRequest, res: NextApiResponse<{}>) => {
  const { path, project, content }: RequestBody = JSON.parse(req.body);
  fs.writeFileSync(
    `${process.env.PROJECTS_DIRECTORY}/${project}/${path}`,
    content
  );

  res.status(200).json({});
};

interface RequestBody {
  project: string;
  path: string;
  content: string;
}

export default writeChanges;
