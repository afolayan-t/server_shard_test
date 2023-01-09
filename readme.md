### Fake Server ###
Created a fake server to simulate server shards in a very simple way. the servers takes three routes

- '/' this route gives a simple status call to the server generally
- '/<shard_id>/ping' this route lets us check the status of a particular shard
- '/<shard_id>/send_job' this route lets us send a job to a shard to have it work on it. The job is expected to be just a simple string.
- '/add_shard' this route hasn't been added yet. It will allow a user to add a new shard to deal with another shard going off line.

shards are either `online`, `busy`, or `offline` these statuses determine whether a shard will accept a new job.
each time a shard processes a job it has a small chance of going offline.

## Getting Started ##
in order to run project you will first need to create a virtual environment, and activating it. then install the `requirements.txt` file.
Then in two separate windows, from the project directory, run `flask run` and `python3 server_manager.py`. I will add a .sh script eventually.
After both apps are running, you can send requests to the flask server to test the code.
