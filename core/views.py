from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from django.http import JsonResponse
from .models import Mnemonic, QuizScore  # Remove Element import
from django.contrib.auth.models import User
import json

def home(request):
    # Remove elements from context since we're using JSON
    return render(request, 'index.html')

def mnemonics_hub(request):
    mnemonics = Mnemonic.objects.all().order_by('-created_at')
    return render(request, 'mnemonics.html', {'mnemonics': mnemonics})

def quizzes(request):
    return render(request, 'quizzes.html')

def profile(request):
    if request.user.is_authenticated:
        user_scores = QuizScore.objects.filter(user=request.user).order_by('-completed_at')
        user_mnemonics = Mnemonic.objects.filter(author=request.user).order_by('-created_at')
        
        # Leaderboard logic
        all_scores = QuizScore.objects.all()
        leaderboard_data = {}
        for score in all_scores:
            if score.user not in leaderboard_data:
                leaderboard_data[score.user] = {
                    'total_score': 0,
                    'quiz_count': 0
                }
            leaderboard_data[score.user]['total_score'] += score.score
            leaderboard_data[score.user]['quiz_count'] += 1
        
        leaderboard = []
        for user, data in leaderboard_data.items():
            if data['quiz_count'] > 0:
                leaderboard.append({
                    'user': user,
                    'average_score': data['total_score'] / data['quiz_count'],
                    'quiz_count': data['quiz_count']
                })
        
        leaderboard.sort(key=lambda x: x['average_score'], reverse=True)
        
        return render(request, 'profile.html', {
            'user_scores': user_scores,
            'user_mnemonics': user_mnemonics,
            'leaderboard': leaderboard[:10]
        })
    return render(request, 'profile.html')

# Remove element_detail view since we're not using database for elements

@login_required
def add_mnemonic(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        content = request.POST.get('content')
        category = request.POST.get('category')
        
        mnemonic = Mnemonic.objects.create(
            title=title,
            content=content,
            category=category,
            author=request.user
        )
        messages.success(request, 'Mnemonic added successfully!')
        return redirect('mnemonics_hub')
    
    return redirect('mnemonics_hub')

@login_required
def like_mnemonic(request, mnemonic_id):
    mnemonic = get_object_or_404(Mnemonic, id=mnemonic_id)
    
    if request.user in mnemonic.likes.all():
        mnemonic.likes.remove(request.user)
        liked = False
    else:
        mnemonic.likes.add(request.user)
        liked = True
    
    return JsonResponse({
        'liked': liked,
        'like_count': mnemonic.like_count()
    })

@login_required
def submit_quiz(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        level = data.get('level')
        score = data.get('score')
        total_questions = data.get('total_questions')
        time_taken = data.get('time_taken')
        
        QuizScore.objects.create(
            user=request.user,
            level=level,
            score=score,
            total_questions=total_questions,
            time_taken=time_taken
        )
        
        return JsonResponse({'success': True})
    
    return JsonResponse({'success': False})

def register_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        
        if password != confirm_password:
            messages.error(request, "Passwords don't match!")
            return redirect('profile')
        
        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists!")
            return redirect('profile')
        
        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered!")
            return redirect('profile')
        
        user = User.objects.create_user(username=username, email=email, password=password)
        login(request, user)
        messages.success(request, "Account created successfully!")
        return redirect('home')
    
    return redirect('profile')

def login_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            messages.success(request, "Logged in successfully!")
            return redirect('home')
        else:
            messages.error(request, "Invalid credentials!")
            return redirect('profile')
    
    return redirect('profile')

def logout_user(request):
    logout(request)
    messages.success(request, "Logged out successfully!")
    return redirect('home')