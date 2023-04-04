const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = 5000;
const cors = require("cors");
// middleware
require("dotenv").config();
app.use(cors());
app.use(express.json());

async function run() {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h9wahhk.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  console.log(uri);
  try {
    const contentCollection = client
      .db("ooloi")
      .collection("content_collection");

    // data post
    app.post("/my-content", async (req, res) => {
      const content = req.body;
      const result = await contentCollection.insertOne(content);
      res.send(result);
    });

    // data get
    app.get("/content", async (req, res) => {
      const email = req.query.email;
      const query = { userEmail: email };
      const result = await contentCollection.findOne(query);
      res.send(result);
      console.log(result);
    });

    // data delete
    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await contentCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.error());

app.get("/", (req, res) => {
  res.send("Ooloi Lab task server");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
