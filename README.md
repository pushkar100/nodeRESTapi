# nodeRESTapi

A simple REST API server created using NodeJS and Mongoose (Express framework and uses JSON Web Tokens for authentication)

Demo Link: [https://fierce-woodland-44908.herokuapp.com/](https://fierce-woodland-44908.herokuapp.com/)

1. POST `/auth/signin`: 
    1. Params: `email` and `password`
    2. Returns (if successful) an object containing a token with a subsequent authorized requests containing token as a param.
2. POST `/users`: Creates a user
	1. Params: `username`, `email`, `password`, `gender`, `age` (optional), `country` (optional)
3. `/users/:userid`
    1. GET: get basic details of any user account
    2. PUT: update your user details
    3. DELETE: delete a user (yourself)
4. GET `/users/:userid/pendingtodos`: Gets your k todos list.
5. GET `/users/:userid/completedtodos`: Gets your completed todos list.
6. DELETE `/users/:userid/completedtodos`: Deletes all your completed todos
7. GET `/users/:userid/delayedtodo`: All your pending todos that have been delayed (past deadline)
8. POST `/users/:userid/pendingtodos/share`: Not implemented (ability to transfer or share a todo with another user)
9. POST `/users/:userid/todos/`:
	1. Params: `title`, `status` (optional), `description` (optional), `priority` (optional), `time` (optional)
10. `/users/:userid/todos/:todoid`:
    1. GET: Get your todo item
    2. PUT: Update your todo item
    3. DELETE: Delete your todo item
