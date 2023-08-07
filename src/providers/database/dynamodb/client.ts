import { DynamoDB } from 'aws-sdk'

const offlineParameters = {
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  credentials: {
    accessKeyId: 'x',
    secretAccessKey: 'x',
  },
}

const buildParameters = {
  region: process.env.IS_OFFLINE,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
}

const isOffline =
  process.env.IS_OFFLINE ||
  process.env.NODE_ENV === 'test' ||
  process.env.TS_NODE_DEV === 'true'

const isRunningOnCommonBuild = process.env.RUNNING_ENVIRONMENT === 'build'

export const DynamoClient = isOffline
  ? new DynamoDB.DocumentClient(offlineParameters)
  : isRunningOnCommonBuild
  ? new DynamoDB.DocumentClient(buildParameters)
  : new DynamoDB.DocumentClient()
