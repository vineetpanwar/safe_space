# chatbot/nlp/nlp_adapter.py

class NLPAdapter:
    def __init__(self, nlp_library):
        self.nlp_library = nlp_library

    def process(self, text):  # Ensure this method exists
        return self.nlp_library.parse(text)