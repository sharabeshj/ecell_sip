from rest_framework.urlpatterns import format_suffix_patterns
from api import views
from django.conf.urls import url

urlpatterns = [
	url(r'^api/login/$',views.admin_login,name = 'login'),
	url(r'^api/jobs/$',views.JobsList.as_view()),
	url(r'^api/jobs/(?P<pk>[0-9]+)/$',views.JobDetail.as_view()),
	url(r'^api/applicants',views.ApplicantsList.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)