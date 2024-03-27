# tests/test_nlp_adapter.py

import unittest
from chatbot.nlp.nlp_adapter import NLPAdapter

class MockNLP:
    def parse(self, text):
        return f"Mocked parsing of {text}"

class TestNLPAdapter(unittest.TestCase):
    def test_nlp_adapter_process(self):
        nlp = MockNLP()
        adapter = NLPAdapter(nlp)
        result = adapter.process("Test text")
        self.assertEqual(result, "Mocked parsing of Test text")

if __name__ == '__main__':
    unittest.main()
