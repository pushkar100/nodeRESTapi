# NODE REST API FOR A SIMPLE TODO APP

A simple REST API server that helps maintain users and their todos. Created using NodeJS and Mongoose (Express framework and uses JSON Web Tokens for authentication)

**Routes**:
1. POST `/users`: Creates a user
	1. Params: `username`, `email`, `password`, `gender`, `age` (optional), `country` (optional)
2. POST `/auth/signin`: 
    1. Params: `email` and `password`
    2. Returns (if successful) an object containing a token with a subsequent authorized requests containing token as a param. This token must be passed as a parameter (key: `token`) in the body of all requests that require authorization.
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

**Demo Link**: 

[https://fierce-woodland-44908.herokuapp.com/](https://fierce-woodland-44908.herokuapp.com/)

Sample usage for a demo `sample` user: 
```
Method: POST 
URL: https://fierce-woodland-44908.herokuapp.com/auth/signin/ 
Request Body: email=sample%40sample.com&password=sample

Will receive a userid and a token which needs to be passed in subsequent requests (Requiring authorization).
```

```
Method: GET 
URL: https://fierce-woodland-44908.herokuapp.com/users/5a0ca3cae3491000148153cc 
Request Body: token={YOUR_JWT_TOKEN}
```






