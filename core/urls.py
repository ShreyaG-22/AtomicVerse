from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('mnemonics/', views.mnemonics_hub, name='mnemonics_hub'),
    path('quizzes/', views.quizzes, name='quizzes'),
    path('profile/', views.profile, name='profile'),
    # Remove element_detail URL
    path('add-mnemonic/', views.add_mnemonic, name='add_mnemonic'),
    path('like-mnemonic/<int:mnemonic_id>/', views.like_mnemonic, name='like_mnemonic'),
    path('submit-quiz/', views.submit_quiz, name='submit_quiz'),
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
]