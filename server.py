import threading
import pickle

from multiprocessing.managers import BaseManager
from flask import g

from server_shard import ServerShard

def get_server():
    if not hasattr(g, 'server'):
        manager = BaseManager(('', 37844), b'password')
        manager.register('get_connection')
        manager.connect()

        server_proxy = manager.get_connection('1234')
        server_keys = server_proxy.keys()
        server_vals = server_proxy.values()

        server = {k:v for k, v in zip(server_keys, server_vals)}
        print(server)

        g.server = server
        # print(g.server)
    
    return g.server

def get_server_proxy():
    if not hasattr(g, 'server_proxy'):
        manager = BaseManager('get_connection')
        manager.connect()

        server_proxy = manager.get_connection('1234')
        g.server_proxy = server_proxy
    return g.server_proxy


class Server:
    """This class serves as the main server class that will house the smaller server shards that will each have their own status etc."""

    def __init__(self, num_shards:int=1, shard_statuses=[], server_proxy=None):
        self.server_proxy = server_proxy
        self.num_shards = num_shards
        self.shard_statuses = shard_statuses
        self.shards = {x:ServerShard(s) for x, s in zip(range(num_shards), shard_statuses)}
        self.threads = list()

    def get_shard(self, id:int):
        try:
            return self.shards[id]
        except(KeyError):
            raise "There is no server with that ID"

    def run_shard(self, id:int, job:str) -> bool:
        shard = self.get_shard(id)
        thread = threading.Thread(target=shard.receive_job, args=(job, self.server_proxy))
        self.threads.append(thread)
        thread.start()
    
