## Description

Test task

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

There is a docker file in the repository to bring up the mysql database.

## API Endpoints

### `POST /api/v1/add-user`

**Description**: Creates a new user in the system.

**URL**: `http://localhost:3000/api/v1/add-user`

**Request Headers**:
- `Content-Type: application/json`

**Request Body**:
```json
{
  "firstName": "Benn",
  "secondName": "Smith",
  "email": "scott.smith@example.org",
  "password": "123"
}
```
**cURL Example**:
```bash
curl -X POST http://localhost:3000/api/v1/add-user \
-H "Content-Type: application/json" \
-d '{
"firstName": "Benn",
"secondName": "Smith",
"email": "scott.smith@example.org",
"password": "123"
}'
```

### `POST /api/v1/auth`

**Description**: Authenticates a user and returns an authentication token.

**URL**: `http://localhost:3000/api/v1/auth`

**Request Headers**:
- `Content-Type: application/json`

**Request Body**:
```json
{
  "email": "scott.smith@example.org",
  "password": "123"
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:3000/api/v1/auth \
-H "Content-Type: application/json" \
-d '{
  "email": "scott.smith@example.org",
  "password": "123"
}'
```

### `GET /api/v1/get-user/:id`

**Description**: Retrieves user information by user ID.

**URL**: `http://localhost:3000/api/v1/get-user/1`

**Request Headers**:
- `Authorization: Bearer <your-token>`

**cURL Example**:
```bash
curl -X GET http://localhost:3000/api/v1/get-user/1 \
-H "Authorization: Bearer <your-token>"
```

