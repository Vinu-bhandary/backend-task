from ninja import Schema
from typing import Optional
from datetime import datetime

class TaskIn(Schema):
    title: str
    description: str
    completed: Optional[bool] = False

class TaskOut(Schema):
    id: int
    title: str
    description: str
    completed: bool
    created_at: datetime