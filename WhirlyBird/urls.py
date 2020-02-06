"""WhirlyBird URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from whirlybird_backend import views, tasks
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_jwt.views import obtain_jwt_token
from background_task.models import Task

urlpatterns = [
    path('admin/', admin.site.urls),
    path('obtain-auth/', obtain_jwt_token),
    path('api/cableparks/', views.cableparks_list),
    path('api/cableparks/<int:pk>', views.cableparks_detail),
    path('api/weatherdata/', views.cableparks_list),
    path('api/register', views.create_user),
    path('api/summarized/<int:pk>', views.summarized_weather),
    path('api/forecast/<int:pk>', views.weather),
    path('api/user', views.user_profile),
    path('api/review/<int:pk>', views.review_score),
    path('api/postreview', views.post_review_score),
]

urlpatterns = format_suffix_patterns(urlpatterns)

if not Task.objects.filter(verbose_name="update_predicted_weather").exists():
    tasks.update_predicted_weather(repeat=Task.DAILY, repeat_until=None, verbose_name="update_predicted_weather")
