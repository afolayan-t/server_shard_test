from collections import deque
import time
import random

class ServerShard:
    """This class represents each individual server shard that the server has access to."""
    server_status = ["online", "busy", "offline"]
    shard_number = 0

    def __init__(self, status=0):
        self.id = self.shard_number
        self.status = status # starts as online
        self.__class__.shard_number += 1

    def __repr__(self):
        return f"Shard {self.id}"

    def get_status(self) -> str:
        return self.server_status[self.status]

    def get_num_jobs(self) -> int:
        return len(self.mq)

    def __set_status(self, new_status:int, server_proxy) -> None:
        if new_status < 3 and new_status > -1: # in the range of acceptable statuses
            self.status = new_status

            # updating global prooxy server info
            statuses = server_proxy.get('server_statuses')
            statuses[self.id] = new_status
            server_proxy.set = statuses
        return 

    def ping(self) -> str:
        return self.get_status()

    def receive_job(self, job, server_proxy) -> bool:
        if self.get_status() == 'online': # only accept job when online and not busy or offline
            self.__set_status(1, server_proxy) # set to busy
            self.do_job(job, server_proxy)
            return True
        else:
            return False

    def do_job(self, job, server_proxy):
        print(job)
        time.sleep(20)
        if self.status == 1: # is busy, set to online
            self.__set_status(0, server_proxy)

        if random.choices([True, False], cum_weights=(20,80)): # set to offline 
            self.__set_status(2, server_proxy)
        return True


    

    
