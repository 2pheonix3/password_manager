const express = require('express')
const cors=require('cors')
// const bodyparser=require('body-parser')
const {handleData,showData,del}=require('./data')
const mongoose=require('mongoose')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/pass", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
// app.use(bodyparser.json())


app.post('/',async (req,res)=>{
  try {

    const response = await handleData(req.body); // Use the imported function
    console.log(response);
    res.json(response); // Send the response back to the client
    } catch (error) {
      console.error('Error handling data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
    }
    })
app.delete('/',async (req,res)=>{
  
  console.log(req.body)
  try {
    console.log(req.body)
    const response = await del(req.body); // Use the imported function
    console.log(response);
    res.json(response); // Send the response back to the client
    } catch (error) {
      console.error('Error handling data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
    }
    })
app.get('/', async(req, res) => {
  // res.send('Hello World!')
  const a=await showData()
  res.json(a)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 