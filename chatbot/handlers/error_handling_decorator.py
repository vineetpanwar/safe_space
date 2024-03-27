class ErrorHandlingDecorator:
    def __init__(self, handler):
        self.handler = handler

    def get_response(self, input):
        try:
            return self.handler.get_response(input)
        except Exception as e:
            print(f"Error occurred: {e}")
            return "Sorry, an error occurred while processing your request."