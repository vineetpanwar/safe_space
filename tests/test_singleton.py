# tests/test_singleton.py

import unittest
from chatbot.utils.logger import Logger

class TestLoggerSingleton(unittest.TestCase):
    def test_single_instance(self):
        logger1 = Logger()
        logger2 = Logger()
        self.assertIs(logger1, logger2)

if __name__ == '__main__':
    unittest.main()
