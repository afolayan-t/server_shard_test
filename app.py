from flask import Flask, jsonify, request
import json
import os

from server import get_server, get_server_dict


app = Flask(__name__)




@app.route("/", methods = ['GET'])
def sanity_checK():
    server_dict = get_server_dict()
    
    # print(server)
    # print(server.get('nums'))
    # print(server.keys())
    # print(server.values())
    

    if(request.method == 'GET'):
        data = {
            "server": server_dict,
            # "num_processes": len(server[nums]),
            # "total_shards": server['name'] 
        }
    return jsonify(data)

@app.route("/<shard_id>/ping", methods = ['GET'])
def ping_shard(shard_id):
    server = get_server()
    print(server.shards)
    shard = server.get_shard(shard_id)
    if request.method == 'GET':
        data = {
            "shard": f"{shard}",
            "status": shard.ping()
        }
        return jsonify(data)

@app.route("/<shard_id>/send_job", methods=['POST'])
def send_job(shard_id):
    server = get_server()
    job = request.data.job
    server.run_shard(shard_id, job)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


if __name__ == "__main__":
    app.run()