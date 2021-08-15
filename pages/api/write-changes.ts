import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Writes the translation data to the file.
 * The frontend is responsible into serializing the content into writable format.
 */
const writeChanges = (
  req: NextApiRequest,
  res: NextApiResponse<{}>
): Promise<null> => {
  return new Promise((resolve) => {
    const { path, content }: RequestBody = JSON.parse(req.body);
    fs.writeFileSync(path, content);
    res.status(200).json({});
    resolve(null);
  });
};

interface RequestBody {
  path: string;
  content: string;
}

export default writeChanges;
