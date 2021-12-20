import { NextApiRequest, NextApiResponse } from "next";
import { Git } from "../../utils/git";
import { isAuthenticated } from "../../utils/authentication";

interface RequestBody {
  project: string;
}

const api = (req: NextApiRequest, res: NextApiResponse) => {
  const authenticated = isAuthenticated(req.cookies);

  if (authenticated && req.method === "POST") {
    const { project }: RequestBody = JSON.parse(req.body);
    const succeeded = submitPullRequest(project);
    res.status(succeeded ? 200 : 400).json({});
  } else {
    res.status(404).json({});
  }
};

const submitPullRequest = (project: string): boolean => {
  const git = new Git(project);
  git.stageAll();
  git.commit();
  git.push();
  return true;
};

export default api;
