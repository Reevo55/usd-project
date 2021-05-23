from rest_framework import routers
from rest_framework_nested import routers
from usd_rest_api import api_views as myapp_views
from django.conf.urls import url, include

router = routers.SimpleRouter()
router.register(r'courses', myapp_views.CourseViewset)
router.register(r'accounts', myapp_views.AccountViewset)

lessons_router = routers.NestedSimpleRouter(router, r'courses', lookup='course')
lessons_router.register(r'lessons', myapp_views.LessonsViewSet, basename='course-lessons')

comments_router = routers.NestedSimpleRouter(router, r'courses', lookup='course')
comments_router.register(r'comments', myapp_views.CommentsViewSet, basename='course-comments')

events_router = routers.NestedSimpleRouter(router, r'accounts', lookup='account')
events_router.register(r'events', myapp_views.EventsViewSet, basename='account-events')

courses_router = routers.NestedSimpleRouter(router, r'accounts', lookup='account')
courses_router.register(r'courses', myapp_views.AccountCoursesViewSet, basename='account-courses')

api_url_patterns = [
    url(r'^', include(router.urls)),
    url(r'^', include(lessons_router.urls)),
    url(r'^', include(comments_router.urls)),
    url(r'^', include(events_router.urls)),
    url(r'^', include(courses_router.urls)),
]