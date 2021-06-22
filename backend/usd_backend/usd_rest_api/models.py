from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Teacher(models.Model):
    name = models.CharField(max_length=255, null=True)
    title = models.CharField(max_length=255, null=True)
    contact = models.CharField(max_length=255, null=True)
    office_days = models.CharField(max_length=255, null=True)


class Course(models.Model):
    code = models.CharField(max_length=255, null=True)
    name = models.CharField(max_length=255)
    lesson_link = models.CharField(max_length=255, null=True)
    lesson_type = models.CharField(max_length=255, null=True)
    when = models.CharField(max_length=255, null=True)
    building = models.CharField(max_length=255, null=True)
    room = models.CharField(max_length=255, null=True)
    info = models.CharField(max_length=4096, null=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.DO_NOTHING, null=True)


class Lesson(models.Model):
    when = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    building = models.CharField(max_length=255, null=True)
    room = models.CharField(max_length=255, null=True)
    group = models.ForeignKey(Course, on_delete=models.CASCADE, null=True)


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    image_url = models.CharField(max_length=1024, null=True)
    groups = models.ManyToManyField(Course)


class Event(models.Model):
    when = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    name = models.CharField(max_length=255)
    place = models.CharField(max_length=255, null=True)
    notes = models.CharField(max_length=255, null=True)
    account = models.ForeignKey(Account, on_delete=models.CASCADE, null=True)


class Comment(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    group = models.ForeignKey(Course, on_delete=models.CASCADE)
    content = models.CharField(max_length=1024)
    when = models.DateTimeField(null=True)
