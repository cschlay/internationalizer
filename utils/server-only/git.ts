import { env } from "../env";
import { readdirSync } from "fs";
import { spawnSync } from "child_process";

export class Git {
  private readonly path;

  constructor(project: string) {
    const projects: string[] = readdirSync(env.PROJECTS_DIRECTORY, {
      withFileTypes: false,
    }) as string[];
    if (projects.includes(project)) {
      this.path = `${process.env.PROJECTS_DIRECTORY}/${project}`;
    } else {
      throw new Error("Project doesn't exists!");
    }
  }

  // All these commands should almost always succeed
  branch(): string {
    const { output } = spawnSync("git", ["branch"], {
      cwd: this.path,
    });
    // The git tool will always return current branch as the first element
    return output[1].toString().split("\n")[0].replace("* ", "");
  }

  commit() {
    spawnSync("yarn", ["prettier", "--write", "translations"], {
      cwd: this.path,
    });
    spawnSync("git", ["commit", "-m", "Internationalizer commit"], {
      cwd: this.path,
    });
  }

  stageAll() {
    spawnSync("git", ["add", "."], { cwd: this.path });
  }

  push() {
    spawnSync("git", ["push"], { cwd: this.path });
  }
}
