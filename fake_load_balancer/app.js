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
        // console.log(first)
        console.log(resp.data)
        return resp
    }).catch((err) => {
        console.log(`Error: ${err}`);
    })
    console.log(resp.data)
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
        // checking capacity before
        return curr_shard_id
    }
    curr_shard_id = (curr_shard_id === num_shards-1) ? 0 : curr_shard_id+1; // either we've hit the end or we can continue
}

return req.app.locals.recent_shard_id // is a new shard now

}

async function checkCapacity(req){
    // see if active to inactive ratio is 70% if not add/remove to get as close to 70% as possible.

    const max_load = req.app.locals.max_load

    let statuses = await axios({
        method: 'get',
        url: 'http://localhost:5000/'
    }).then((resp)=>{
        let data = resp.data;
        return data.shard_statuses
    }).catch((err) => {
        console.log(err)
        throw err
    })

    // the amount of zeroes to ones and twos
    let numActive = statuses.reduce((sum, currentVal)=>{
        if(currentVal === 0){
            sum+1
            return sum
        }
        return sum
    }, 0)
    
    let ratio = numActive/statuses.length;
    
    let capacity = 1-ratio;

    if (capacity > max_load){

        // new_cap/new_total <= 70/100
        
        // 10 total shards 7 are busy or offline; 1 are online - threshold num is 9, 4 online 9 busy/unavail 4/13
        
        // .7-.2 = .5 total 10 currently 7 unavail 3 avail - 7-3 = 10+4 = 14; .5

        const amtToAdd = math.floor(capacity/4) // thresholdNumber-numActive;

        // 2.5 + 4 = 6.5 
        // 3 + 3 = 6

        // 1-(6/13) = 7/13

        return addShards(req, amtToAdd);
    }
    if (capacity < .3 && numActive > 5) {
        // remove shards but min 5 avail
        // 1 shard in use 9 avail then i want to take away 8
        // min of 5 shards

        // 30 shards 10 busy/inactive 20 active - 10 shards
        const numInactive = shard_statuses.length - numActive;
        const amtToRemove = math.abs(numInactive-numActive);
        // 2 20 = 18  2 and 20 = 15 2 and 5
        return removeShards(req, numInactive < 5 ? amtToRemove-math.abs(5-numInactive) : amtToRemove);
    }
}

async function addShards(req, num_to_add){
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

async function removeShards(req, num_to_remove){
    let success = await axios({
        method: 'post',
        url: `http://localhost:5000/remove_shards?num_shards_to_remove=${num_to_remove}`
    }).then((resp)=>{
        req.app.locals.num_shards = resp.data.num_shards;
        req.app.locals.recent_shard_id = resp.data.num_shards-1;
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

    let res = axios({
        method: 'post',
        url: `http://localhost:5000/${id}`
    }).then((resp)=>{{
        return resp
    }}).catch((err)=>{
        console.log(err)
        return false
    })

    return res
}

app.get('/', async (req, res) => {
    res.send('Load Balancer!')
})

app.post('/send_job/', async (req, res) => {
    // find first free shard and return id
    let shard_id = await find_first_available(req)
    checkCapacity(req);

    // send job to shard: returns response from sent job
    let job_res = await send_job(shard_id, req);

    // TODO: send shard response to client
    res.send('Success!')
})

app.listen(port, async () => {
    let data = await fetch_shards()
    app.locals.num_shards = data.server.num_shards;
    app.locals.recent_shard_id = -1;
    app.locals.max_load = .7   
    app.locals.min_load = .3
    console.log(`Load Balancer app listening on port ${port}`)
})