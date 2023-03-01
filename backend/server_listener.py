import os
from signal_message_parser import SignalMessageParser
from mqtt_client import Client
import uuid

class ServerListener:
    REST = "rest"
    HAND_OVER = "hand_over"
    BROKER_HOST = os.environ.get("BROKER_HOST")
    LINE_NAME = os.environ.get("LINE_NAME")
    LINE_IDX = os.environ.get("LINE_IDX")
    def __init__(self) -> None:
        self.client = Client(f"central-driver {uuid.uuid4()}", self.BROKER_HOST, f"report/{self.LINE_NAME}/{self.LINE_IDX}")

        self.current_state = None
        self.client.set_on_message_callback(self._on_message)
    
    def _on_message(self, client, userdata, msg) -> None:
        report: dict[str, str] =  SignalMessageParser.parse(msg.payload.decode("utf-8"))
        print(report)
        self.current_state = report["state"]

    @property
    def is_rest(self) -> bool:
        return self.current_state == self.REST
    
    @property
    def is_hand_over(self) -> bool:
        return self.current_state == self.HAND_OVER

    def listen(self) -> bool:
        self.client.listen()

