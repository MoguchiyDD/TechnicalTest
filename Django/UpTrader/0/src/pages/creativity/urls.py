from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="creativity"),
    path("paintings/", views.paintings, name="paintings"),
    path("paintings/subjects", views.subjects, name="subjects"),
    path("paintings/objects", views.objects, name="objects"),
    path("sculptures/", views.sculptures, name="sculptures")
]
