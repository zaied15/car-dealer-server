const express = require("express");
const cors = require("cors");
var jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// carDB
// XiCI6YFqDoopM8iH

const uri =
  "mongodb+srv://carDB:XiCI6YFqDoopM8iH@cluster0.u6bof.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const carCollection = client.db("carSet").collection("car");

    // Load All Data
    app.get("/cars", async (req, res) => {
      const query = {};
      const cursor = carCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // Load a single data by id
    app.post("/car/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await carCollection.findOne(query);
      res.send(result);
    });

    // Update a single data by id
    app.put("/car/:id", async (req, res) => {
      const id = req.params.id;
      const updatedCar = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          quantity: parseInt(updatedCar.quantity),
          sold: parseInt(updatedCar.sold),
        },
      };
      console.log(updatedDoc);
      const result = await carCollection.updateOne(filter, updatedDoc, options);
      res.send(result);
    });

    // Post a single data into DB
    app.post("/car", async (req, res) => {
      const car = req.body;
      const result = await carCollection.insertOne(car);
      res.send(result);
    });

    // Delete a single Data from DB
    app.post("/carDelete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await carCollection.deleteOne(query);
      res.send(result);
    });

    // Find Use wise items from db by email
    app.get("/myCar", async (req, res) => {
      const email = req.query.email;
      const query = { email };
      const cursor = carCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

// Default Get Route
app.get("/", (req, res) => {
  res.send("My Car Inventory Server Is Running");
});

// Port Listener
app.listen(port, () => {
  console.log("Listening to server ", port);
});
