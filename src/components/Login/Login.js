import React, { useContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../Firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, email } = res.user;
        const signedInUser = {
          name: displayName,
          email: email,
        };
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
  };

  return (
    <div>
      <h1>This is Login</h1>
      <button onClick={handleGoogleSignIn}> Google Sign In </button>
    </div>
  );
};

export default Login;
