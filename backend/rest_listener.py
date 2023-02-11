from signal_message_parser import SignalMessageParser
from mqtt_client import Client
import uuid

class RestListener:
    REST = "rest"
    BROKER_HOST = "10.3.5.60"
    def __init__(self) -> None:
        self.client = Client(f"central-driver {uuid.uuid4()}", self.BROKER_HOST, "report/RS/1")

        self.current_state = None
        self.client.set_on_message_callback(self._on_message)
    
    def _on_message(self, client, userdata, msg) -> None:
        report: dict[str, str] =  SignalMessageParser.parse(msg.payload.decode("utf-8"))
        print(report)
        self.current_state = report["state"]

    @property
    def is_rest(self) -> bool:
        return self.current_state == self.REST

    def listen(self) -> bool:
        self.client.listen()

