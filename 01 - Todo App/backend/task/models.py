from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=40)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # status = models.BooleanField(default=False)

    # DONE = 'done'
    # INCOMPLETE = 'incomplete'
    # STATUS_CHOICES = (
    #     (DONE, 'Done'),
    #     (INCOMPLETE, 'Incomplete'),
    # )
    # status = models.CharField(choices=STATUS_CHOICES, max_length=20, default=INCOMPLETE)

    class Status(models.TextChoices):
        done = 'done', "Done"
        incomplete  = 'incomplete', "Incomplete"

    status = models.CharField(choices=Status.choices,max_length=20,default=Status.incomplete)

    def __str__(self):
        return self.title