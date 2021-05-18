from rest_framework import serializers
from . import models


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = ('id', 'when', 'start_time', 'end_time', 'name', 'place', 'notes')


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = ('id', 'name', 'teacher', 'contact', 'office_days', 'lesson_link', 'lesson_type', 'when', 'building', 'room', 'ects', 'info')


class CourseLessonsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Lesson
        fields = ('id', 'when', 'start_time', 'end_time', 'building', 'teacher', 'room')


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Lesson
        fields = ('id', 'when', 'start_time', 'end_time', 'building', 'teacher', 'room', 'group')


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Account
        fields = ('id', 'login', 'password', 'last_login', 'groups')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = ('id', 'account', 'group', 'content')
