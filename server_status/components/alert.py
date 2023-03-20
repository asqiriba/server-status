import pynecone as pc


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
