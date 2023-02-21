from flask import Flask, request
from flask_cors import CORS
from machine_state_controller import MachineStateController
from config import Config



config = Config(18)
controller = MachineStateController(config)
controller.run()
app = Flask(__name__)
CORS(app)

@app.route("/stop")
def stop():
    controller.receive_stop_signal()
    return controller.get_current_machine_state_report(), 200

@app.route("/start")
def start():
    controller.receive_start_signal()
    return controller.get_current_machine_state_report(), 200

@app.route("/output")
def add_actual_output():
    controller.receive_actual_output_signal()
    return controller.get_current_machine_state_report(), 200

@app.route("/set_ratio/<ratio>")
def set_ratio(ratio: str):
    controller.receive_takt_time_ratio_modification_signal(float(ratio))
    return controller.get_current_machine_state_report(), 200

@app.route("/set_takt_time/<takt_time>")
def set_takt_time(takt_time: str):
    controller.receive_takt_time_modification_signal(float(takt_time))
    return controller.get_current_machine_state_report(), 200

@app.route("/report")
def report():
    return controller.get_current_machine_state_report(), 200


if __name__ == "__main__":
    app.run(host= "0.0.0.0", port= 8080)
