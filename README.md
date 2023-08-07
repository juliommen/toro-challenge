# INSTALLATION GUIDE
___

## Installing Dependencies

Install all the application dependencies:
```
npm ci
```

## Dynamodb Setup 

In order to test the application locally, a DynamoDB instance must be setup.

There are two options to setup a DynamoDB instance.

1) Using Docker

Pull the image:
```
docker pull amazon/dynamodb-local
```

***Don't start*** the container with `docker run` command, instead run:

```
npm run start:db
```
This will run the container and create the tables.

2) Using local DynamoDB instance

Install database:
```
npm run install:db
```
In the file `serverless.yml`, follow the path `custom > dynamodb > start` and edit the docker flag to `docker: false`

Start database:
```
npm run start:db
```

#### Running the Application

1) Serverless Offline

To start the application simulating the serverless environment, open a terminal window, and run:
```
npm run dev:sls
```

Routes exposed:
  │POST | http://localhost:3000/user/account                           
  │POST | http://localhost:3000/transaction/transfer                   
  │POST | http://localhost:3000/transaction/investment     


2) Express Server

To start the application using a regular `Express` server, open a terminal window, and run:
```
npm run dev
```

Routes exposed:
  │POST | http://localhost:3333/user/account                           
  │POST | http://localhost:3333/transaction/transfer                   
  │POST | http://localhost:3333/transaction/investment   

## Running Tests

#### Unit and Integration Tests

To run the unit and integration tests, run:
```
npm run test
```
This tests don't depend on database setup, neither on running the application.

#### End-to-End Tests

To run the end-to-end tests, run:
```
npm run test:e2e
```

*This tests depend on database setup.*

⚠ Be aware: this tests will clean **all** of the local database entries on completion.