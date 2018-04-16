from rest_framework import serializers
from api.models import Jobs,Applicants

class JobsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Jobs
		fields = ('title','description','category')

class ApplicantsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Applicants
		fields = ('name','email','sop','gdrive')


