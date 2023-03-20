from .validator import validate

import requests


@validate
def ping_server(url: str) -> tuple:
    response = requests.get(url)

    if response.status_code != 200:
        return "decrease", response.status_code

    return "increase", response.status_code
