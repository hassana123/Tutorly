import { useState, useRef, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [userName, setUserName] = useState("");
  const [userNameFocus, setUnFocus] = useState(false);
  const [password, setPassword] = useState("");
  const [pwdFocus, setpwdFocus] = useState(false);
  const [errormsg, seterrormsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    seterrormsg("");
  }, [userName, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName === "" || password === "") {
      errRef.current.focus();
      seterrormsg("Username and Password can't be empty");
    } else if (
      userName !== localStorage.getItem("userName") ||
      password !== localStorage.getItem("password")
    ) {
      errRef.current.focus();
      seterrormsg("Invalid Username or password");
    } else {
      navigate("/user");
      setUserName("");
      setPassword("");
      setSuccess(true);
    }
  };

  // console.log(
  //   localStorage.getItem("userName"),
  //   localStorage.getItem("password")
  // );
  return (
    <section className="login-section">
      <form onSubmit={handleSubmit}>
        <p
          aria-live="assertive"
          ref={errRef}
          className={errormsg ? "instructions" : "offscreen"}
        >
          {errormsg}
        </p>
        <h1>Sign In</h1>
        <div>
          <label htmlFor="user-name">UserName:</label>
          <input
            ref={userRef}
            aria-live="assertive"
            type="text"
            id="user-name"
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            onFocus={() => setUnFocus(true)}
            onBlur={() => setUnFocus(false)}
            // required
            placeholder="enter username"
            // aria-invalid={validUn ? "false" : "true"}
          />
          <p
            className={userName && userNameFocus ? "instructions" : "offscreen"}
          >
            !!! Note username is case Sensitive
          </p>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            // required
            value={password}
            onFocus={() => setpwdFocus(true)}
            onBlur={() => setpwdFocus(false)}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter password"
            // aria-invalid={validpwd ? "false" : "true"}
          />
          <p className={password && pwdFocus ? "instructions" : "offscreen"}>
            !!! Note Password is case Sensitive
          </p>
        </div>

        <button disabled={userName === "" || password === ""} type="submit">
          Sign In
        </button>
      </form>
      <div className="redirect">
        <p>Don't have an account?</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          Sign Up
        </a>
      </div>
    </section>
  );
};

export default Login;
