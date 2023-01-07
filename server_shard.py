from collections import deque
import time
import random

class ServerShard:
    """This class represents each individual server shard that the server has access to."""
    server_status = ["online", "busy", "offline"]
    shard_number = 0

    def __init__(self):
        self.id = self.shard_number
        self.status = 0 # starts as online
        self.__class__.shard_number += 1

    def __repr__(self):
        return f"Shard {self.id}"

    def get_status(self) -> str:
        return self.server_status[self.status]

    def get_num_jobs(self) -> int:
        return len(self.mq)

    def __set_status(self, new_status:int) -> None:
        if new_status < 3 and new_status > -1:
            self.status = new_status
        return 

    def ping(self) -> str:
        return self.get_status()

    def receive_job(self, job) -> bool:
        if self.get_status() == 'online': # only accept job when online and not busy or offline
            self.__set_status(1) # set to busy
            self.do_job(job)
            return True
        else:
            return False

    def do_job(self, job):
        print(job)
        time.sleep(20)
        if self.status == 1: # is busy, set to online
            self.__set_status(0)

        if random.choices([True, False], cum_weights=(20,80)): # set to offline 
            self.__set_status(2)
        return True


    

    
