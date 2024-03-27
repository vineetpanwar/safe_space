# chatbot/handlers/order_handler.py

from chatbot.chatbot import Chatbot

class OrderHandler(Chatbot):
    def get_response(self, input):
        if "status of my order" in input:
            return "Your order is currently being processed."
        else:
            return "I'm not sure about your order status."
