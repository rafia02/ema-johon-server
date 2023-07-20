const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
require('dotenv').config()

app.get('/', (req, res)=>{
    res.send('ema johan')
})




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vljpuop.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        const productCollection = client.db('emajohan').collection('products')

        app.get('/products', async (req, res)=>{
            const query = {}
            const cursor = productCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })


        app.get('/products/:id', async (req, res)=>{
            const id = req.params.id 
            console.log(id)
            const query = { _id: ObjectId(id) }
            const result = await productCollection.findOne(query)
            res.send(result)
        })
    }
    finally{

    }
}
run().catch(e=> console.error(e))






app.listen(port, ()=>{
    console.log(`ema johan running ${port}`)
})