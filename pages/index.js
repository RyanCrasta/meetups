import React from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const DUMMY_MEETUPS = [
  {
    id: "meet1",
    title: "Beautiful Lake",
    image:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1111&q=80",
    address: "Moraine Lake, Canada",
  },
  {
    id: "meet2",
    title: "Northern Lights",
    image:
      "https://images.unsplash.com/photo-1464054313797-e27fb58e90a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
    address: "Jasper National Park, Jasper, Canada",
  },
];

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="A huge list of good meeting places" />
      </Head>

      <MeetupList meetups={props.meetups} />
    </>
  );
}

// 1st method
// this code will run during build process
// data fetching for pre-rendering
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://meetmanager:ryanrocks99@cluster0.wr99p.mongodb.net/meets?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("places");

  const meetups = await meetupsCollection.find().toArray();

  console.log("ALL MEETUPS", meetups);

  client.close();

  // always return object
  return {
    // this will be set as props in HomePage component
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },

    // number of SEC nextJS will wait until it
    // regenerates this page for incoming req
    // if u have not set revalidate then this page
    // will be generated just during BUILD process
    revalidate: 10,
  };
}

// 2nd method
// when u want to regenerate page for every
// incoming request use getServerSideProps
// it will run on server after deployment

// export function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
