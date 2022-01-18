import React from "react";
import MeetUpDetail from "../components/meetups/MeetUpDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

function MeetUpDetails(props) {
  console.log("PROPS", props);
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="description"
          content={props.meetupData.description}
        />
      </Head>
      <MeetUpDetail
        imgSource={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

// use if using getStaticProps in DYNAMIC page
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://meetmanager:ryanrocks99@cluster0.wr99p.mongodb.net/meets?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("places");

  // to ONLY include _id
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // if false ur paths contains all supported meetUpId value
    // false will show 404 if page not found
    fallback: false,

    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetUpId = context.params.meetupId;
  console.log("%%%%", meetUpId);
  console.log("RYAAAAAAAAAAN");

  const client = await MongoClient.connect(
    "mongodb+srv://meetmanager:ryanrocks99@cluster0.wr99p.mongodb.net/meets?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("places");

  const selectedMeetups = await meetupsCollection.findOne({
    _id: ObjectId(meetUpId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetups._id.toString(),
        title: selectedMeetups.title,
        address: selectedMeetups.address,
        image: selectedMeetups.image,
        description: selectedMeetups.description,
      },
    },
    revalidate: 10,
  };
}

export default MeetUpDetails;
