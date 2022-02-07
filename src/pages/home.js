import React, { useEffect } from "react";
import {
  login,
  handleIncomingRedirect,
  getDefaultSession,
  onLogin,
} from "@inrupt/solid-client-authn-browser";

const Home = (props) => {
  useEffect(() => {}, []);

  // Store Web ID into session storage and print success message
  onLogin(() => {
    const profileDocumentUrl = new URL(getDefaultSession().info.webId);
    const webId = profileDocumentUrl.origin;

    sessionStorage.setItem("webId", webId);
    console.log(`POD login successful with web ID: ${webId}`);
    window.location.href = "/profile"
  });

  // Function to handle incoming redirects, to complete login process
  handleIncomingRedirect({
    url: window.location.href,
    restorePreviousSession: true,
  });

  // Function definition for signing into POD
  const signInPOD = (e) => {
    e.preventDefault();

    login({
      redirectUrl: window.location.href,
      oidcIssuer: "https://inrupt.net",
      clientName: "POD Test",
    });
  };

  return (
    <>
      <button
        id="signIn"
        onClick={(e) => {
          signInPOD(e);
          // console.log('hi')
        }}
      >
        SignIn
      </button>
    </>
  );
};

export default Home;
