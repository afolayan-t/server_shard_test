from server import Server

if __name__ == '__main__':
    """This application is to start a fake server to have requests sent to it to mimic the process of load balancing server shards"""
    # TODO spin up flask app and associated requests.
    server = Server(num_shards=10)
    shard_3 = server.get_shard(3)
    # shard_5 = server.get_shard(5)
    print(f"shard 3: {shard_3.ping()}")
    print(server.run_shard(3, "This is job 1"))
    # print(server.run_shard(5, "This is job 3"))
    
    print(f"Shard 3: {shard_3.ping()}")
    print(server.shards)