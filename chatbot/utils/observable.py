class Observable:
    def __init__(self):
        self.observers = {}

    def add_observer(self, event_type, observer):
        if event_type not in self.observers:
            self.observers[event_type] = []
        self.observers[event_type].append(observer)

    def notify_observers(self, event_type, message):
        for observer in self.observers.get(event_type, []):
            observer.notify(message)

    def remove_observer(self, event_type, observer):
        if event_type in self.observers:
            self.observers[event_type].remove(observer)
