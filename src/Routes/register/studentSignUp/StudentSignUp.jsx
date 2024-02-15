import { useState, useEffect, useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { firestore, auth } from "../../../firebase"; // Adjust the path to your Firebase configuration
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
const USERNAME_REGEX = /^[a-zA-z][a-zA-z-9-_]{3,10}$/;
const NAME_REGEX = /^[A-Za-z][A-Za-z0-9_]{3,29}$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const StudentSignUp = () => {
  const location = useLocation();
  const { userType } = location.state;
  console.log(userType);
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

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validpwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errmssg, setErrmssg] = useState("");
  //const [success, setSuccess] = useState(false);
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
    const valid = USERNAME_REGEX.test(userName);
    console.log(valid);
    console.log(userName);
    setValidUn(valid);
  }, [userName]);

  useEffect(() => {
    const valid = EMAIL_REGEX.test(email);
    console.log(valid);
    console.log(email);
    setValidEmail(valid);
  }, [email]);

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
  //localStorage.clear();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    const v1 = NAME_REGEX.test(firstName);
    const v2 = NAME_REGEX.test(lastName);
    const v3 = USERNAME_REGEX.test(userName);
    const v4 = EMAIL_REGEX.test(email);
    const v5 = PASSWORD_REGEX.test(password);
    const v6 = validMatch;

    if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6) {
      errRef.current.focus();
      setErrmssg("Invalid Entry");
    } else {
      console.log("loading..");
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Get user UID
        const uid = userCredential.user.uid;

        // Create a reference to the Firestore collection
        const usersCollection = collection(firestore, "students");

        // Create a document with UID as the document ID
        const userDocRef = doc(usersCollection, uid);

        // Set data to the document
        await setDoc(userDocRef, {
          firstName,
          lastName,
          userName,
          email,
          isStudent: userType === "student",
          isTutor: userType === "tutor",
          createdAt: serverTimestamp(),
        });

        console.log("User added with UID: ", uid);

        if (userType === "tutor") {
          navigate("/register/tutor");
          console.log("success");
        } else {
          navigate("/login/");
        }
      } catch (error) {
        console.error("Error saving data to Firestore:", error);
        if (error.code === "auth/email-already-in-use") {
          setErrmssg(
            "Email address is already in use. Please use a different email address."
          );
        } else {
          setErrmssg(
            "Error occurred while creating the account. Please try again."
          );
        }
      }
    }
  };

  return (
    <section id="student" className="register-section">
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
            value={firstName}
          />
          <p
            className={
              fnFocus && firstName && !validFn ? "instructions" : "offscreen"
            }
            id="iforfn"
          >
            name must start with a letter(uppercase or lowercase)
            <br />
            must be between 3 and 30 characters long.
            <br />
            Special characters or spaces are not allowed
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
            value={lastName}
          />
          <p
            className={
              lnFocus && lastName && !validLn ? "instructions" : "offscreen"
            }
            id="iforln"
          >
            name must start with a letter(uppercase or lowercase)
            <br />
            must be between 3 and 30 characters long.
            <br />
            Special characters or spaces are not allowed
          </p>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            type="email"
            required
            id="email"
            placeholder="enter valid email"
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="iforemail"
            aria-invalid={validEmail ? "false" : "true"}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            className={
              emailFocus && email && !validEmail ? "instructions" : "offscreen"
            }
            id="ifoemail"
          >
            Enter a valid email address.
            <br />
            email address should follow the standard format:
            <br />
            "john.doe@example.com" is a valid email address
          </p>
        </div>
        <div>
          <label htmlFor="user-name">UserName:</label>
          <input
            type="text"
            id="user-name"
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
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
            username must start with a letter (uppercase or lowercase)
            <br />
            can contain numbers, hyphens, and underscores.
            <br />
            Special characters or spaces are not allowed must be 4 to 12 chars
            long.
          </p>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter password"
            aria-describedby="iforpwd"
            aria-invalid={validpwd ? "false" : "true"}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            className={
              pwdFocus && password && !validpwd ? "instructions" : "offscreen"
            }
            id="iforpwd"
          >
            password must be 8 to 24 characters long
            <br />
            must contain at least one lowercase and uppercase letter
            <br />
            must contain at least one numeric digit.
            <br />
            must contain at least one special character
          </p>
        </div>
        <div>
          <label htmlFor="confirm-pwd">Confim Password:</label>
          <input
            value={matchPassword}
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
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
            id="iforpwdc"
          >
            must match password!
          </p>
        </div>
        <button
          disabled={
            !validFn || !validLn || !validMatch || !validpwd || !validUn
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
  );
};

export default StudentSignUp;
