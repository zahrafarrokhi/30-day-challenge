from rest_framework import serializers

from task.models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['user']

    def create(self, validated_data):
        user = self.context['request'].user
        # name = validated_data['name']
        task = Task.objects.create(user=user, **validated_data)
        return task


class CalenderSerializer(serializers.Serializer):
    # day = serializers.DateField()
    date = serializers.DateField(source='date__date')
