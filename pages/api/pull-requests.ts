import { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";

const submitPullRequest = (req: NextApiRequest, res: NextApiResponse) => {
  exec("ls -la", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

export default submitPullRequest;
