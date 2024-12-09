from django.urls import path

from . import views

urlpatterns = [
    path("", views.get_image, name="save_image"),
    path("save", views.save_image, name="get_image"),
]