from django.conf.urls import url
from . import consumers

websocket_urlpatterns = [
	url(r'^jobs/$',consumers.JobConsumer),
	url(r'^applicants/$',consumers.ApplicantConsumer)]