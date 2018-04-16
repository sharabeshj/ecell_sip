from django.db import models

# Create your models here.


class Jobs(models.Model):
	title = models.CharField(max_length = 30)
	description = models.TextField()
	category = models.CharField(max_length = 20)

class Applicants(models.Model):
	name = models.CharField(max_length = 40)
	email = models.EmailField()
	sop = models.TextField()
	gdrive = models.URLField()