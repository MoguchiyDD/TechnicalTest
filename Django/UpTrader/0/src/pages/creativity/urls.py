from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="creativity"),
    path("paintings/", views.paintings, name="paintings"),
    path("sculptures/", views.sculptures, name="sculptures")
]
