from rest_framework import serializers
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


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Account
        fields = ('id', 'login', 'password', 'groups')


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
