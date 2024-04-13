# services/MentalHealthService.py

def get_mental_health_response(message):
    responses = {
        "stress": "It sounds like you are feeling stressed. Would you like some tips on stress management?",
        "anxiety": "Anxiety can be tough to deal with. Would you like to learn some coping strategies?",
        "depression": "Dealing with depression is challenging. It might help to talk about it or learn ways to manage the symptoms. Would you like some guidance?"
    }
    # Check for keywords in the incoming message and return the corresponding response
    for key, response in responses.items():
        if key in message.lower():
            return response
    return "I'm here to help. Could you tell me a bit more about how you're feeling?"

