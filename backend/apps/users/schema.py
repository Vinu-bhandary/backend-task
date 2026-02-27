from ninja import Schema
from pydantic import EmailStr

class RegisterSchema(Schema):
    username: str
    email: EmailStr
    password: str
    role: str

class LoginSchema(Schema):
    username: str
    password: str