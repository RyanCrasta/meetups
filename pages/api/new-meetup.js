// will run on server
// URL: /api/new-meetup
 
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { title, imgSource, address } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://meetmanager:ryanrocks99@cluster0.wr99p.mongodb.net/meets?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("places");

    const results = await meetupsCollection.insertOne(data);

    console.log("RESULTS", results);

    client.close();

    res.status(201).json({
        message: 'Meetup Inserted :)'
    })
  }
}

export default handler;
