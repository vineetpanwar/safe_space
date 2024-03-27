class LoggingDecorator:
    def __init__(self, handler):
        self.handler = handler

    def get_response(self, input):
        print(f"Logging input: {input}")
        return self.handler.get_response(input)