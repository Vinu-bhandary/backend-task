from ninja import Router
from ninja_jwt.authentication import JWTAuth
from django.shortcuts import get_object_or_404
from .models import Task
from .schema import TaskIn, TaskOut

router = Router(tags=["Tasks"], auth=JWTAuth())

@router.get("/", response=list[TaskOut])
def list_tasks(request):
    user = request.user
    if user.role == "admin":
        return Task.objects.all()
    return Task.objects.filter(owner=user)

@router.post("/", response=TaskOut)
def create_task(request, payload: TaskIn):
    task = Task.objects.create(
        **payload.dict(),
        owner=request.user
    )
    return task

@router.put("/{task_id}", response=TaskOut)
def update_task(request, task_id: int, payload: TaskIn):
    task = get_object_or_404(Task, id=task_id)

    if request.user.role != "admin" and task.owner != request.user:
        return {"error": "Unauthorized"}

    for attr, value in payload.dict().items():
        setattr(task, attr, value)

    task.save()
    return task

@router.delete("/{task_id}")
def delete_task(request, task_id: int):
    task = get_object_or_404(Task, id=task_id)

    if request.user.role != "admin" and task.owner != request.user:
        return {"error": "Unauthorized"}

    task.delete()
    return {"message": "Deleted successfully"}