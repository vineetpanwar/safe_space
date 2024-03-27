# chatbot/handlers/faq_handler.py

from chatbot.chatbot import Chatbot

class FAQHandler(Chatbot):
    def get_response(self, input):
        # Basic logic to return a response based on the input
        if "reset my password" in input:
            return "You can reset your password by clicking on 'Forgot Password'."
        elif "delivery charges" in input:
            return "Delivery charges vary based on location and order size."
        else:
            return "I'm sorry, I don't have information on that topic."
