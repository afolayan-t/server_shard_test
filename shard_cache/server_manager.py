import atexit

from multiprocessing import Lock
from multiprocessing.managers import BaseManager

lock = Lock()
connections = {}

server_constructor = {'num_shards': 10, 'shard_statuses': [0 for i in range(10)], 'threads': []}

def get_connection(server_id):
    with lock:
        if server_id not in connections:
            connections[server_id] = server_constructor

        return connections[server_id]


@atexit.register
def close_connections():
    for connection_id in list(connections.keys()):
        del connections[connection_id]


manager = BaseManager(('', 37844), b'password')
manager.register('get_connection', get_connection)
server = manager.get_server()
server.serve_forever()
