from django.db import models
import datetime


# Create your models here.
class Event(models.Model):
    when = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    name = models.CharField(max_length=255)
    place = models.CharField(max_length=255, null=True)
    notes = models.CharField(max_length=255, null=True)


class Course(models.Model):
    name = models.CharField(max_length=255)
    teacher = models.CharField(max_length=255, null=True)
    contact = models.CharField(max_length=255, null=True)
    office_days = models.CharField(max_length=255, null=True)
    lesson_link = models.CharField(max_length=255, null=True)
    lesson_type = models.CharField(max_length=255, null=True)
    when = models.CharField(max_length=255, null=True)
    building = models.CharField(max_length=255, null=True)
    room = models.CharField(max_length=255, null=True)
    ects = models.IntegerField(null=True)
    info = models.CharField(max_length=4096, null=True)


class Lesson(models.Model):
    when = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    building = models.CharField(max_length=255, null=True)
    teacher = models.CharField(max_length=255, null=True)
    room = models.CharField(max_length=255, null=True)
    group = models.ForeignKey(Course, on_delete=models.CASCADE)


class Account(models.Model):
    login = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    last_login = models.DateField(default=datetime.date.today)
    groups = models.ManyToManyField(Course, through='Comment')


class Comment(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    group = models.ForeignKey(Course, on_delete=models.CASCADE)
    content = models.CharField(max_length=1024)
