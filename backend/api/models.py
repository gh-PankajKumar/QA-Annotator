from django.db import models


# Create your models here.
class Context(models.Model):
    context = models.TextField(unique=True)


class QAData(models.Model):
    context = models.ForeignKey(Context, on_delete=models.CASCADE)
    question = models.TextField()
    answer = models.TextField()
    answer_start = models.IntegerField()

    # def save(self, *args, **kwargs):
    #     if not self.question:
    #         return
    #     else:
    #         super().save(*args, **kwargs)
