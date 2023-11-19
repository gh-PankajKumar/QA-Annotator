from django.shortcuts import render
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework import status, generics
from .serializers import QADataSerializer, ContextSerializer
from .models import QAData, Context
import pandas as pd


# Create your views here.
class ContextRead(APIView):
    parser_class = (FormParser, MultiPartParser)

    def get_text(self, uploaded_file):
        df = pd.read_csv(uploaded_file)
        context_list = df.iloc[:, 0].tolist()
        return context_list

    def post(self, request, *args, **kwargs):
        # print(request.data)
        # Process the uploaded CSV file and extract text
        uploaded_file = request.FILES["file"]
        context_list = self.get_text(uploaded_file)
        context_instances = []
        for i in context_list:
            exisiting_context = Context.objects.filter(context=i).first()

            if exisiting_context:
                context = exisiting_context
            else:
                context = Context(context=i)
                context.save()
            context_instances.append(context)

        context_serializer = ContextSerializer(context_instances, many=True)
        return Response(
            {
                "message": "Context has been read successfully",
                "context_list": context_serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )


class QADataView(ModelViewSet):
    def format_qa_data(self, data):
        qa_data = {
            "id": data["context"]["id"],
            "context": data["context"]["context"],
            "question": data["question"],
            "answer": data["answer"]["text"],
            "answer_start": data["answer"]["answer_start"],
        }
        return qa_data

    def get_context_data(self, context_id):
        context = Context.objects.filter(id=context_id).first()
        return context

    @action(detail=False, methods=["get"])
    def get(self, request, format=None):
        context_id = request.query_params.get("context_id")

        qa_data = QAData.objects.filter(context__id=context_id)
        try:
            qa_data_serializer = QADataSerializer(qa_data, many=True)
            return Response(
                {
                    "message": "QA Data fetch successful!",
                    "QAData": qa_data_serializer.data,
                },
                status=status.HTTP_202_ACCEPTED,
            )
        except QAData.DoesNotExist:
            return Response(
                {"message": "No context found! "}, status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=["post"])
    def post(self, request, format=None):
        print(request.data)
        qa_data = self.format_qa_data(request.data)
        context = self.get_context_data(qa_data["id"])
        if context:
            qa_set = QAData(
                context=context,
                question=qa_data["question"],
                answer=qa_data["answer"],
                answer_start=qa_data["answer_start"],
            )
            qa_set.save()
        else:
            return Response(
                {
                    "message": "Data submission unsuccessful. No context found for context id "
                    + str(qa_data["id"])
                }
            )
        return Response(
            {
                "message": "Data has been submitted successfully for context id "
                + str(qa_data["id"])
            },
            status=status.HTTP_201_CREATED,
        )

    @action(detail=False, methods=["post"])
    def delete_qa_data(self, request, *args, **kwargs):
        selected_ids = request.data.get("selected_ids", [])
        try:
            QAData.objects.filter(id__in=selected_ids).delete()

            return Response(
                {"message": "QAData Entries deleted successfully"},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"message": f"Error Deleting {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
