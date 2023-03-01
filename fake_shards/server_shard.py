from collections import deque
import time
import random

class ServerShard:
    """This class represents each individual server shard that the server has access to."""
    server_status = ["online", "busy", "offline"]

    def __init__(self, id:int, status=0):
        self.id = id
        self.status = status # starts as online

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
            statuses = server_proxy.get('shard_statuses')
            statuses[self.id] = new_status
            server_proxy.update([('shard_statuses', statuses)])
        return 

    def ping(self) -> str:
        return self.get_status()

    def receive_job(self, server_proxy) -> bool:
        if self.get_status() == 'online': # only accept job when online and not busy or offline
            self.__set_status(1, server_proxy) # set to busy
            self.do_job(server_proxy)
            return True
        else:
            return False

    def do_job(self, server_proxy):
        time.sleep(20)
        num = generate_number()
        if self.status == 1: # is busy, set to online
            choice = random.random() > .9
            if choice: # set to offline 
                self.__set_status(2, server_proxy)
                return False
            else:
                self.__set_status(0, server_proxy)
                return num

        return num


    

def generate_number() -> int:
    """"""
    num = random.randint(0, 100)
    return num

