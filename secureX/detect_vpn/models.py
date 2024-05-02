
from django.db import models

class LearningInfo(models.Model):
    lesson_number = models.IntegerField()
    lesson_title = models.CharField(max_length=100)
    lesson_description = models.TextField()
    user = models.TextField()

    class Meta:
        db_table = 'LEARNING_INFO'
