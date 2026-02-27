from ninja import Router
from django.contrib.auth import authenticate
from ninja_jwt.tokens import RefreshToken
from .models import User
from .schema import RegisterSchema, LoginSchema

router = Router(tags=["Auth"])

@router.post("/register")
def register(request, payload: RegisterSchema):
    if User.objects.filter(username=payload.username).exists():
        return {"error": "Username already exists"}

    user = User.objects.create_user(
        username=payload.username,
        email=payload.email,
        password=payload.password,
        role=payload.role
    )
    return {"message": "User created successfully"}

@router.post("/login")
def login(request, payload: LoginSchema):
    user = authenticate(username=payload.username, password=payload.password)
    if not user:
        return {"error": "Invalid credentials"}

    refresh = RefreshToken.for_user(user)
    return {
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "role": user.role
    }