from typing import Callable
import time
from threading import Thread

from config import Config
from timer import Timer
from server_listener import ServerListener

class MachineStateController:
    STOP = "stop"
    RUNNING = "running"
    REST = "rest"
    HAND_OVER = "hand_over"
    def __init__(self, config: Config) -> None:
        
        self.state_with_validator: dict[str,Callable] = {
            self.HAND_OVER: self._is_hand_over,
            self.REST: self._is_rest,
            self.STOP:self._is_stop,
            self.RUNNING: self._is_running,
        }

        self.state_with_update_handler: dict[str, Callable] = {
            self.HAND_OVER: self._handle_macine_on_handover,
            self.REST: self._handle_machine_on_rest,
            self.STOP:self._handle_machine_on_stop,
            self.RUNNING: self._handle_machine_on_run
        }



        self.config = config

        self.sleep_time = 1.0

        self.current_ratio = 1.0

        self.current_state = self.STOP
        self.takt_time_offset_seconds = 0
        self.target = 0
        self.actual = 0
        

        self.due_takt_time_seconds = self.actual_takt_time_seconds

        self.server_listener = ServerListener()
        self.server_listener.listen()
    

    @property
    def actual_takt_time_seconds(self) -> float:
        return self.config.takt_time_seconds * self.current_ratio

    @property
    def diff(self) -> int:
        return self.actual - self.target

    def _reset_due_takt_time_seconds(self) -> None:
        self.due_takt_time_seconds = self.actual_takt_time_seconds

    def _is_stop(self) -> bool:
        return self.current_state == self.STOP
    
    def _is_running(self) -> bool:
        return self.current_state == self.RUNNING

    def _is_rest(self) -> bool:
        return self.server_listener.is_rest

    def _is_hand_over(self) -> bool:
        return self.server_listener.is_hand_over


    def _handle_machine_on_stop(self) -> None:
        # basically do nothing, just waiting
        ...

    def _handle_macine_on_handover(self) -> None:
        self.restart()

    def _handle_machine_on_rest(self) -> None:
        # basically do nothing, just waiting
        ...

    def restart(self) -> None:
        self = self.__init__(self.config)
    
    def _handle_takt_time_offset(self) -> None:
        self.takt_time_offset_seconds += -(self.due_takt_time_seconds) # it becomes negative so negate it.
        if self.takt_time_offset_seconds > self.actual_takt_time_seconds:
            self.target += 1
            self.takt_time_offset_seconds -= self.actual_takt_time_seconds

    def _handle_machine_on_run(self) -> None:
        
        self.due_takt_time_seconds -= 1
        if self.due_takt_time_seconds < 0:
            self.target += 1
            self._handle_takt_time_offset()
            self._reset_due_takt_time_seconds()


    def receive_takt_time_ratio_modification_signal(self, ratio: float) -> None:
        self.current_ratio = ratio
        self._reset_due_takt_time_seconds()
        self.current_state = self.STOP
    
    def receive_takt_time_modification_signal(self, new_takt_time: float) -> None:
        self.config.takt_time_seconds = new_takt_time
        self._reset_due_takt_time_seconds()
        self.current_state = self.STOP

    def receive_actual_output_signal(self) -> None:
        self.actual += 1
        if self.current_state == self.STOP:
            self.current_state = self.RUNNING

    def receive_stop_signal(self) -> None:
        self.current_state = self.STOP

    def receive_start_signal(self) -> None:
        self.current_state = self.RUNNING

    
    def _update_machine_state(self) -> None:
        for state_name, validation_func in self.state_with_validator.items():
            if validation_func():
                self.current_state = state_name
                break

    def _handle_based_on_machine_state(self) -> None:

        if self.current_state not in self.state_with_update_handler:
            return 

        update_handler = self.state_with_update_handler[self.current_state]
        update_handler()

    def _update(self) -> None:

        self._update_machine_state()
        self._handle_based_on_machine_state()
        time.sleep(self.sleep_time)

    def _keep_update(self) -> None:
        while (True):
            self._update()

    def run(self) -> None:
        thread = Thread(target=self._keep_update)
        thread.start()

    def get_current_machine_state_report(self) -> dict[str, str | int]:
        date, time = Timer.get_current_date_with_time("seconds")
        return {
            "datetime": f"{date} {time}",
            "current_state": self.current_state,
            "actual": self.actual,
            "target": self.target,
            "diff": self.diff,
            "current_ratio": self.current_ratio,
            "takt_time_offset_seconds": self.takt_time_offset_seconds,
            "due_takt_time_seconds": round(self.due_takt_time_seconds, 2),
            "config_takt_time_seconds": round(self.config.takt_time_seconds, 2),
            "actual_takt_time_seconds": round(self.actual_takt_time_seconds, 2)
        }
