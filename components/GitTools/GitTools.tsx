import { Button } from "../atoms/Button/Button";
import { ProjectDetails } from "../../types";
import css from "./GitTools.module.css";

interface Props {
  project: ProjectDetails;
}

export const GitTools = ({ project }: Props) => {
  const handlePullRequest = async () => {
    await fetch("/api/pull-requests", {
      method: "POST",
      body: JSON.stringify({
        project: project.name,
      }),
    });
  };

  return (
    <div className={css.GitToolBar}>
      <h3>{project.name.replaceAll("-", " ")}</h3>
      <small>
        <strong>Branch</strong>: {project.branch}
      </small>

      <div className={css.Actions}>
        <Button onClick={handlePullRequest} inverted>
          Commit and Push
        </Button>
      </div>
    </div>
  );
};
