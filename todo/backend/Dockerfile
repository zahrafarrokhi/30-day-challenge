FROM python:3.8-alpine

WORKDIR /app

RUN apk update \
    && apk add gcc postgresql-dev python3-dev musl-dev \
    && apk add --virtual build-deps

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

# CMD [ "python", "manage.py", "migrate", "&&", "python", "manage.py", "runserver" ]
ENTRYPOINT /app/entrypoint.sh