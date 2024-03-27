# chatbot/main.py

from flask import Flask, request, jsonify, render_template
from chatbot.handlers.faq_handler import FAQHandler
from chatbot.handlers.order_handler import OrderHandler
from chatbot.handlers.product_inquiry_handler import ProductInquiryHandler

app = Flask(__name__)

# Initialize handlers
faq_handler = FAQHandler("FAQBot")
order_handler = OrderHandler("OrderBot")
product_inquiry_handler = ProductInquiryHandler("ProductBot")

def get_handler(message):
    # Simple keyword-based intent recognition
    if "order" in message.lower():
        return order_handler
    elif "product" in message.lower():
        return product_inquiry_handler
    else:
        return faq_handler

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['message']
    handler = get_handler(user_input)
    response = handler.get_response(user_input)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
