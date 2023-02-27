import React, { useState } from 'react'
import { useLocalState } from '../../utils/useLocalState'
import './Login.css'; // import the CSS file

function Login() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    const reqBody = {"username": username, "password": password};
    fetch("api/auth/login", { "headers": { "Content-Type": "application/json" }
      ,method: "post", body: JSON.stringify(reqBody)})
      .then((res) => {
        if(res.status === 200){
          return Promise.all([res, res.headers]);
        }
        else{
          return Promise.reject("Invalid Login Attempt")
        }
      })
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
        window.location.href = "/dashboard";
      })
      .catch((err) => alert(err));
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="formItemUser"> 
          <label>Username</label>
          <input id="username" placeholder='enter your username...' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
      </form>

      <form>
        <div className="formItemPassword"> 
          <label>Password</label>
          <input id="password" type="password" placeholder='enter your password...' value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="formButton"> 
            <button onClick={() => handleLogin()}>Login</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
