import React, { useEffect, useState } from "react";
import { getDefaultSession, logout } from "@inrupt/solid-client-authn-browser";
import {
  getSolidDataset,
  getThing,
  setThing,
  buildThing,
  createThing,
  saveSolidDatasetAt,
  createSolidDataset,
  getInteger,
  getDecimal,
} from "@inrupt/solid-client";

const Profile = (props) => {
  const [webId, setWebId] = useState();

  // Logout of POD, clear session storage and redirect to home after logout
  const signOut = async () => {
    await logout();
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/";
  };

  // Write current time into the POD
  const writeData = async () => {
    const currentTime = new Date().getTime();

    var solidDataset = createSolidDataset();
    const thing = buildThing(createThing({ name: "time" }))
      .addInteger("https://schema.org/Integer", currentTime)
      .build();

    solidDataset = setThing(solidDataset, thing);

    try {
      await saveSolidDatasetAt(
        `${webId}/pod-test/${currentTime}`,
        solidDataset,
        { fetch: getDefaultSession().fetch }
      );
      console.log("Writing data to POD successful");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("webId")) {
      setWebId(sessionStorage.getItem("webId"));
    }
  });

  return (
    <>
      <button
        id="signOut"
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
      <p id="webId">{webId}</p>
      <button
        id="writeData"
        onClick={() => {
          writeData();
        }}
      >
        Write Time
      </button>
    </>
  );
};

export default Profile;
