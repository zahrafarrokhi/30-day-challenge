# Generated by Django 4.1.4 on 2022-12-26 07:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_alter_user_managers'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='phone_number_verified',
        ),
    ]
