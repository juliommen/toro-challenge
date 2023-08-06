// import type { AWS } from '@serverless/typescript'

// const serverlessConfiguration: AWS = {
//   service: 'toro-challenge',
//   frameworkVersion: '3',
//   plugins: [
//     'serverless-esbuild',
//     'serverless-dynamodb',
//     'serverless-dynamodb-seed',
//     'serverless-offline',
//   ],
//   provider: {
//     name: 'aws',
//     runtime: 'nodejs16.x',
//     apiGateway: {
//       minimumCompressionSize: 1024,
//       shouldStartNameWithService: true,
//     },
//     environment: {
//       AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
//       NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
//     },
//     iamRoleStatements: [
//       {
//         Effect: 'Allow',
//         Action: ['dynamodb:*'],
//         Resource: ['*'],
//       },
//     ],
//   },

//   functions: {
//     api: {
//       handler: 'src/http/server.handler',
//       events: [
//         {
//           http: { path: '/user/account', method: 'post', cors: true },
//         },
//         {
//           http: { path: '/transaction/transfer', method: 'post', cors: true },
//         },
//         {
//           http: { path: '/transaction/investment', method: 'post', cors: true },
//         },
//       ],
//     },
//   },
//   package: { individually: true },
//   custom: {
//     'serverless-offline': {
//       noPrependStageInUrl: true,
//     },
//     esbuild: {
//       bundle: true,
//       minify: false,
//       sourcemap: true,
//       exclude: ['aws-sdk'],
//       target: 'node14',
//       define: { 'require.resolve': undefined },
//       platform: 'node',
//       concurrency: 10,
//     },
//     dynamodb: {
//       stages: ['dev'],
//       start: {
//         port: 8000,
//         inMemory: true,
//         migrate: true,
//         seed: true,
//       },
//       seed: {
//         LocalStockSeed: {
//           sources: {
//             table: 'stock',
//             sources: ['./src/utils/stock-seed.json'],
//           },
//         },
//       },
//     },
//     seed: {
//       DeployStockSeed: {
//         table: 'stock',
//         sources: ['./src/utils/stock-seed.json'],
//       },
//     },
//   },
//   resources: {
//     Resources: {
//       UserAccountTable: {
//         Type: 'AWS::DynamoDB::Table',
//         Properties: {
//           TableName: 'user_account',
//           AttributeDefinitions: [
//             {
//               AttributeName: 'hash_key',
//               AttributeType: 'N',
//             },
//             {
//               AttributeName: 'account_number',
//               AttributeType: 'N',
//             },
//             {
//               AttributeName: 'cpf',
//               AttributeType: 'S',
//             },
//           ],
//           KeySchema: [
//             {
//               AttributeName: 'hash_key',
//               KeyType: 'HASH',
//             },
//             {
//               AttributeName: 'account_number',
//               KeyType: 'RANGE',
//             },
//           ],
//           GlobalSecondaryIndexes: [
//             {
//               IndexName: 'cpf_index',
//               KeySchema: [
//                 {
//                   AttributeName: 'cpf',
//                   KeyType: 'HASH',
//                 },
//               ],
//               Projection: {
//                 ProjectionType: 'ALL',
//               },
//               ProvisionedThroughput: {
//                 ReadCapacityUnits: 5,
//                 WriteCapacityUnits: 5,
//               },
//             },
//           ],
//           ProvisionedThroughput: {
//             ReadCapacityUnits: 5,
//             WriteCapacityUnits: 5,
//           },
//         },
//       },
//       StockTable: {
//         Type: 'AWS::DynamoDB::Table',
//         Properties: {
//           TableName: 'stock',
//           AttributeDefinitions: [
//             {
//               AttributeName: 'stock_name',
//               AttributeType: 'S',
//             },
//           ],
//           KeySchema: [
//             {
//               AttributeName: 'stock_name',
//               KeyType: 'HASH',
//             },
//           ],
//           ProvisionedThroughput: {
//             ReadCapacityUnits: 5,
//             WriteCapacityUnits: 5,
//           },
//         },
//       },
//       TransactionTable: {
//         Type: 'AWS::DynamoDB::Table',
//         Properties: {
//           TableName: 'transaction',
//           AttributeDefinitions: [
//             {
//               AttributeName: 'account_number',
//               AttributeType: 'N',
//             },
//             {
//               AttributeName: 'created_at',
//               AttributeType: 'N',
//             },
//           ],
//           KeySchema: [
//             {
//               AttributeName: 'account_number',
//               KeyType: 'HASH',
//             },
//             {
//               AttributeName: 'created_at',
//               KeyType: 'RANGE',
//             },
//           ],
//           ProvisionedThroughput: {
//             ReadCapacityUnits: 5,
//             WriteCapacityUnits: 5,
//           },
//         },
//       },
//     },
//   },
// }

// module.exports = serverlessConfiguration
