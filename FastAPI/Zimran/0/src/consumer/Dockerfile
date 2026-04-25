FROM python:3.10

WORKDIR /usr/app

COPY config.py /usr/app/config.py
COPY consumer/index.py /usr/app/index.py
COPY requirements.txt /usr/app/requirements.txt

RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

CMD ["python", "index.py"]
