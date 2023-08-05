import { DynamoDB } from 'aws-sdk'

const options = {
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  credentials: {
    accessKeyId: 'x',
    secretAccessKey: 'x',
  },
}

const isOffline = process.env.IS_OFFLINE

export const DynamoClient = isOffline
  ? new DynamoDB.DocumentClient(options)
  : new DynamoDB.DocumentClient()