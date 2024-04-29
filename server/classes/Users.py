from pydantic import BaseModel,EmailStr
from typing import Optional, List

class Users(BaseModel):
    UserID: int
    UserName: str
    email: EmailStr
    _score: Optional[float] = None  # private attribute with leading underscore

    @property
    def score(self) -> Optional[float]:
        #Public getter method for score.
        return self._score

    @score.setter
    def score(self, value: float):
        #Public setter method for score with validation.
        if not 0 <= value <= 100:
            raise ValueError("Score must be between 0 and 100.")
        self._score = value

    def get_name(self) -> str:
        return self.UserName
    
    def fetchScore(self):
        return self._score  # assuming _score is a protected member of User