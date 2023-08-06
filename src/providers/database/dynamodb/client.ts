import { DynamoDB } from 'aws-sdk'

const options = {
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  credentials: {
    accessKeyId: 'x',
    secretAccessKey: 'x',
  },
}

const isOffline =
  process.env.IS_OFFLINE ||
  process.env.NODE_ENV === 'test' ||
  process.env.TS_NODE_DEV === 'true' ||
  process.env.RUNNING_ENVIRONMENT === 'local'

export const DynamoClient = isOffline
  ? new DynamoDB.DocumentClient(options)
  : new DynamoDB.DocumentClient()
