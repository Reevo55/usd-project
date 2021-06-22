#!/bin/sh

while ! nc -z mysql ; do
    echo "Waiting for the MySQL Server"
    sleep 8
done

python manage.py makemigrations usd_rest_api
python manage.py migrate
python manage.py loaddata temp.json