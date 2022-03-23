const readEnv = (name: string): string => {
  const value = process.env[name];
  if (value) {
    return value;
  }
  console.error(`Environment variable ${name} is not defined!`);
  return "";
};

export const env = {
  PROJECTS_DIRECTORY: readEnv("PROJECTS_DIRECTORY"),
};
