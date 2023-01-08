from flask import Flask, jsonify, request
import json
import os

from server import Server, get_server
from common import cache

config = {
    "DEBUG": True,
    "CACHE_TYPE": "filesystem",
    "CACHE_DIR": f"{os.path.dirname(os.path.realpath(__file__))}/tmp"
}

app = Flask(__name__)
app.config.from_mapping(config)

cache.init_app(app=app, config=config)

@app.route("/", methods = ['GET'])
def sanity_checK():
    server = get_server()
    var = cache.get('var')
    
    print(cache)
    print(server)
    print(server.get('nums'))
    print(server.keys())
    print(server.values())
    

    if(request.method == 'GET'):
        data = {
            "server": server,
            # "num_processes": len(server[nums]),
            # "total_shards": server['name'] 
        }
    return jsonify(data)

@app.route("/<shard_id>/ping", methods = ['GET'])
def ping_shard(shard_id):
    server = cache.get('server')
    shard = server.get_shard(shard_id)
    if request.method == 'GET':
        data = {
            "shard": shard,
            "status": shard.ping()
        }
        return jsonify(data)

@app.route("/<shard_id>/send_job", methods=['POST'])
def send_job(shard_id):
    server = cache.get('server')
    job = request.data.job
    server.run_shard(shard_id, job)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


if __name__ == "__main__":
    from common import cache
    server = Server(num_shards=10)
    fake_var = "This is a fake variable."
    cache.set("server", server)
    cache.set("var", fake_var)
    app.run()