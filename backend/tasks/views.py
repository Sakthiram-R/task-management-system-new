from rest_framework import viewsets, status, filters
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .models import Task
from .serializers import TaskSerializer
from .auth_serializers import UserSerializer, UserRegistrationSerializer

class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet for CRUD operations on Task model
    Only shows tasks for the authenticated user
    """
    
    serializer_class = TaskSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'due_date', 'priority']
    ordering = ['-created_at']
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """
        Return only tasks for the authenticated user
        Filter by status if provided
        """
        user = self.request.user
        queryset = Task.objects.filter(user=user)
        status_param = self.request.query_params.get('status', None)
        
        if status_param == 'completed':
            queryset = queryset.filter(status=True)
        elif status_param == 'pending':
            queryset = queryset.filter(status=False)
        
        return queryset
    
    def perform_create(self, serializer):
        """Automatically assign task to logged-in user"""
        serializer.save(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        """Create a new task with error handling"""
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def update(self, request, *args, **kwargs):
        """Update task with error handling"""
        try:
            return super().update(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def destroy(self, request, *args, **kwargs):
        """Delete task with confirmation message"""
        try:
            instance = self.get_object()
            task_title = instance.title
            self.perform_destroy(instance)
            return Response(
                {'message': f'Task "{task_title}" deleted successfully'},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=True, methods=['post'])
    def mark_complete(self, request, pk=None):
        """Mark a specific task as completed"""
        try:
            task = self.get_object()
            task.mark_complete()
            serializer = self.get_serializer(task)
            return Response(
                {
                    'message': 'Task marked as completed',
                    'task': serializer.data
                },
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=True, methods=['post'])
    def mark_incomplete(self, request, pk=None):
        """Mark a specific task as incomplete"""
        try:
            task = self.get_object()
            task.mark_incomplete()
            serializer = self.get_serializer(task)
            return Response(
                {
                    'message': 'Task marked as incomplete',
                    'task': serializer.data
                },
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get task statistics for authenticated user"""
        user = request.user
        total_tasks = Task.objects.filter(user=user).count()
        completed_tasks = Task.objects.filter(user=user, status=True).count()
        pending_tasks = Task.objects.filter(user=user, status=False).count()
        
        return Response({
            'total_tasks': total_tasks,
            'completed_tasks': completed_tasks,
            'pending_tasks': pending_tasks,
            'completion_percentage': round((completed_tasks / total_tasks * 100) if total_tasks > 0 else 0, 2)
        })


# ========== Authentication Views ==========

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """Register a new user"""
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {
                'message': 'User registered successfully',
                'user': UserSerializer(User.objects.get(username=serializer.validated_data['username'])).data
            },
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    """Get current logged-in user details"""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    """Update user profile"""
    user = request.user
    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {
                'message': 'Profile updated successfully',
                'user': serializer.data
            },
            status=status.HTTP_200_OK
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    """Change user password"""
    user = request.user
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')
    new_password2 = request.data.get('new_password2')

    if not user.check_password(old_password):
        return Response(
            {'error': 'Old password is incorrect'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if new_password != new_password2:
        return Response(
            {'error': 'New passwords do not match'},
            status=status.HTTP_400_BAD_REQUEST
        )

    user.set_password(new_password)
    user.save()
    
    return Response(
        {'message': 'Password changed successfully'},
        status=status.HTTP_200_OK
    )