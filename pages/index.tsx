import { GetServerSideProps } from "next";
import css from "./index.module.css";
import glob from "glob";

interface Props {
  projects: string[];
}

const IndexPage = ({ projects }: Props) => {
  return (
    <div className={css.Container}>
      <h1>Open a Project</h1>
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
  const root = process.env.PROJECTS_DIRECTORY.replaceAll("\\", "/");
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
