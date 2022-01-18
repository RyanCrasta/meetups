// ourdomain/new-meetup

import React from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

function NewMeetUp() {
  const router = useRouter();

  async function addMeetUpHandler(enteredMeetUpData) {
    console.log("********");
    console.log(enteredMeetUpData);

    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log("DATA from RESPONSE", data);

    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Add a new Meetup</title>
        <meta name="description" content="Create your own meetup and increase networking" />
      </Head>

      <NewMeetupForm onAddMeetup={addMeetUpHandler} />
    </>
  );
}

export default NewMeetUp;
