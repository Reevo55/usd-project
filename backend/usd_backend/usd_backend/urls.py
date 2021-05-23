from django.contrib import admin
from django.urls import include, path
from .api import api_url_patterns

urlpatterns = [
    path('api/', include(api_url_patterns)),
    path('admin/', admin.site.urls),
]
