from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('', view=views.getOrders, name='orders'),
    path('add/', view=views.addOrderItems, name='orders-add'),
    path('myorders/', view=views.getMyOrders, name='myorders'),
    path('<str:pk>/deliver/', view=views.updateOrderToDelivered, name='order-delivered'),
    path('<str:pk>/', view=views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', view=views.updateOrderToPaid, name='pay'),

]
