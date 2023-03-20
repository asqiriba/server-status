def validate(func: callable) -> callable:
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)

        except Exception as error:
            pass

    return wrapper
