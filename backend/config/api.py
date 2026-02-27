from ninja import NinjaAPI
from apps.users.api import router as user_router
from apps.tasks.api import router as task_router

api = NinjaAPI(
    title="Backend Task API",
    version="1.0.0",
)

api.add_router("/v1/auth/", user_router)
api.add_router("/v1/tasks/", task_router)