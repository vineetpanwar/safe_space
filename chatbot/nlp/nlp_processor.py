# chatbot/nlp/nlp_processor.py

def basic_intent_recognition(user_input):
    """
    A very basic form of intent recognition.
    In a real scenario, this should be replaced with more advanced NLP techniques.
    """
    user_input = user_input.lower()
    if "order" in user_input:
        return "order"
    elif "product" in user_input:
        return "product_inquiry"
    elif "faq" in user_input or "help" in user_input:
        return "faq"
    else:
        return "general"

# Additional NLP functions can be added here, such as entity recognition, sentiment analysis, etc.
