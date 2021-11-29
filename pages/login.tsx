import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

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
    <div>
      <input
        name="username"
        value={data.username}
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        name="password"
        value={data.password}
        placeholder="Password"
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default LoginPage;
