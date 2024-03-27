# tests/test_product_inquiry_handler.py

import unittest
from chatbot.handlers.product_inquiry_handler import ProductInquiryHandler

class TestProductInquiryHandler(unittest.TestCase):
    def setUp(self):
        self.handler = ProductInquiryHandler("TestProductBot")

    def test_response(self):
        input_question = "Tell me about product 001."
        response = self.handler.get_response(input_question)
        self.assertIn("Product 001 is a Wireless Mouse", response)

if __name__ == '__main__':
    unittest.main()
