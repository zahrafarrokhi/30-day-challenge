from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, phone_number=None, password=None, email=None, **extra_fields):

        if not phone_number:
            raise ValueError(_('Please enter phone number'))


        email = self.normalize_email(email)
        user = self.model(email=email, phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email=None, phone_number=None, password=None, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email=email, phone_number=phone_number, password=password, **extra_fields)


class User(AbstractUser):

    username = None
    phone_number = models.CharField(max_length=16,
                                    unique=True, null=True, default=None)


    USERNAME_FIELD = 'phone_number'
    objects = UserManager()

    def __str__(self):
        username = self.phone_number
        return f"{username}"