# PawPal

PawPal is the main project of Team ID C241-PS174 which aims to provide information about pets, especially cats. The main feature of this application is a cat breed detection system using Image Classification technology. Apart from that, we also have features about diseases in cats, food recommendations, and the nearest hospital. We hope that this application can help cat lovers receive accurate information and assist in caring for their pets.

# Current Features

This was the early features that this application has.

1. Login

   <img src="https://github.com/lalugofur/Project-Capstone-Bangkit-Academy-2024/assets/114993825/cfe84c2e-2244-4043-a3a7-4d98fc82ec36" height="300" style="border: 1px solid #ccc; padding: 5px;">

2. Detection Image

   <img src="https://github.com/lalugofur/Project-Capstone-Bangkit-Academy-2024/assets/114993825/4d5c3dd2-6b75-48dc-b234-59c91be60d30" height="300" style="border: 1px solid #ccc; padding: 5px;">

3. Get Breeds of Cat Detection

   <img src="https://github.com/lalugofur/Project-Capstone-Bangkit-Academy-2024/assets/114993825/e2a3fd90-6d65-4755-a98a-565584b235c2" height="300" style="border: 1px solid #ccc; padding: 5px;">

# Technical Details

## PawPal Android Applications

The mobile application is made starting with UI/UX designs and a little UX research, then implementing the design results using native Kotlin Android by utilizing supporting libraries such as Retrofit to interact with APIs, ViewModel to maintain stable live data.

**PawPal Mobile Documentation**

<img src="https://github.com/lalugofur/Project-Capstone-Bangkit-Academy-2024/assets/114993825/016a0205-4ab3-4efe-a96b-12f143439535" height="300" style="border: 1px solid #ccc; padding: 5px;">

**PawPal FlowChart**

<img src="https://github.com/lalugofur/Project-Capstone-Bangkit-Academy-2024/assets/114993825/836e19d3-7ab2-491f-bf74-18909e0fa23a" height="300" style="border: 1px solid #ccc; padding: 5px;">

## Dataset

For one reason and another, we are using Google Drive to host our dataset.

[Dataset available at: Google Drive](https://drive.google.com/file/d/1ThJXTObb7jGsBSNYWGsbZXnThS73h8Fz/view?usp=drive_link)

## Model

We decided to compare InceptionV3 and Inception_ResNet_v2 available as keras application. For one reason and another, we are using Google Drive to host our model.

- [InceptionV3](https://drive.google.com/file/d/1mk1caEGhqUSQJkZGuc66dooWDnpPawNl/view?usp=sharing)
- [Inception_ResNet_v2](https://drive.google.com/file/d/1xkbht4z2TI6wqSTvzrDx3wzuxkP-3Q5s/view?usp=drive_link)

# Getting Started

## Mobile Development

To get started with the mobile development, you can start by installing Android Studio. Then cloning this repository [PawPal Repository](https://github.com/Adindasfrs/Pawpal.git) to your local machine.

## Cloud Computing

To deploy the server, follow these steps using Google Cloud Platform (GCP) as the preferred deployment environment. We employ Cloud Run, Cloud Build, Google Cloud Storage, Google Cloud SQL, Google Cloud Pub/Sub, and Firebase Authentication. Here are the steps:

1. Set up a new project on GCP.
2. Create a Firebase Project and enable Firebase Authentication.
3. Create a Cloud Storage Bucket.
4. Clone, build, and deploy the code from the Cloud Computing Branch in this repository to Cloud Run.
5. Configure a Pub/Sub topic.
6. Clone, build, and deploy the machine learning backend to Cloud Run.
7. Establish Pub/Sub subscriptions for each machine learning backend.
8. Update all environment variables in the Cloud Run service.

## Machine Learning

To get started with the Cat Breeds prediction models, please follow the instructions below:

1. Clone Machine Learning Branch at this repository.
2. Install the required dependencies:
   - pip install python
   - pip install keras
   - pip install tensorflow
3. Download the trained models and preprocessed datasets from the following links:
	https://drive.google.com/file/d/1xkbht4z2TI6wqSTvzrDx3wzuxkP-3Q5s/view
4. Place the downloaded models in the appropriate directories.

# API Documentation for Recipe Management System

This documentation provides a detailed guide on how to use the Recipe Management System API. The API allows users to authenticate, get updates, fetch deletions, and retrieve recipe images.

## Methods

### 1. Login

Authenticate the user with the system and obtain the auth_token.

#### Request

**Method**: POST  
**URL**: `https://mainapi-2ca5j5e3vq-et.a.run.app/api/login/`

| Type                                | Parameter  | Value  | Description                            |
|-------------------------------------|------------|--------|----------------------------------------|
| HEAD                                | api_key    | string | API key for request validation         |
| POST                                | Email      | string | User's email                           |
| POST                                | password   | string | User's password                        |

**Note**: `api_key` must be sent with all client requests. It helps the server validate the request source.

#### Response

| Status | Response                                                                                                  |
|--------|-----------------------------------------------------------------------------------------------------------|
| 200    | `{ "token": "Bearer idToken", "refreshToken": "refreshToken" }`                                           |
| 403    | `{ "error": "Error logging in user" }`                                                                    |
| 400    | `{ "errors": [ { "msg": "Email tidak valid", "param": "email", "location": "body" }, { "msg": "Password diperlukan", "param": "password", "location": "body" } ] }` |
| 401    | `{ "error": "Invalid API key." }`                                                                         |
| 401    | `{ "error": "Incorrect username or password." }`                                                          |
| 500    | `{ "error": "Something went wrong. Please try again later." }`                                            |

### 2. Post Register

Post register account.

#### Request

**Method**: POST  
**URL**: `https://mainapi-2ca5j5e3vq-et.a.run.app/api/register`

| Type                                | Parameter  | Value  | Description                                         |
|-------------------------------------|------------|--------|-----------------------------------------------------|
| HEAD                                | token_key  | string | Authentication key received from the login endpoint |
| POST                                | Username   | string | User's username                                     |
| POST                                | Email      | string | User's email                                        |
| POST                                | password   | string | User's password                                     |

#### Response

| Status | Response                                                                                                                                                   |
|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 200    | Response will be an object containing the list of recipes (array) as well as the updated recipe database. Each item in the recipe array has the following structure: |
|        | `{ "recipe_id": 10, "title": "Green Chilly Salad", "category": 1, "ingredients": { "Green Chilly": "1 kg", "Salt": "0.5 tbsp" }, "steps": [ "First clean and cut the chillies", "Now you can eat." ], "remarks": "serves 2 people" }` |
|        | Example response: `{ "recipes": [ { "recipe_id": 10, "title": "Green Leaf Curry", "category": 1, "ingredients": { "Green leaf": "1 kg", "Salt": "0.5 tbsp" }, "steps": [ "First clean and cut the leaves", "Now you can eat." ], "remarks": "serves 2 people" } ], "version": "4" }` |
| 400    | `{ "error": "Please specify database version." }`                                                                                                          |
| 400    | `{ "error": "Invalid database version." }`                                                                                                                 |
| 401    | `{ "error": "Invalid API key." }`                                                                                                                          |
| 500    | `{ "error": "Something went wrong. Please try again later." }`                                                                                             |

### 3. Deletions

Get the recipes that were deleted from the web interface, so that they can be deleted from the internal database also.

#### Request

**Method**: POST  
**URL**: `https://mainapi-2ca5j5e3vq-et.a.run.app/api/deletions/`

| Type                                | Parameter  | Value  | Description                                         |
|-------------------------------------|------------|--------|-----------------------------------------------------|
| HEAD                                | auth_key   | string | Authentication key received from the login endpoint |
| POST                                | version    | number | Current version of the internal database            |

#### Response

| Status | Response                          |
|--------|-----------------------------------|
| 200    | `{ "deletions": [10, 11, 40], "version": "5" }` |
| 400    | `{ "error": "Please specify database version." }` |
| 400    | `{ "error": "Invalid database version." }`      |
| 401    | `{ "error": "Invalid Auth key." }`              |
| 500    | `{ "error": "Something went wrong. Please try again later." }` |

### 4. Get Recipe Image

Get more information on a particular recipe.

#### Request

**Method**: GET  
**URL**: `https://mainapi-2ca5j5e3vq-et.a.run.app/api/image/<recipe_id>/`

| Type                                | Parameter  | Value  | Description                                         |
|-------------------------------------|------------|--------|-----------------------------------------------------|
| HEAD                                | auth_key   | string | Authentication key received from the login endpoint |
| URL_PARAM                           | recipe_id  | number | ID of the recipe to retrieve the image for          |

#### Response

| Status | Response                                   |
|--------|--------------------------------------------|
| 200    | `{ "image": "http://example.com/recipe