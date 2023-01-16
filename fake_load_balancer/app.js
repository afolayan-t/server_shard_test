const express = require('express')
const app = express()
const port = 3000

//Get shard_Id lists into shard array
const shards = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
]


  let shard_avail = () => {
  for (i = 0; i < (shards.length); i++){
    if (shards[i] === 0){
        console.log("Available and online")
    } else if (shards[i] === 2){
        console.log("Not available because it is offline")
    } else {console.log("This will be open in a second")}

  }
}


app.get('/', (req, res) => {
  shard_avail()
    res.send('Load Balancer!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})