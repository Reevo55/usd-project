# Generated by Django 3.2.2 on 2021-05-18 15:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('usd_rest_api', '0006_alter_lesson_group'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='account',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='usd_rest_api.account'),
        ),
    ]