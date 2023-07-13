import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
const NAME_REGEX = /^[a-zA-z][a-zA-z-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [validFn, setValidFn] = useState(false);
  const [fnFocus, setFnFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLn, setValidLn] = useState(false);
  const [lnFocus, setLnFocus] = useState(false);

  const [userName, setUserName] = useState("");
  const [validUn, setValidUn] = useState(false);
  const [unFocus, setUnFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validpwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errmssg, setErrmssg] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const valid = NAME_REGEX.test(firstName);
    console.log(valid);
    console.log(firstName);
    setValidFn(valid);
  }, [firstName]);

  useEffect(() => {
    const valid = NAME_REGEX.test(lastName);
    console.log(valid);
    console.log(lastName);
    setValidLn(valid);
  }, [lastName]);

  useEffect(() => {
    const valid = NAME_REGEX.test(userName);
    console.log(valid);
    console.log(userName);
    setValidUn(valid);
  }, [userName]);

  useEffect(() => {
    const valid = PASSWORD_REGEX.test(password);
    console.log(valid);
    console.log(password);
    setValidPwd(valid);
    const match = password == matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);
  console.log(validMatch);
  useEffect(() => {
    setErrmssg("");
  }, [firstName, lastName, userName, password, matchPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const v1 = NAME_REGEX.test(firstName);
    const v2 = NAME_REGEX.test(lastName);
    const v3 = NAME_REGEX.test(userName);
    const v4 = PASSWORD_REGEX.test(password);
    const v5 = validMatch;

    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      errRef.current.focus();
      setErrmssg("invalid Entry");
    } else {
      localStorage.setItem("userName", userName);
      localStorage.setItem("password", password);
      setSuccess(true);
    }
  };

  return (
    <>
      {success ? (
        <section className="register-section">
          <h1>SUCCESS!!!</h1>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Sign In
          </a>
        </section>
      ) : (
        <section className="register-section">
          <p
            aria-live="assertive"
            ref={errRef}
            className={errmssg ? "instructions" : "offscreen"}
          >
            {errmssg}
          </p>
          <form onSubmit={handleSubmit}>
            <h1>Sign up today!</h1>
            <div>
              <label htmlFor="first-name">First Name:</label>
              <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                ref={userRef}
                id="first-name"
                autoComplete="off"
                required
                placeholder="enter first name"
                aria-describedby="iforfn"
                aria-invalid={validFn ? "false" : "true"}
                onFocus={() => setFnFocus(true)}
                onBlur={() => setFnFocus(false)}
              />
              <p
                className={
                  fnFocus && firstName && !validFn
                    ? "instructions"
                    : "offscreen"
                }
                id="iforfn"
              >
                4 to 24 charracters.
                <br />
                Must begin with a letter
              </p>
            </div>
            <div>
              <label htmlFor="last-name">Last Name:</label>
              <input
                type="text"
                id="last-name"
                autoComplete="off"
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="enter last name"
                aria-describedby="iforln"
                aria-invalid={validLn ? "false" : "true"}
                onFocus={() => setLnFocus(true)}
                onBlur={() => setLnFocus(false)}
              />
              <p
                className={
                  lnFocus && lastName && !validLn ? "instructions" : "offscreen"
                }
                id="iforln"
              >
                4 to 24 charracters.
                <br />
                Must begin with a letter
              </p>
            </div>
            <div>
              <label htmlFor="user-name">UserName:</label>
              <input
                type="text"
                id="user-name"
                autoComplete="off"
                onChange={(e) => setUserName(e.target.value)}
                required
                placeholder="enter username"
                aria-describedby="iforun"
                aria-invalid={validUn ? "false" : "true"}
                onFocus={() => setUnFocus(true)}
                onBlur={() => setUnFocus(false)}
              />
              <p
                className={
                  unFocus && userName && !validUn ? "instructions" : "offscreen"
                }
                id="iforun"
              >
                4 to 24 charracters.
                <br />
                Must begin with a letter
              </p>
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="enter password"
                aria-describedby="iforpwd"
                aria-invalid={validpwd ? "false" : "true"}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                className={
                  pwdFocus && password && !validpwd
                    ? "instructions"
                    : "offscreen"
                }
                id="iforpwd"
              >
                8 to 24 charracters.
                <br />
                Must include upper and lowercase letters, a number and a special
                character a letter
              </p>
            </div>
            <div>
              <label htmlFor="confirm-pwd">Confim Password:</label>
              <input
                type="password"
                id="confirm-pwd"
                onChange={(e) => setMatchPassword(e.target.value)}
                required
                placeholder="re-enter password to confirm"
                aria-describedby="iforpwdc"
                aria-invalid={validMatch ? "false" : "true"}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
                id="iforpwdc"
              >
                must match password!
              </p>
            </div>
            <button
              disabled={
                !validFn || !validLn || !validMatch || !validpwd || !validUn
                  ? true
                  : false
              }
              type="submit"
            >
              Sign-up
            </button>
          </form>
          <div className="redirect">
            <p>Already Registered?</p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Sign In
            </a>
          </div>
        </section>
      )}
    </>
  );
};

export default Register;
