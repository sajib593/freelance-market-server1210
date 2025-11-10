const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.get('/', (req, res) => {
  res.send('Hell')
})


app.use(cors());
app.use(express.json())

// freelance-market
// qi00OJCNpTTcHItW




const uri = "mongodb+srv://freelance-market:qi00OJCNpTTcHItW@cluster0.vkkq9zu.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    let db = client.db('ferrlanceMarket');
    let allJobsCollection = db.collection('allJobs');


    app.get('/allJobs', async(req, res)=>{

      let allJobs = await allJobsCollection.find().toArray();
      // console.log(allJobs);
      res.send(allJobs)

    })


    // add jobs api

    app.post('/allJobs', async(req, res)=>{

      let newJob = req.body;
      let result = await allJobsCollection.insertOne(newJob);
      res.send(result)

    })


    // fins and show viewDetails 

    

        app.get('/allJobs/:id', async(req, res)=>{
          let id = req.params.id;
          // console.log(id);
          let query = {_id : new ObjectId(id)}
          let result = await allJobsCollection.findOne(query);
          res.send(result)
        })


        // find by email data jobs

        app.get('/jobsByEmail', async(req, res)=>{

          let email = req.query.email;
          let query = {}

          if(email){
              query.userEmail = email;
          }

          let cursor = allJobsCollection.find(query);
          let result = await cursor.toArray();
          res.send(result)

        })























    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






















app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
