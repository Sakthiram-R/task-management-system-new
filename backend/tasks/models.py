"""
Task Management System - Django Backend Configuration

Designed & Developed by Sakthiram
© 2026 Sakthiram. All Rights Reserved.

Production-ready settings for Railway deployment with
JWT Authentication, MySQL (Production), SQLite (Development),
CORS configuration, and secure environment handling.
"""

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Task(models.Model):
    """Task model for task management system"""
    
    STATUS_CHOICES = [
        (False, 'Pending'),
        (True, 'Completed'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(
        max_length=255,
        null=False,
        blank=False,
        help_text="Title of the task"
    )
    
    description = models.TextField(
        null=True,
        blank=True,
        help_text="Detailed description of the task"
    )
    
    status = models.BooleanField(
        default=False,
        choices=STATUS_CHOICES,
        help_text="Task completion status"
    )
    
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Task creation timestamp"
    )
    
    updated_at = models.DateTimeField(
        auto_now=True,
        help_text="Task last updated timestamp"
    )
    
    due_date = models.DateTimeField(
        null=True,
        blank=True,
        help_text="Task due date"
    )
    
    priority = models.CharField(
        max_length=20,
        choices=[
            ('low', 'Low'),
            ('medium', 'Medium'),
            ('high', 'High'),
        ],
        default='medium',
        help_text="Task priority level"
    )

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Task'
        verbose_name_plural = 'Tasks'
        indexes = [
            models.Index(fields=['user', 'status']),
            models.Index(fields=['user', '-created_at']),
        ]

    def __str__(self):
        return f"{self.title} - {self.user.username}"
    
    def mark_complete(self):
        """Mark task as completed"""
        self.status = True
        self.save()
    
    def mark_incomplete(self):
        """Mark task as incomplete"""
        self.status = False
        self.save()