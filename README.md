# Social Network API
This is a simple social network API built using Node.js, Express.js, and MongoDB. It allows users to perform various actions, including creating, updating, and deleting users, as well as adding and removing friends.

# Table of Contents
Features
Getting Started
Prerequisites
Installation
Usage
API Endpoints
Example Requests
Contributing
License

## Features
Create new users with usernames and email addresses.
Update user information.
Delete users.
Add and remove friends for a user.

# Getting Started

## Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js installed.
MongoDB installed and running.
Installation
Clone this repository:

git clone https://github.com/pineonline10/no-sql-social.git
Navigate to the project directory:

cd social-network-api
Install dependencies:

npm install

Create a .env file in the project root and add your MongoDB connection string. 

## Usage
API Endpoints
GET /api/users: Get a list of all users.
GET /api/users/:id: Get user details by ID.
POST /api/users: Create a new user.
PUT /api/users/:id: Update user details by ID.
DELETE /api/users/:id: Delete a user by ID.
POST /api/users/:userId/friends/:friendId: Add a friend to a user.
DELETE /api/users/:userId/friends/:friendId: Remove a friend from a user.
