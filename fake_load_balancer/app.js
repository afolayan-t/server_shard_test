const express = require('express')
const axios = require('axios')
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

const check_shards = () => {
    // get num shards, and shard statuses

    axios({
        method: 'get',
        url: 'http://localhost:5000/'
    }).then((resp) => {
        let num_shards = resp.data.server.num_shards;
        let shard_statuses = resp.data.shard_statuses;
        return num_shards, shard_statuses
    }).catch((err) => {
        console.log(`Error: ${err}`);
    })

    
}

  let shard_avail = () => {
    const [num_shards, shard_statuses] = check_shards();
  for (i = 0; i < (shard_statuses.length); i++){
    if (shard_statuses[i] === 0){
        console.log("Available and online")
    } else if (shard_statuses[i] === 2){
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