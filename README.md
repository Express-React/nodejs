
# Overview
 1. Express JS
 2. Mysql - Sequelize (DB - ORM)
 3. Token Authentiacation - JWT
 4. Middleware for intercepting the requests
 5. Password hashing `bcrypt`
 6. Sign In and Sign Up
		 <br>Sign Up check for duplicate user
		 <br>Sign In get the JWT token
 7. Logger through `winston`.
		 
---
# API Details

## Sign Up New user
`Request`
```curl
curl --location --request POST 'http://localhost:3000/user/signup/' \
--header 'Content-Type: application/json' \
--data-raw '{"name" : "admin","password":"password"}'
```
`Response Body - For conflict`
status code 409
```
{"success": false,"response": "username already exists"}
```
`Response Body - For success`
status code 201 created
```
{"success": true,"response": "Username successfully created"}
```
---
## Login

```
curl --location --request POST 'http://localhost:3000/user/signin/' \
--header 'Content-Type: application/json' \
--data-raw '{"name" : "shahs","password":"test"}'
```
Success Response
```
{
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2hhaHMiLCJpYXQiOjE2MDE1NTk5NzgsImV4cCI6MTYwMTY0NjM3OH0.aAkTMKt6Uz2CyDxMtkEAJb2DDnoNkb3QP-zq37stM5k",
   "response":"success",
   "data":{
      "name":"shahs",
      "id":6,
      "last_login":"2020-09-30T14:54:21.000Z",
      "status":"active"
   },
   "success":true
}
```
Failure Response
```
{
"success": false,
"message": "Incorrect username or password"
}
```
