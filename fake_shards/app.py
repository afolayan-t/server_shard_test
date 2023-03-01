from flask import Flask, jsonify, request
import json
import os

from server import get_server, get_server_dict


app = Flask(__name__)


@app.route("/", methods = ['GET'])
def sanity_checK():
    server_dict = get_server_dict()

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
            "id": shard.id,
            "shard": f"{shard}",
            "status": shard.ping()
        }
        return jsonify(data)

@app.route("/<shard_id>/send_job", methods=['POST'])
def send_job(shard_id):
    try:
        server = get_server()
        shard = server.get_shard(shard_id)
        assert shard.get_status() == 'online'
        generated_number = server.run_shard(shard_id)
        return json.dumps({'success':True, 'generated_number': generated_number}), 200, {'ContentType':'application/json'}
    except:
        return json.dumps({'success': False, 'message': 'the server you chose was either busy or offline'}), {'ContentType':'application/json'}

@app.route("/add_shards", methods=['POST'])
def add_shards():
    # try:
    server = get_server()
    num_shards_to_add = int(request.args.get('num_shards_to_add'))

    # update server class object
    server.num_shards += num_shards_to_add
    server.shard_statuses += [0]*num_shards_to_add

    # update server_proxy
    server.server_proxy.update([('shard_statuses', server.shard_statuses)])
    server.server_proxy.update([('num_shards', server.num_shards)])
    return json.dumps({'success':True, 'num_shards': server.num_shards}), 200, {'ContentType':'application/json'}
    # except:
    #     return json.dumps({'success': False, 'message': 'Something went wrong.'}), {'ContentType':'application/json'}

@app.route("/remove_shards", methods=['POST'])
def remove_shards():
    server = get_server()
    num_shards_to_remove = int(request.args.get('num_shards_to_remove'))

    # update server class object
    server.num_shards -= num_shards_to_remove
    if server.num_shards < 0: server.num_shards = 1
    server.shard_statuses = server.shard_statuses[:-1*num_shards_to_remove] if len(server.shard_statuses) - num_shards_to_remove > 1 else [0]

    # update server server proxy
    server.server_proxy.update([('shard_statuses', server.shard_statuses)])
    server.server_proxy.update([('num_shards', server.num_shards)])
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


if __name__ == "__main__":
    app.run()