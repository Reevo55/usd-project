FROM python:3.9
ENV PYTHONUNBUFFERED 1
WORKDIR /usd_backend
COPY requirements.txt /usd_backend/requirements.txt
RUN pip install --upgrade pip && pip install -r /usd_backend/requirements.txt
COPY . /usd_backend

RUN ["chmod", "+x", "/usd_backend/wait.sh"]
#RUN /usd_backend/wait.sh