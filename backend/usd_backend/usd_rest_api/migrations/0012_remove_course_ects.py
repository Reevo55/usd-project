# Generated by Django 3.2.2 on 2021-06-21 20:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usd_rest_api', '0011_auto_20210601_0406'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='ects',
        ),
    ]