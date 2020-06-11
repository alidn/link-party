import React, { useState } from "react";
import base64 from "base-64";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const getWidth = (): number => {
  return window.innerWidth < 500 ? 300 : 500;
};

export default function Login() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  const login = async () => {
    const url = "/api/user";

    await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      }),
    });
  };

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        padding: "100px",
        margin: "auto",
        width: getWidth() + "px",
      }}
    >
      <TextField
    style={{margin: "20px"}}
    placeholder="username"
    onChange={(e) => setUsername(e.target.value)}
    />
      <TextField
        style={{ margin: "20px" }}
        id="standard-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        style={{ margin: "20px" }}
        onClick={login}
        variant="contained"
        color="primary"
      >
        Send
      </Button>
    </div>
  );
}
