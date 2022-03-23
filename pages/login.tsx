import css from "./login.module.css";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { User } from "../types";
import { Button } from "../components/Button";

interface Props {
  user: User;
}

const LoginPage = ({ user }: Props) => {
  const router = useRouter();
  const [data, setData] = useState(user);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
    }).then(() => router.push("/"));
  };

  return (
    <div className={css.Container}>
      <h1>Internationalization Tool</h1>
      <label>
        Username
        <input
          name="username"
          value={data.username}
          placeholder="Username"
          onChange={handleChange}
        />
      </label>

      <label>
        Password
        <input
          name="password"
          value={data.password}
          placeholder="Password"
          onChange={handleChange}
          type="password"
        />
      </label>

      <Button onClick={handleSubmit} inverted>
        Login
      </Button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  if (process.env.NODE_ENV === "development") {
    const users = await import("../users.json");
    return {
      props: {
        user: users.default[0],
      },
    };
  }
  return {
    props: {
      user: {
        username: "",
        password: "",
      },
    },
  };
};

export default LoginPage;
