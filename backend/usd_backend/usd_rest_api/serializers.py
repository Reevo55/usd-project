from rest_framework import serializers
from django.contrib.auth.models import User
from . import models


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = ('id', 'when', 'start_time', 'end_time', 'name', 'place', 'notes', 'account')


class AccountEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = ('id', 'when', 'start_time', 'end_time', 'name', 'place', 'notes')


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = ('id', 'name', 'lesson_link', 'lesson_type', 'when', 'building', 'room', 'ects', 'info', 'teacher')


class CourseLessonsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Lesson
        fields = ('id', 'when', 'start_time', 'end_time', 'building', 'room')


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Lesson
        fields = ('id', 'when', 'start_time', 'end_time', 'building', 'room', 'group')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')


class AccountSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=False)

    class Meta:
        model = models.Account
        fields = ('id', 'user', 'image_url', 'groups')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = ('id', 'account', 'group', 'content', 'when')


class CourseCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = ('id', 'account', 'content', 'when')


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ('id', 'name', 'title', 'contact', 'office_days')
