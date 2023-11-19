"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api.views import ContextRead, QADataView
from rest_framework import routers

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/context_upload/", ContextRead.as_view(), name="context_upload"),
    path("api/qa_data/", QADataView.as_view({"get": "get"}), name="qa-data-create"),
    path(
        "api/qa_data/qa_data_delete/",
        QADataView.as_view({"post": "delete_qa_data"}),
        name="qa-data-delete",
    ),
    path("api/qa_data/export_qa_data/",
         QADataView.as_view({"get":"export_qa_data"}),
        name="qa-export-data")
]
