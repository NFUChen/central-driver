import time
from config import Config
from machine_state_controller import MachineStateController


config = Config(15.0)
controller = MachineStateController(config)

controller.run()


while (True):
    print(controller.get_current_machine_state_report())
    time.sleep(1.0)