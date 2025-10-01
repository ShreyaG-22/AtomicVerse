from django.db import models
from django.contrib.auth.models import User

# Remove the Element model since we're using JSON

class Mnemonic(models.Model):
    CATEGORY_CHOICES = [
        ('periodic-table', 'Periodic Table'),
        ('element-groups', 'Element Groups'),
        ('atomic-numbers', 'Atomic Numbers'),
        ('other', 'Other'),
    ]
    
    title = models.CharField(max_length=200)
    content = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.ManyToManyField(User, related_name='liked_mnemonics', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    def like_count(self):
        return self.likes.count()

class QuizScore(models.Model):
    LEVEL_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    level = models.CharField(max_length=15, choices=LEVEL_CHOICES)
    score = models.IntegerField()
    total_questions = models.IntegerField()
    time_taken = models.IntegerField()
    completed_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.level} - {self.score}/{self.total_questions}"