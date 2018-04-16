from django.shortcuts import render
from api.models import Jobs,Applicants
from api.serializers import JobsSerializer,ApplicantsSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.status import HTTP_401_UNAUTHORIZED
from api.permissions import IsOwnerOrReadOnly
from rest_framework import permissions
from django.contrib.auth import login
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
# Create your views here.

@api_view(['POST'])
def admin_login(request):
	username = request.POST.get('username')
	password = request.POST.get('password')
	user = authenticate(username = username,password = password)
	if not user:
		return Response({'error' : 'login failed'},status = HTTP_401_UNAUTHORIZED)
	token,_ = Token.objects.get_or_create(user = user)
	return Response({'token': token.key})

class JobsList(APIView):

	permission_classes = (permissions.IsAuthenticatedOrReadOnly)

	def get(self,request,format = None):
		jobs = Jobs.objects.all()
		jobsSerializer = JobsSerializer(jobs,many = True)
		return Response(jobsSerializer.data)

	def post(self,request,format = None):
		jobsSerializer = JobsSerializer(data = request.data)
		if jobsSerializer.is_valid():
			jobsSerializer.save()
			return Response(jobsSerializer.data,status = status.HTTP_201_CREATED)
		return Response(jobsSerializer.errors,status = status.HTTP_404_BAD_REQUEST)

class JobDetail(APIView):
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,
		IsOwnerOrReadOnly)
	def get_object(self,pk):
		try: 
			return Jobs.objects.get(pk = pk)
		except Jobs.DoesNotExist:
			raise Http404

	def get(self,request,pk,format = None):
		job = self.get_object(pk)
		jobsSerializer = JobsSerializer(job, data = request.data)
		if jobsSerializer.is_valid():
			jobsSerializer.save()
			return Response(jobsSerializer.data)
		return Response(jobsSerializer.errors,status = status.HTTP_400_BAD_REQUEST)

class ApplicantsList(APIView):
	def post(self,request,format = None):
		applicantsSerializer = ApplicantsSerializer(data = request.data)
		if applicantsSerializer.is_valid():
			applicantsSerializer.save()
			return Response(applicantsSerializer.data,status = status.HTTP_201_CREATED)
		return Response(applicantsSerializer.errors,status = status.HTTP_404_BAD_REQUEST)