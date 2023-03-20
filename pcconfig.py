import pynecone as pc

config = pc.Config(
    app_name="server_status",
    db_url="sqlite:///pynecone.db",
    env=pc.Env.DEV,
    port=80,
)
