# Fake Server #

Created a fake server to simulate server shards in a very simple way. the servers takes three routes

- `/` this route gives a simple status call to the server generally
- `/<shard_id>/ping` this route lets us check the status of a particular shard
- `/<shard_id>/send_job` this route lets us send a job to a shard to have it work on it. The job is expected to be just a simple string added as a parameter; `job='this is a job'`.
- `/add_shards` This route allows a user to add a new shard to deal with another shard going off line. Param: `num_shards_to_add=1`
- `/remove_shards` this route allows a user to remove shards if they aren't necessary. If more shards are removed then exist, the server will defaultt to a single shard. Param: `num_shards_to_remove=1`

shards are either `online`, `busy`, or `offline` these statuses determine whether a shard will accept a new job.
each time a shard processes a job it has a 10% small chance of going offline, shards are marked as busy for 20 seconds.

## Getting Started ##
in order to run project you will first need to create a virtual environment, and activating it. then install the `requirements.txt` file.
Then in two separate windows, from the project directory, run `flask run` and `python3 server_manager.py`. I will add a .sh script eventually.
After both apps are running, you can send requests to the flask server to test the code.

*In case of ModuleNotFoundError, delte old environment and redo above code.

## NodeJS Express App ##
First install packages by running `npm install`. To run server cd into the `fake_load_balancer` directory and run the command `node app.js`. 

I will be attempting to streamline thee run process by dockerizing all of these apps in the future.