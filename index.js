const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json())


 const uri =  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lnoy20s.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 


async function run() {
  try{
    const productsCollection = client.db("bicycleBazar").collection("categories");
    const bookingsCollection = client.db("bicycleBazar").collection("bookings");

    app.get("/categories", async(req, res) => {
      const query = {};
      const result = await productsCollection.find(query).project({category_name: 1, image: 1}).toArray();
      res.send(result)
    });
    app.get("/products", async(req, res) => {
      const query = {};
      const result = await productsCollection.find(query).toArray();
      res.send(result)
    });



    app.get("/products/:id", async(req, res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id) }
      const result = await productsCollection.findOne(query);
      res.send(result)
    });

    app.post('/bookings', async(req, res) => {
      const booking = req.body;
      const result = await bookingsCollection.insertOne(booking);
      res.send(result);
    })
  

  }
  finally{

  }
}
run().catch(console.log )


app.get('/', async(req, res) => {
  res.send('bicycle is running')
});

app.listen(port, () => console.log( `bicycle bazar is running on ${port}`))