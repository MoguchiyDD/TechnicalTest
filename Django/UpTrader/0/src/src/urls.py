from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include("pages.home.urls")),
    path("creativity/", include("pages.creativity.urls")),
    path("information/", include("pages.information.urls"))
]


