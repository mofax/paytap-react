import { css } from "../stitches.config";
import useForm from "../ReactHooks/useForm";
import React from "react";

const loginPageCSS = css({
  width: 300,
  margin: "auto",
  marginTop: 250,
  "& h1": {
    fontSize: "2rem",
  },
  "& input": {
    marginBottom: 10,
  },
});

function LoginPage() {
  const { register, values } = useForm("login-form");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event);
  }

  return (
    <div className={loginPageCSS()}>
      <h1>Login Page</h1>
      <form onSubmit={submit}>
        <input
          placeholder={"username"}
          {...register<string>("username")}
          autoComplete={"off"}
        />
        <input
          placeholder={"password"}
          type={"password"}
          {...register<string>("password")}
        />
        <button>GO</button>
      </form>
    </div>
  );
}

export default LoginPage;
