### Axios and Proxy server
|   Field    |         Data          |
| ---------- | --------------------- |
| **URL**    | http://localhost:3000 |
| **Method** | GET                   |

#### Output
```json
{
	"ip": "45.196.48.9"  // IP address
}
```

---

### List all users from TypeORM
|   Field    |              Data               |
| ---------- | ------------------------------- |
| **URL**    | http://localhost:3000/users/all |
| **Method** | GET                             |

#### Output
```json
// Success
[
	{
		"id": 1,
		"createdAt": "2024-09-04T06:44:05.149Z",
		"updatedAt": "2024-09-06T07:13:33.276Z",
		"name": "string",
		"email": "string@str.ru",
		"password": "$argon2id$v=19$m=65536,t=3,p=4$h/HUKgOi+SuAgKbhCK7Zsw$d5bYgDJlBSPzB2IDfZFfpLGntQIi33AN8xirbxsptEA",
		"status": true
	},
	...
]
```

---

### Searches for user by ID
|     Field      |                          Data                           |
| -------------- | ------------------------------------------------------- |
| **URL**   		 | http://localhost:3000/users/get-user-by-id?id=[integer] |
| **METHOD**		 | GET                                                     |
| **Parameters** | _id=[integer]_ : ID number                              |

#### Output
```json
// Success
{
	"statusCode": 200,
	"message": "SUCCESS",
	"user": {
		"id": 1,
		"createdAt": "2024-09-04T06:44:05.149Z",
		"updatedAt": "2024-09-06T07:11:24.946Z",
		"name": "string",
		"email": "string@str.ru",
		"password": "$argon2id$v=19$m=65536,t=3,p=4$h/HUKgOi+SuAgKbhCK7Zsw$d5bYgDJlBSPzB2IDfZFfpLGntQIi33AN8xirbxsptEA",
		"status": true
	}
}

// Errors with user
{  // 1
	"statusCode": 403,
	"message": "THE USER IS OFFLINE"
}
{  // 2
	"statusCode": 404,
	"message": "ERR_NO_ID_USER_EXISTS"
}
{  // 3
	"statusCode": 404,
	"message": "ERR_USER_NOT_FOUND"
}
```

---

### Register an account
|   Field    |                              Data                              |
| ---------- | -------------------------------------------------------------- |
| **URL**    | http://localhost:3000/users/signup                             |
| **Method** | POST                                                           |
| **Filter** | _name_ : from 2 to 35 letters<br />_password_ : from 8 letters |

#### Input
```json
{
  "name": "string",
  "email": "string@str.ru",
  "password": "string123"
}
```

#### Output:
```json
// Success
{
	"name": "string",
	"email": "string@str.ru",
	"id": 1,
	"createdAt": "2024-09-04T06:44:05.149Z",
	"updatedAt": "2024-09-04T06:44:05.149Z",
	"status": true
}

// Error with name
{
	"message": [
		"name must be longer than or equal to 2 characters",
		"name must be shorter than or equal to 35 characters",
		"name should not be empty"
	],
	"error": "Bad Request",
	"statusCode": 400
}

// Errors with email
{  // 1
	"message": [
		"email should not be empty",
		"email must be an email"
	],
	"error": "Bad Request",
	"statusCode": 400
}
{  // 2
	"statusCode": 400,
	"message": "ERR_WRONG_EMAIL"
}
{  // 3
	"statusCode": 400,
	"message": "ERR_USER_EMAIL_EXISTS"
}

// Error with password
{
	"message": [
		"password must be longer than or equal to 8 characters",
		"password should not be empty",
		"password must be a string"
	],
	"error": "Bad Request",
	"statusCode": 400
}
```

---

### Login to your account
|   Field    |                Data                |
| ---------- | ---------------------------------- |
| **URL**    | http://localhost:3000/users/signin |
| **Method** | POST                               |
| **Filter** | _password_ : from 8 letters        |

#### Input
```json
{
  "email": "string@str.ru",
  "password": "string123"
}
```

#### Output
```json
// Success
{
	"id": 1,
	"createdAt": "2024-09-04T06:44:05.149Z",
	"updatedAt": "2024-09-04T06:44:15.222Z",
	"name": "string",
	"email": "string@str.ru",
	"status": true
}

// Errors with email
{  // 1
	"message": [
		"email should not be empty",
		"email must be an email"
	],
	"error": "Bad Request",
	"statusCode": 400
}
{  // 2
	"statusCode": 400,
	"message": "ERR_USER_EMAIL_EXISTS"
}

// Errors with password
{  // 1
	"message": [
		"password must be longer than or equal to 8 characters",
		"password should not be empty",
		"password must be a string"
	],
	"error": "Bad Request",
	"statusCode": 400
}
{  // 2
	"statusCode": 400,
	"message": "ERR_USER_PASSWORD_EXISTS"
}
```

---

### Signing out of your account
|     Field      |                       Data                       |
| -------------- | ------------------------------------------------ |
| **URL**        | http://localhost:3000/users/signout?id=[integer] |
| **Method**     | POST                                             |
| **Parameters** | _id=[integer]_ : ID number                       |

#### Output
```json
// Error with ID
{
	"statusCode": 404,
	"message": "ERR_ID_USER_EXISTS"
}
```
