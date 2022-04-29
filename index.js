const express = require("express");
const cors = require("cors");
var jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion } = require("mongodb");
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
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  console.log("Connected to mongodb");
  // perform actions on the collection object
  client.close();
});

// Default Get Route
app.get("/", (req, res) => {
  res.send("My Car Inventory Server Is Running");
});

// Port Listener
app.listen(port, () => {
  console.log("Listening to server ", port);
});
