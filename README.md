# cutsession
Pipeline V2 project
https://pipeline.stoplight.io/docs/pipelinev2-projects/branches/main/sprgmajz1e0wb-cut-session


## Endpoints

* [IAM](#iam)
    1. [User/Merchant Sign In](#1-usermerchant-sign-in)
    1. [Register Merchants](#2-register-merchants)
    1. [Register User](#3-register-user)
    1. [Fetch clients (users or merchants)](#4-fetch-clients-users-or-merchants)
* [Schedule](#schedule)
    1. [Fetch studio sessions](#1-fetch-studio-sessions)
    1. [Create studio sessions](#2-create-studio-sessions)
    1. [Book a studio session](#3-book-a-studio-session)
    1. [Retrieve session bookings](#4-retrieve-session-bookings)

--------



## IAM



### 1. User/Merchant Sign In



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: 127.0.0.1:8080/sign-in
```



***Body:***

```js        
{
  "username": "Petec0x0",
  "password": "password",
  "accessType": "USER"
}
```



### 2. Register Merchants



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: 127.0.0.1:8080/register/merchants
```



***Body:***

```js        
{
  "name": "Mavin",
  "dob": "2019-08-24",
  "email": "jazzy@email.com",
  "cityOfResidence": "Lagos",
  "username": "mavin",
  "password": "password",
  "phoneNumber": "0988776234",
  "metadata": {}
}
```



### 3. Register User



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: 127.0.0.1:8080/register/users
```



***Body:***

```js        
{
  "name": "Peter",
  "dob": "2019-08-24",
  "email": "user@example.com",
  "cityOfResidence": "Enugu",
  "username": "Petec0x0",
  "password": "password",
  "phoneNumber": "0988776234",
  "metadata": {}
}
```



### 4. Fetch clients (users or merchants)



***Endpoint:***

```bash
Method: GET
Type: 
URL: 127.0.0.1:8080/clients
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| type | USER |  |
| limit | 20 |  |
| offset | 1 |  |



## Schedule



### 1. Fetch studio sessions



***Endpoint:***

```bash
Method: GET
Type: 
URL: 127.0.0.1:8080/studios/639bfc1d842c8e52ce9c15db
```



### 2. Create studio sessions



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: 127.0.0.1:8080/studios/639bfc1d842c8e52ce9c15db
```



***Body:***

```js        
{
  "startsAt": "12:00:00",
  "endsAt": "13:00:00",
  "type": "WeekEnd"
}
```



### 3. Book a studio session



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: 127.0.0.1:8080/bookings
```



***Body:***

```js        
{
  "sessionId": "63a208d1ef8d11fcf794839b",
  "date": "2022-12-02",
  "userId": "639bfc8b51769886eb997f7f",
  "notes": "The Little Things That Helped Me as a Software Engineer at Amazon, Microsoft, Google",
  "title": "Making music"
}
```



### 4. Retrieve session bookings



***Endpoint:***

```bash
Method: GET
Type: 
URL: 127.0.0.1:8080/bookings
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| city | Enugu |  |
| limit | 20 |  |
| offset | 1 |  |



---
[Back to top](#cutsession)

>Generated at 2022-12-24 19:30:34 by [docgen](https://github.com/thedevsaddam/docgen)
