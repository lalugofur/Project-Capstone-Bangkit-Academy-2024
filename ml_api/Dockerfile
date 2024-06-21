# Use the official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

# Install production dependencies.
RUN pip install -r requirements.txt
RUN pip install --upgrade numpy==1.25.2
RUN pip install --upgrade matplotlib
RUN pip install --upgrade Pillow
RUN pip install --upgrade scikit-learn
RUN pip install --upgrade scipy
RUN pip install --upgrade imageio
RUN pip install --upgrade tensorflow

# Make port 80 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV FLASK_APP=main.py

CMD ["flask", "run", "--host=0.0.0.0", "--port=8000"]