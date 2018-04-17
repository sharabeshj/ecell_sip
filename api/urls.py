from api import views
from django.conf.urls import url,include
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'users', views.UserViewSet)


urlpatterns = [
	url(r'^api/jobs/$',views.JobsList.as_view()),
	url(r'^api/jobs/(?P<pk>[0-9]+)/$',views.JobDetail.as_view()),
	url(r'^api/applicants',views.ApplicantsList.as_view()),
	url(r'^', include(router.urls))
]

