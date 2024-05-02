# myapp/urls.py

from django.urls import path
from .views import add_learning_info
from .views import user_registration, user_login, get_learning_info

urlpatterns = [
    path('add-learning-info/', add_learning_info, name='add_learning_info'),
        path('api/register/', user_registration, name='user_registration'),
            path('api/login/', user_login, name='user_login'),
            path('api/get-courses', get_learning_info, name = "get courses"),
            
        
]
