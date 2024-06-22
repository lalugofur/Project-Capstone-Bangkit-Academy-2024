Sure, here's an updated version of your documentation with smaller, framed images for the "Current Features" section:

---

# PawPal

PawPal is the main project of Team ID C241-PS174 which aims to provide information about pets, especially cats. The main feature of this application is a cat breed detection system using Image Classification technology. Apart from that, we also have features about diseases in cats, food recommendations, and the nearest hospital. We hope that this application can help cat lovers to receive accurate information and can help in caring for their pets.

## Current Features

This was the early features that this application has.

### 1. Login
<img src="https://github.com/lalugofur/Project-Capstone-Bangkit-Academy-2024/assets/114993825/cfe84c2e-2244-4043-a3a7-4d98fc82ec36" alt="Login Page" style="border: 1px solid #ccc; padding: 5px; width: 300px;">

### 2. Detection Image
<img src="https://github.com/lalugofur/Project-Capstone-Bangkit-Academy-2024/assets/114993825/4d5c3dd2-6b75-48dc-b234-59c91be60d30" alt="Detection Image Page" style="border: 1px solid #ccc; padding: 5px; width: 300px;">

### 3. Get Breeds of Cat Detection
<img src="https://github.com/lalugofur/Project-Capstone-Bangkit-Academy-2024/assets/114993825/e2a3fd90-6d65-4755-a98a-565584b235c2" alt="Breeds of Cat Detection Page" style="border: 1px solid #ccc; padding: 5px; width: 300px;">

## Technical Details

### PawPal Android Applications

The mobile application is made starting with UI/UX designs and a little UX research, then implementing the design results using native Kotlin Android by utilizing supporting libraries such as Retrofit to interact with APIs, ViewModel to maintain stable live data.

### PawPal Mobile Documentation
<img src="https://github.com/lalugofur/Project-Capstone-Bangkit-Academy-2024/assets/114993825/016a0205-4ab3-4efe-a96b-12f143439535" alt="Mobile Documentation" style="border: 1px solid #ccc; padding: 5px; width: 300px;">

## PawPal FlowChart
<img src="https://github.com/lalugofur/Project-Capstone-Bangkit-Academy-2024/assets/114993825/836e19d3-7ab2-491f-bf74-18909e0fa23a" alt="FlowChart" style="border: 1px solid #ccc; padding: 5px; width: 300px;">

## Dataset

For one reason and another, we are using Google Drive to host our dataset.  
Dataset available at: [Google Drive](https://drive.google.com/file/d/1ThJXTObb7jGsBSNYWGsbZXnThS73h8Fz/view?usp=drive_link)

## Model

We decided to compare InceptionV3 and Inception_ResNet_v2 available as keras application. For one reason and another, we are using Google Drive to host our model.

Saved model available at:
- [InceptionV3](https://drive.google.com/file/d/1mk1caEGhqUSQJkZGuc66dooWDnpPawNl/view?usp=sharing)
- [Inception_ResNet_v2](https://drive.google.com/file/d/1xkbht4z2TI6wqSTvzrDx3wzuxkP-3Q5s/view?usp=drive_link)

## Getting Started

## Mobile Development

To get started with the mobile development, you can start by installing Android Studio. Then cloning this repository [PawPal Repository](https://github.com/Adindasfrs/Pawpal.git) to your local machine.

## API Documentation for Recipe Management System

This documentation provides a detailed guide on how to use the Recipe Management System API. The API allows users to authenticate, get updates, fetch deletions, and retrieve recipe images.

## <span style="color: #1E90FF;">Index</span>

- [PawPal](#pawpal)
  - [Current Features](#current-features)
    - [1. Login](#1-login)
    - [2. Detection Image](#2-detection-image)
    - [3. Get Breeds of Cat Detection](#3-get-breeds-of-cat-detection)
  - [Technical Details](#technical-details)
    - [PawPal Android Applications](#pawpal-android-applications)
    - [PawPal Mobile Documentation](#pawpal-mobile-documentation)
  - [PawPal FlowChart](#pawpal-flowchart)
  - [Dataset](#dataset)
  - [Model](#model)
  - [Getting Started](#getting-started)
  - [Mobile Development](#mobile-development)
  - [API Documentation for Recipe Management System](#api-documentation-for-recipe-management-system)
  - [Index](#index)
  - [Methods](#methods)
    - [1. Login](#1-login-1)
      - [Request](#request)
      - [Response](#response)
    - [2. Post Register](#2-post-register)
      - [Request](#request-1)
      - [Response](#response-1)
    - [3. Deletions](#3-deletions)
      - [Request](#request-2)
      - [Response](#response-2)
    - [4. Get Recipe Image](#4-get-recipe-image)
      - [Request](#request-3)
      - [Response](#response-3)

## <span style="color: #1E90FF;">Methods</span>

### <span style="color: #1E90FF;" id="login">1. Login</span>
Authenticate the user with the system and obtain the auth_token.

#### <span style="color: #1E90FF;" id="login-request">Request</span>

**Method**: POST  
**URL**: `https://mainapi-2ca5j5e3vq-et.a.run.app/api/login/`

| Type                                 | Parameter  | Value  | Description                            |
|--------------------------------------|------------|--------|----------------------------------------|
| <span style="color: #32CD32;">HEAD</span>   | api_key    | string | API key for request validation         |
| <span style="color: #32CD32;">POST</span>   | Email      | string | User's email                           |
| <span style="color: #32CD32;">POST</span>   | password   | string | User's password                        |

**Note**: `api_key` must be sent with all client requests. It helps the server validate the request source.

#### <span style="color: #1E90FF;" id="login-response">Response</span>

| Status                               | Response                                                                 |
|--------------------------------------|--------------------------------------------------------------------------|
| <span style="color: green;">200</span>  | `{ "token": "Bearer idToken", "refreshToken": "refreshToken" }`           |
| <span style="color: red;">403</span>   | `{ "error": "Error logging in user" }`                                    |
| <span style="color: red;">400</span>   | `{ "errors": [ { "msg": "Email tidak valid", "param": "email", "location": "body" }, { "msg": "Password diperlukan", "param": "password", "location": "body" } ] }` |
| <span style="color: red;">401</span>   | `{ "error": "Invalid API key." }`                                         |
| <span style="color: red;">401</span>   | `{ "error": "Incorrect username or password." }`                          |
| <span style="color: red;">500</span>   | `{ "error": "Something went wrong. Please try again later." }`            |

### <span style="color: #1E90FF;" id="post-register">2. Post Register</span>
Post register account.

#### <span style="color: #1E90FF;" id="post-register-request">Request</span>

**Method**: POST  
**URL**: `https://mainapi-2ca5j5e3vq-et.a.run.app/api/register`

| Type                                 | Parameter  | Value  | Description                                      |
|--------------------------------------|------------|--------|--------------------------------------------------|
| <span style="color: #32CD32;">HEAD</span>   | token_key  | string | Authentication key received from the login endpoint|
| <span style="color: #32CD32;">POST</span>   | Username   | string | User's username                                  |
| <span style="color: #32CD32;">POST</span>   | Email      | string | User's email                                     |
| <span style="color: #32CD32;">POST</span>   | password   | string | User's password                                  |

#### <span style="color: #1E90FF;" id="post-register-response">Response</span>

| Status                               | Response                                                                                                                                                   |
|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span style="color: green;">200</span>  | Response will be an object containing the list of recipes (array) as well as the updated recipe database. Each item in the recipe array has the following structure: |
|                                      | `{ "recipe_id": 10, "title": "Green Chilly Salad", "category": 1, "ingredients": { "Green Chilly": "1 kg", "Salt": "0.5 tbsp" }, "steps": [ "First clean and cut the chillies", "Now you can eat." ], "remarks": "serves 2 people" }` |
|                                      | Example response: `{ "recipes": [ { "recipe_id": 10, "title": "Green Leaf Curry", "category": 1, "ingredients": { "Green leaf": "1 kg", "Salt": "0.5 tbsp" }, "steps": [ "First clean and cut the leaves", "Now you can eat." ], "remarks": "serves 2 people" } ], "version": "4" }` |
| <span style="color: red;">400</span>   | `{ "error": "Please specify database version." }`                                                                                                          |
| <span style="color: red;">400</span>   | `{ "error": "Invalid database version." }`                                                                                                                 |
| <span style="color: red;">401</span>   | `{ "error": "Invalid API key." }`                                                                                                                          |
| <span style="color: red;">500</span>   | `{ "error": "Something went wrong. Please try again later." }`                                                                                             |

### <span style="color: #1E90FF;" id="deletions">3. Deletions</span>
Get the recipes that were deleted from the web interface, so that they can be deleted from the internal database also.

#### <span style="color: #1E90FF;" id="deletions-request">Request</span>

**Method**: POST  
**URL**: `https://mainapi-2ca5j5e3vq-et.a.run.app/api/deletions/`

| Type                                 | Parameter  | Value  | Description                                      |
|--------------------------------------|------------|--------|--------------------------------------------------|
| <span style="color: #32CD32;">HEAD</span>   | auth_key   | string | Authentication key received from the login endpoint |
| <span style="color: #32CD32;">POST</span>   | version    | number | Current version of the internal database          |

#### <span style="color: #1E90FF;" id="deletions-response">Response</span>

| Status                               | Response                                                |
|--------------------------------------|---------------------------------------------------------|
| <span style="color: green;">200</span>  | `{ "deletions": [10, 11, 40], "version": "5" }`           |
| <span style="color: red;">400</span>   | `{ "error": "Please specify database version." }`        |
| <span style="color: red;">400</span>   | `{ "error": "Invalid database version." }`               |
| <span style="color: red;">401</span>   | `{ "error": "Invalid Auth key." }`                       |
| <span style="color: red;">500</span>   | `{ "error": "Something went wrong. Please try again later." }` |

### <span style="color: #1E90FF;" id="get-recipe-image">4. Get Recipe Image</span>
Get more information on a particular recipe.

#### <span style="color: #1E90FF;" id="get-recipe-image-request">Request</span>

**Method**: GET  
**URL**: `https://mainapi-2ca5j5e3vq-et.a.run.app/api/image/<recipe_id>/`

| Type                                 | Parameter  | Value  | Description                                      |
|--------------------------------------|------------|--------|--------------------------------------------------|
| <span style="color: #32CD32;">HEAD</span>      | auth_key   | string | Authentication key received from the login endpoint |
| <span style="color: #32CD32;">URL_PARAM</span> | recipe_id  | number | ID of the recipe to retrieve the image for       |

#### <span style="color: #1E90FF;" id="get-recipe-image-response">Response</span>

| Status                               | Response                                                |
|--------------------------------------|---------------------------------------------------------|
| <span style="color: green;">200</span>  | `{ "image": "http://example.com/recipe-5-image.jpg" }`    |
| <span style="color: red;">400</span>   | `{ "error": "Please provide recipe_id." }`               |
| <span style="color: red;">400</span>   | `{ "error": "Invalid recipe_id." }`                      |
| <span style="color: red;">401</span>   | `{ "error": "Invalid Auth

---