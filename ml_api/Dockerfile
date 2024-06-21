# Use the official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

# Install production dependencies.
RUN pip install -r requirements.txt
RUN pip install --upgrade numpy
RUN pip install --upgrade Pillow
RUN pip install --upgrade tensorflow
RUN pip install --upgrade flask

# Define environment variable
ENV FLASK_APP=main.py

CMD ["flask", "run", "--host=0.0.0.0", "--port=8080"]