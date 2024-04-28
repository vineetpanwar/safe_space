from pydantic import BaseModel
from typing import Optional, List

class User(BaseModel):
    UserID: Optional[int] = None
    UserName: str 