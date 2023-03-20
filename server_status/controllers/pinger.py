import requests
import logging


def ping_server(url: str) -> int:
    prev_response = None
    logging.info("Pinging server...")

    response = requests.get(url)

    if response.status_code != 200 and prev_response is False:
        return 0

    elif response.status_code == 200 and prev_response is None:
        prev_response = 1

    elif response.status_code == 200 and prev_response is True:
        return 1
