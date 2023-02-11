import ast
import json
from typing import Any, Dict


class SignalMessageParser:
    @staticmethod
    def parse(msg: str) -> Dict[str, Any]:
        try:      
            parsed_dict = ast.literal_eval( # to dict
                            ast.literal_eval( # to string
                                json.dumps(msg)
                            )
                        )
            return parsed_dict
        except Exception as error:
            return str(error)
