from django.contrib import admin
from .models import Event, Course, Lesson, Account, Comment, Teacher

# Register your models here.
admin.site.register(Event)
admin.site.register(Course)
admin.site.register(Lesson)
admin.site.register(Account)
admin.site.register(Comment)
admin.site.register(Teacher)
