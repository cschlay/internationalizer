import { GetServerSideProps } from "next";
import css from "./index.module.css";
import { env } from "../utils/env";
import glob from "glob";
import { isAuthenticated } from "../utils/authentication";

interface Props {
  projects: string[];
}

const IndexPage = ({ projects }: Props) => {
  return (
    <div className={css.IndexPage}>
      <h1>Select a Project</h1>
      <ul>
        {projects.map((project) => (
          <li key={project}>
            <a href={`/session/${project}`}>{project}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authenticated = isAuthenticated(context.req.cookies);
  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: "/login",
      },
    };
  }

  const root = env.PROJECTS_DIRECTORY.replaceAll("\\", "/");
  const pattern = `${root}/*`;
  const directories: string[] = glob.sync(pattern, {});
  const projects = directories.map((directory) =>
    directory.replace(`${root}/`, "")
  );

  return {
    props: { projects },
  };
};

export default IndexPage;
