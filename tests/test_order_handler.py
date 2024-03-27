# tests/test_order_handler.py

import unittest
from chatbot.handlers.order_handler import OrderHandler

class TestOrderHandler(unittest.TestCase):
    def setUp(self):
        self.handler = OrderHandler("TestOrderBot")

    def test_response(self):
        input_question = "What is the status of my order?"
        response = self.handler.get_response(input_question)
        self.assertIn("Your order is currently being processed", response)

if __name__ == '__main__':
    unittest.main()
