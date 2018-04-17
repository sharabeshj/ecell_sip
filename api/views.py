from django.shortcuts import render
from api.models import Jobs,Applicants
from api.serializers import JobsSerializer,ApplicantsSerializer,UserSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.permissions import IsOwnerOrReadOnly
from rest_framework import permissions
from django.contrib.auth.models import User
from rest_framework import viewsets
# Create your views here.


class JobsList(APIView):

	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def get(self,request,format = None):
		jobs = Jobs.objects.all()
		jobsSerializer = JobsSerializer(jobs,many = True)
		return Response(jobsSerializer.data)

	def post(self,request,format = None):
		jobsSerializer = JobsSerializer(data = request.data)
		if jobsSerializer.is_valid():
			jobsSerializer.save()
			return Response(jobsSerializer.data,status = status.HTTP_201_CREATED)
		return Response(jobsSerializer.errors)

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
		jobsSerializer = JobsSerializer(job)
		return Response(jobsSerializer.data)
		

class ApplicantsList(APIView):
	def post(self,request,format = None):
		applicantsSerializer = ApplicantsSerializer(data = request.data)
		if applicantsSerializer.is_valid():
			applicantsSerializer.save()
			return Response(applicantsSerializer.data,status = status.HTTP_201_CREATED)
		return Response(applicantsSerializer.errors)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, pk=None):
        if pk == 'i':
            return Response(UserSerializer(request.user,
                context={'request':request}).data)
        return super(UserViewSet, self).retrieve(request, pk)		