import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, firestore } from "../../../firebase";
import { AuthContext } from "../../../authContext/AuthContext";
const StudentLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { userType } = location.state;
  const { dispatch } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  // const [userNameFocus, setUnFocus] = useState(false);
  const [password, setPassword] = useState("");
  //const [pwdFocus, setpwdFocus] = useState(false);
  const [errormsg, seterrormsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    seterrormsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email === "" || password === "") {
      errRef.current.focus();
      seterrormsg("Username and Password can't be empty");
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const userId = user.uid;
        console.log(user.uid);

        // Fetch user data from Firestore based on email
        const userDoc = await getDoc(doc(firestore, "students", user.uid));
        console.log(userDoc);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log(userData);
          const userDataType = userData.isTutor ? "tutor" : "student";

          // Update the AuthContext with user data
          dispatch({ type: "LOGIN", payload: { userData, userId } });

          if (userType === "tutor" && userDataType === "tutor") {
            navigate("/tutordashboard");
          } else {
            navigate("/userdashboard");
          }
          setLoading(false);
        } else {
          // Handle the case where user data is not found
          seterrormsg("User data not found");
        }

        setEmail("");
        setPassword("");
      } catch (err) {
        const errorMssg = err.message;
        seterrormsg(errorMssg);
        console.error(errorMssg);
      }
    }
  };
  console.log(email);
  console.log(password);

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
          <label htmlFor="email">Email:</label>
          <input
            ref={userRef}
            aria-live="assertive"
            type="email"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            // onFocus={() => setUnFocus(true)}
            // onBlur={() => setUnFocus(false)}
            required
            placeholder="enter username"
            // aria-invalid={validUn ? "false" : "true"}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // onFocus={() => setpwdFocus(true)}
            // onBlur={() => setpwdFocus(false)}
            // onChange={(e) => setPassword(e.target.value)}
            placeholder="enter password"
            // aria-invalid={validpwd ? "false" : "true"}
          />
        </div>

        <button disabled={email === "" || password === ""} type="submit">
          {loading ? "Processing" : "sign-in"}
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
          sign-up
        </a>
      </div>
    </section>
  );
};

export default StudentLogin;
