const express = require('express')
const axios = require('axios')
const { response } = require('express')
const app = express()
const port = 3000

// Get shard_id lists into shard array
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

async function check_shards() {
    // get num shards, and shard statuses
    // let num_shards;
    // let shard_statuses;

    resp = await axios({
        method: 'get',
        url: 'http://localhost:5000/'
    }).then((resp) => {
        // num_shards = resp.data.server.num_shards;
        // shard_statuses = resp.data.shard_statuses;
        // console.log(first)
        console.log(resp)
        return resp
    }).catch((err) => {
        console.log(`Error: ${err}`);
    })
    return resp.data
    // return num_shards, shard_statuses
}

//   let shard_avail = () => {
//     const response = check_shards();
//     console.log

/*   for (i = 0; i < (shard_statuses.length); i++){
    if (shard_statuses[i] === 0){
        console.log("Available and online")
    } else if (shard_statuses[i] === 2){
        console.log("Not available because it is offline")
    } else {console.log("This will be open in a second")}

  } */
// }

app.get('/', async (req, res) => {
    // shard_avail()
    res.send('Load Balancer!')
    let data = await check_shards()
    console.log(data)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})