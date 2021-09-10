from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # path('', view=views.getRoutes, name='routes'),
    
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.registerUser, name='register'),
    
    path('users/', view=views.getUsers, name='users'),
    path('users/profile/', view=views.getUserProfile, name='users-profile'),
    
    path('products/', view=views.getProducts, name='products'),
    path('products/<str:pk>/', view=views.getProduct, name='product'),
]
