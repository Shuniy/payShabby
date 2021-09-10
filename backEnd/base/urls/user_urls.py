from django.urls import path
from base.views import user_views as views

urlpatterns = [

    path('', view=views.getUsers, name='users'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    path('profile/', view=views.getUserProfile, name='users-profile'),
    path('profile/update/', view=views.updateUserProfile,
         name='users-profile-update'),

]
