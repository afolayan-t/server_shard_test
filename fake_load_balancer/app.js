const express = require('express');
const axios = require('axios');
const { request } = require('express');
const app = express();
const port = 3000;

// Get shard_id lists into shard array

// TODO: Objective, receive job requests from client, find the firist available server shard, and send a request to it to complete.
// TODO: Add workers and a messaage queue

async function fetch_shards() {
    // get num shards, and shard statuses
    // let num_shards;
    // let shard_statuses;

    resp = await axios({
        method: 'get',
        url: 'http://localhost:5000/'
    }).then((resp) => {
        // num_shards = resp.data.server.num_shards;
        // shard_statuses = resp.data.shard_statuses;
        return resp
    }).catch((err) => {
        console.log(`Error: ${err}`);
    })
    return resp.data
    // return num_shards, shard_statuses
}


async function ping_shard(id){
    // pings shard and returns true if available and false otherwise
    let resp = await axios({
        method: 'get',
        url: `http://localhost:5000/${id}/ping`
    }).then((resp) => {
        return resp
    }).catch((err) => {
        console.log(`Error: ${err}`);
    })
    console.log(resp.data.status);
    return (resp.data.status === "online") ? true : false
}

async function find_first_available(req){
// while we are not at the end of the available shards, and we have not found a shard.
// if we don't find an open shard, we have to add more shards

// how many shards there are right now

// function manually tested 
const num_shards = req.app.locals.num_shards;
let curr_shard_id = req.app.locals.recent_shard_id + 1
let pinged_shard;

console.log(req.app.locals, curr_shard_id);

for(let i=0;i<num_shards;i++){
    pinged_shard = await ping_shard(curr_shard_id);
    console.log(pinged_shard)
    if (pinged_shard){
        req.app.locals.recent_shard_id = curr_shard_id;
        console.log('found available shard');
        return curr_shard_id
    }
    curr_shard_id = (curr_shard_id === num_shards-1) ? 0 : curr_shard_id+1; // either we've hit the end or we can continue
}

// if we don't find any add shard
console.log("didn't find shard, adding new shards")
add_shards(req, 5);

return req.app.locals.recent_shard_id // is a new shard now

}

async function add_shards(req, num_to_add){
    let success = await axios({
        method: 'post',
        url: `http://localhost:5000/add_shards?num_shards_to_add=${num_to_add}`
    }).then((resp)=>{
        let num_shards = req.app.locals.num_shards
        req.app.locals.num_shards = resp.data.num_shards;
        req.app.locals.recent_shard_id = num_shards-1;
        return true

    }).catch((err)=>{
        console.log(err)
        return false
    })
    return success
}

async function send_job(id, req){
// TODO: complete this function
console.log(`sending job to shard ${id}...`);
}


app.get('/', async (req, res) => {
    res.send('Load Balancer!')
})

app.post('/send_job/', async (req, res) => {
    // find first free shard and return id
    let shard_id = await find_first_available(req)

    // send job to shard
    send_job(shard_id, req)

    // TODO: send shard response to client
    res.send('Success!')
})

app.listen(port, async () => {
    let data = await fetch_shards()
    app.locals.num_shards = data.server.num_shards;
    app.locals.recent_shard_id = -1;  
    console.log(`Load Balancer app listening on port ${port}`)
})