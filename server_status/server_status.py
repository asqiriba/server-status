from pcconfig import config

import pynecone as pc

docs_url = "https://pynecone.io/docs/getting-started/introduction"
filename = f"{config.app_name}/{config.app_name}.py"


class State(pc.State):
    pass


def set_status(title: str, stage_status: str, prod_status: str) -> pc.Component:
    system_status = "success"

    if stage_status == "decrease" and prod_status == "decrease":
        system_status = "error"
    elif stage_status == "decrease" or prod_status == "decrease":
        system_status = "warning"

    return pc.alert(
        pc.alert_icon(),
        pc.alert_title(
            pc.box(
                pc.markdown(f"## {title}"),
                pc.stat_group(
                    pc.stat(
                        pc.stat_help_text("Staging", pc.stat_arrow(type_=stage_status)),
                    ),
                    pc.stat(
                        pc.stat_help_text(
                            "Production", pc.stat_arrow(type_=prod_status)
                        ),
                    ),
                    width="100%",
                ),
            ),
        ),
        status=system_status,
        variant="subtle",
    )


def index() -> pc.Component:
    api_status = set_status("API Gateway", "increase", "decrease")
    orion_status = set_status("Orion Service", "decrease", "decrease")
    nebula_status = set_status("Orion Nebula", "increase", "increase")
    ocr_status = set_status("OCR Service", "increase", "decrease")
    whisper_status = set_status("Whisper Service", "increase", "decrease")

    return pc.center(
        pc.vstack(
            pc.heading("Server Status", font_size="1em"),
            api_status,
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
    title=config.app_name,
    description="A simple server status page for my fellow devs",
    route="/",
)

app.compile()
