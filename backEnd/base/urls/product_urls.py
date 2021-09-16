from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', view=views.getProducts, name='products'),
    path('create/', view=views.createProduct, name='product-create'),
    path('upload/', view=views.uploadImage, name='image-upload'),
    path('<str:pk>/', view=views.getProduct, name='product'),
    path('delete/<str:pk>/', view=views.deleteProduct, name='product-delete'),
    path('update/<str:pk>/', view=views.updateProduct, name='product-update'),
]
