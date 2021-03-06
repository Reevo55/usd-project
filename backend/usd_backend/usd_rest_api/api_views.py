from django.db.models.query import QuerySet
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, mixins
from rest_framework.response import Response
from drf_multiple_model.viewsets import FlatMultipleModelAPIViewSet
from rest_framework.permissions import IsAuthenticated

from . import models
from . import serializers


class CourseViewset(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.Course.objects.all()
    serializer_class = serializers.CourseSerializer


class LessonsViewSet(mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.DestroyModelMixin,
                     viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)
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
    permission_classes = (IsAuthenticated,)
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


class AccountViewset(mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.DestroyModelMixin,
                     viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.Account.objects.all()
    serializer_class = serializers.AccountSerializer


class EventsViewSet(mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)
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


class AccountCoursesViewSet(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.CourseSerializer

    def get_queryset(self):
        return models.Course.objects.filter(account=self.kwargs['account_pk'])

    def list(self, request, account_pk=None):
        if 'type' in request.query_params:
            courses = self.get_queryset().filter(lesson_type=request.query_params['type'])
        else:
            courses = self.get_queryset()

        serializer = serializers.CourseSerializer(courses, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

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


class CoursesAccountViewSet(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.AccountSerializer

    def get_queryset(self):
        course = models.Course.objects.get(id=self.kwargs['course_pk'])
        return course.account_set.all()

    def list(self, request, course_pk=None):
        accounts = self.get_queryset()
        serializer = serializers.AccountSerializer(accounts, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class CalendarViewSet(FlatMultipleModelAPIViewSet):
    permission_classes = (IsAuthenticated,)

    def get_querylist(self):
        if 'from' in self.request.GET and 'to' in self.request.GET:
            from_string = self.request.query_params['from']
            to_string = self.request.query_params['to']

            lessons = models.Lesson.objects.filter(group__account=self.kwargs['account_pk'], when__range=[from_string, to_string])
            events = models.Event.objects.filter(account=self.kwargs['account_pk'], when__range=[from_string, to_string])
        else:
            lessons = models.Lesson.objects.filter(group__account=self.kwargs['account_pk'])
            events = models.Event.objects.filter(account=self.kwargs['account_pk'])

        return [
            {'queryset': lessons,
             'serializer_class': serializers.LessonSerializer},
            {'queryset': events,
             'serializer_class': serializers.AccountEventSerializer},
        ]


class TeacherViewset(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.Teacher.objects.all()
    serializer_class = serializers.TeacherSerializer
