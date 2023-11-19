from rest_framework import serializers
from .models import Context, QAData


class ContextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Context
        fields = "__all__"


class QADataSerializer(serializers.ModelSerializer):
    class Meta:
        model = QAData
        fields = "__all__"
