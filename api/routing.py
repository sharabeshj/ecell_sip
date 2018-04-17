from django.conf.urls import url
from . import consumers

websocket_urlpatterns = [
	url(r'^job/$',consumers.JobConsumer),
	url(r'^applicant/$',consumers.ApplicantConsumer)]