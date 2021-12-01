import css from "./GitToolBar.module.css";
import { ProjectDetails } from "../types";
import { Button } from "./Button";

interface Props {
  project: ProjectDetails;
}

export const GitToolBar = ({ project }: Props) => {
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

      <div className={css.Actions}>
        <Button onClick={handlePullRequest} inverted>
          Submit for Review
        </Button>
      </div>
    </div>
  );
};
