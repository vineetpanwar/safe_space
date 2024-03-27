# tests/test_observer_pattern.py

import unittest
from chatbot.utils.observable import Observable
from chatbot.utils.observer import Observer

class MockObserver(Observer):
    def __init__(self):
        self.messages = []

    def notify(self, message):
        self.messages.append(message)

class TestObserverPattern(unittest.TestCase):
    def test_observer_notification(self):
        observable = Observable()
        observer = MockObserver()
        event_type = "test_event"  # Define an event type for the test
        observable.add_observer(event_type, observer)  # Adjusted to include event_type
        observable.notify_observers(event_type, "Test event")  # Ensure event_type is passed here too
        self.assertIn("Test event", observer.messages)

if __name__ == '__main__':
    unittest.main()
