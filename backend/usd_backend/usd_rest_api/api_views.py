from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models
from . import serializers


class EventViewset(viewsets.ModelViewSet):
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventSerializer


class CourseViewset(viewsets.ModelViewSet):
    queryset = models.Course.objects.all()
    serializer_class = serializers.CourseSerializer

    @action(detail=True, methods=['get', 'post'])
    def lessons(self, request, pk=None):
        if request.method == "GET":
            lessons = models.Lesson.objects.filter(group=pk)

            serializer = serializers.CourseLessonsSerializer(lessons, many=True)
            return Response(serializer.data)
        elif request.method == "POST":
            serializer = serializers.CourseLessonsSerializer(data=request.data)
            if serializer.is_valid():
                serializer.validated_data['group'] = self.get_object()
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LessonViewset(viewsets.ModelViewSet):
    queryset = models.Lesson.objects.all()
    serializer_class = serializers.LessonSerializer


class AccountViewset(viewsets.ModelViewSet):
    queryset = models.Account.objects.all()
    serializer_class = serializers.AccountSerializer


class CommentViewset(viewsets.ModelViewSet):
    queryset = models.Comment.objects.all()
    serializer_class = serializers.CommentSerializer
