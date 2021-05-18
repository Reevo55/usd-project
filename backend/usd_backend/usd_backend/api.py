from rest_framework import routers
from usd_rest_api import api_views as myapp_views

router = routers.DefaultRouter()
router.register(r'events', myapp_views.EventViewset)
router.register(r'courses', myapp_views.CourseViewset)
router.register(r'lessons', myapp_views.LessonViewset)
router.register(r'account', myapp_views.AccountViewset)
router.register(r'comment', myapp_views.CommentViewset)
