const express = require('express')
const app = express()
const port = 3000

const shards = [
"http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002"
]

  
  let shard_avail = () => {
  for (i = 0; i < (shards.length - 1); i++){
    if (shards[i].status === "online"){
            console.log("Available")
    } else if (shards[i].status === "offline"){
            console.log("Not available")
    } else console.log("This will be open in a second")

  }
}
    
app.get('/', (req, res) => {
    res.send('Load Balancer!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})