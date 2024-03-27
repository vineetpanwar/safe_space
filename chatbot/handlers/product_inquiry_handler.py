# chatbot/handlers/product_inquiry_handler.py

from chatbot.chatbot import Chatbot

class ProductInquiryHandler(Chatbot):
    def get_response(self, input):
        if "product 001" in input:
            return "Product 001 is a Wireless Mouse."
        else:
            return "I'm not sure about that product."
