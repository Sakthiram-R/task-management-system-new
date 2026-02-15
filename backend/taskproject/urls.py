from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from tasks.views import TaskViewSet, register_user, get_current_user, update_user_profile, change_password

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    
    # Authentication endpoints
    path('api/auth/register/', register_user, name='register'),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/me/', get_current_user, name='current_user'),
    path('api/auth/profile/update/', update_user_profile, name='update_profile'),
    path('api/auth/change-password/', change_password, name='change_password'),
]