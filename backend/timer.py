import re
from datetime import datetime, timedelta, timezone
from typing import Tuple


class Timer:
    @staticmethod
    def get_current_date_with_time(time_spec: str = "minutes") -> Tuple[str]:
        valid_time_spec = ["hours","minutes", "seconds"]
        if time_spec not in valid_time_spec:
            raise ValueError(f"Valid time spec is one of the following: {valid_time_spec}, entering {time_spec}")

        # set to 8 hours (agains UTC timezone)
        tz = timezone(timedelta(hours=+8))
        # get current date, time, and timezone info
        # e.g.,  '2022-09-07T13:17:23+08:00' -> ['2022-09-07', '13:17', '08:00']
        time_info:list[str] = re.split("[T|+]", datetime.now(tz).isoformat(timespec=time_spec))
        current_date, current_time, time_offset = time_info

        return (current_date, current_time) # '2022-09-07', '13:17'
