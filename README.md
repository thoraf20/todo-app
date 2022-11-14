# A simple todo list
a simple server to exchange data for a todo app

# Features
  - create list
  - add items to list
  - duplicate list
  - duplicate items in a list
  - update list
  - update items in a list
  - fetch lists
  - fetch a single list
  - fetch items in list
  - fetch a item a in list
  - delete list
  - delete item in list


# API Documentation
https://solar-satellite-39253.postman.co/workspace/b76306a1-1621-43cf-9033-f22a1b1fba9e/collection/12459845-390af307-a1e6-4cf6-bc1b-5d089139342c?action=share&creator=12459845
# How to install

# Using Git (recommended)

- Clone the project from github

git clone https://github.com/thoraf20/todo-app

# Install npm dependencies
npm install

# Setting up environments

1. You will find a file named .env.example on root directory of project.
2. Create a new file by copying and pasting the file and then renaming it to just .env

cp .env.example .env

3. The file .env is already ignored, so you never commit your credentials.
4. Change the values of the file to your environment. Helpful comments added to .env.example file to  understand the constants.
# Running API server locally
npm run start:dev

You will know server is running by checking the output of the command npm run start:dev

# Running Tests
npm run test

Note: Make sure you set up the test variable in the .env file

# E-R Design

link: 

# Author
Toheeb Rauf

# License
MIT