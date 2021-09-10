from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', view=views.getProducts, name='products'),
    path('<str:pk>/', view=views.getProduct, name='product'),
]
