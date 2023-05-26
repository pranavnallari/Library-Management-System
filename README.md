# Library Management Web API
This is a RESTful Web API built with Node.js, Express.js, and MongoDB to manage books in a library.

## Features
Display all books in the library
Create a new book
Get a specific book by its ID
Update a book by its ID
Delete a book by its ID
## Prerequisites
Before running the application, make sure you have the following installed:

Node.js <br>
MongoDB
## Getting Started
Clone the repository:
```bash
git clone https://github.com/your-username/library-management-api.git
```
Install dependencies:
```bash
cd library-management-api
npm install
```
### Configure the database:

Make sure MongoDB is running on your local machine.
Open the app.js file and modify the MongoDB connection URL if needed <b>('mongodb://127.0.0.1:27017/Library')</b>.
<br>
Start the server:

```bash
nodemon index.js
```
The API will be available at http://localhost:3000.

## API Endpoints
### GET / - Retrieves all books in the library.
### POST / - Creates a new book. Requires request body with title, author, and genre fields.
### GET /:id - Retrieves a specific book by its ID.
### PUT /:id - Updates a book by its ID. Requires request body with fields to be updated.
### DELETE /:id - Deletes a book by its ID.
### Response Format
The API responds with JSON data in the following format:

```json
{
  "id": "123",
  "title": "Book Title",
  "author": "Book Author",
  "genre": "Book Genre"
}
```
In case of an error, the API responds with an error message in the following format:

```json
{
  "error": "Error message"
}
```
## Error Handling
If a requested book is not found, the API returns a 404 status code with an error message.
<br>
If there is a server error or an invalid request, the API returns a 500 status code with an error message.
