from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
import datetime

from . import models
from . import serializers


class CourseViewset(viewsets.ModelViewSet):
    queryset = models.Course.objects.all()
    serializer_class = serializers.CourseSerializer


class LessonsViewSet(mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.DestroyModelMixin,
                     viewsets.GenericViewSet):
    serializer_class = serializers.CourseLessonsSerializer

    def get_queryset(self):
        return models.Lesson.objects.filter(group=self.kwargs['course_pk'])

    def create(self, request, course_pk=None):
        serializer = serializers.LessonSerializer(data=request.data)
        if serializer.is_valid():
            course = get_object_or_404(models.Course, pk=course_pk)
            serializer.validated_data['group'] = course
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentsViewSet(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin,
                      viewsets.GenericViewSet):
    serializer_class = serializers.CourseCommentSerializer

    def get_queryset(self):
        return models.Comment.objects.filter(group=self.kwargs['course_pk'])

    def create(self, request, course_pk=None):
        serializer = serializers.CourseCommentSerializer(data=request.data)
        if serializer.is_valid():
            course = get_object_or_404(models.Course, pk=course_pk)
            serializer.validated_data['group'] = course
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AccountViewset(viewsets.ModelViewSet):
    queryset = models.Account.objects.all()
    serializer_class = serializers.AccountSerializer

    @action(detail=True, methods=['get'])
    def calendar(self, request, pk=None):
        from_string = request.query_params.get('from')
        to_string = request.query_params.get('to')

        from_date = datetime.datetime.strptime(from_string[1:-1], "%Y-%m-%d").date()
        to_date = datetime.datetime.strptime(to_string[1:-1], "%Y-%m-%d").date()

        courses = models.Course.objects.filter(account=self.get_object())
        lessons = []

        for course in courses:
            lessons += models.Lesson.objects.filter(group=course, start_time__gt=from_date, end_time__lt=to_date)

        serializer = serializers.CourseLessonsSerializer(lessons, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class EventsViewSet(mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    viewsets.GenericViewSet):
    serializer_class = serializers.AccountEventSerializer

    def get_queryset(self):
        return models.Event.objects.filter(account=self.kwargs['account_pk'])

    def create(self, request, account_pk=None):
        serializer = serializers.AccountEventSerializer(data=request.data)
        if serializer.is_valid():
            account = get_object_or_404(models.Account, pk=account_pk)
            serializer.validated_data['account'] = account
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AccountCoursesViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = serializers.CourseSerializer

    def get_queryset(self):
        return models.Course.objects.filter(account=self.kwargs['account_pk'])

    def retrieve(self, request, pk=None, account_pk=None):
        account = get_object_or_404(models.Account, pk=account_pk)
        course = get_object_or_404(models.Course, pk=pk)
        account.groups.add(course)

        return Response(status=status.HTTP_200_OK)

    def destroy(self, request, pk=None, account_pk=None):
        account = get_object_or_404(models.Account, pk=account_pk)
        course = get_object_or_404(models.Course, pk=pk)
        account.groups.remove(course)

        return Response(status=status.HTTP_200_OK)
