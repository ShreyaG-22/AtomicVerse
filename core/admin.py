# core/admin.py
from django.contrib import admin
from .models import Mnemonic, QuizScore

class MnemonicAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'author', 'like_count', 'created_at']
    list_filter = ['category', 'created_at', 'author']
    search_fields = ['title', 'content', 'author__username']
    readonly_fields = ['like_count', 'created_at']
    ordering = ['-created_at']

class QuizScoreAdmin(admin.ModelAdmin):
    list_display = ['user', 'level', 'score', 'total_questions', 'time_taken', 'completed_at']
    list_filter = ['level', 'completed_at']
    search_fields = ['user__username']
    readonly_fields = ['completed_at']
    ordering = ['-completed_at']

admin.site.register(Mnemonic, MnemonicAdmin)
admin.site.register(QuizScore, QuizScoreAdmin)