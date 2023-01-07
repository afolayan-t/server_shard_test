from server_shard import ServerShard
import threading


class Server:
    """This class serves as the main server class that will house the smaller server shards that will each have their own status etc."""
    def __init__(self, num_shards:int=1):
        self.num_shards = num_shards
        self.shards = {x:ServerShard() for x in range(num_shards)}
        self.threads = list()

    def __repr__(self):
        return "server_shard_router_1"

    def get_shard(self, id:int):
        try:
            return self.shards[id]
        except(KeyError):
            raise "There is no server with that ID"

    def run_shard(self, id:int, job:str) -> bool:
        shard = self.get_shard(id)
        thread = threading.Thread(target=shard.receive_job, args=(job,))
        self.threads.append(thread)
        thread.start()
    
