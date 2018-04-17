from rest_framework import serializers
from api.models import Jobs,Applicants
from django.contrib.auth.models import User

class JobsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Jobs
		fields = ('id','title','description','category')

class ApplicantsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Applicants
		fields = ('name','email','sop','gdrive')

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id','username')
