"""
Task Management System - Django Backend Configuration

Designed & Developed by Sakthiram
© 2026 Sakthiram. All Rights Reserved.

Production-ready settings for Railway deployment with
JWT Authentication, MySQL (Production), SQLite (Development),
CORS configuration, and secure environment handling.
"""

from rest_framework import serializers
from .models import Task
from django.utils import timezone

class TaskSerializer(serializers.ModelSerializer):
    """Serializer for Task model"""
    
    status_display = serializers.CharField(
        source='get_status_display',
        read_only=True
    )
    
    priority_display = serializers.CharField(
        source='get_priority_display',
        read_only=True
    )
    
    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'description',
            'status',
            'status_display',
            'priority',
            'priority_display',
            'created_at',
            'updated_at',
            'due_date',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate_title(self, value):
        """Validate title is not empty"""
        if not value or not value.strip():
            raise serializers.ValidationError("Title cannot be empty")
        return value.strip()
    
    def validate_due_date(self, value):
        """Validate due date is not in the past"""
        if value and value < timezone.now():
            raise serializers.ValidationError("Due date cannot be in the past")
        return value