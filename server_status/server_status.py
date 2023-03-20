from .controllers.pinger import ping_server
from .components.alert import set_status
from pcconfig import config

import pynecone as pc
import logging

logging.basicConfig(level=logging.DEBUG)


class State(pc.State):
    status: int = 0

    def api_status(self):
        logging.debug("Pinging server...")
        self.status = ping_server("https://api.knowcorp.com:8000/health/")


def index() -> pc.Component:
    api_status2 = set_status("API Gateway", "increase", "decrease")
    orion_status = set_status("Orion Service", "decrease", "decrease")
    nebula_status = set_status("Orion Nebula Service", "increase", "increase")
    ocr_status = set_status("OCR Service", "increase", "decrease")
    whisper_status = set_status("Whisper Service", "increase", "decrease")

    return pc.center(
        pc.vstack(
            pc.heading("Server Status", font_size="1em"),
            pc.heading(State.status, font_size=24),
            pc.button(
                "Refresh",
                variant="outline",
                color="primary",
                size="sm",
                on_click=State.api_status,
            ),
            api_status2,
            orion_status,
            nebula_status,
            ocr_status,
            whisper_status,
            spacing="0.3em",
            font_size="2em",
            width="50%",
        ),
        padding_top="5%",
    )


app = pc.App(state=State)

app.add_page(
    index,
    title="Server Status",
    description="A simple server status page for my fellow devs",
    route="/",
)

app.compile()
