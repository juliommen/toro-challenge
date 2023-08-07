import { afterAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/http/app'
import { DynamoClient } from '@/providers/database/dynamodb/client'

const VALID_CPF = '36577946035'
let createdAccountNumber: number

describe('End-to-end tests for create user account and create transaction routes', () => {
  afterAll(async () => {
    const scanResult = await DynamoClient.scan({
      TableName: 'transaction',
    }).promise()
    for (const item of scanResult.Items) {
      await DynamoClient.delete({
        TableName: 'transaction',
        Key: {
          account_number: item.account_number,
          created_at: item.created_at,
        },
      }).promise()
    }
  })

  afterAll(async () => {
    const scanResult = await DynamoClient.scan({
      TableName: 'user_account',
    }).promise()
    for (const item of scanResult.Items) {
      await DynamoClient.delete({
        TableName: 'user_account',
        Key: {
          account_number: item.account_number,
          hash_key: item.hash_key,
        },
      }).promise()
    }
  })

  it('should be able to create a user account', async () => {
    const response = await request(app).post('/user/account').send({
      cpf: VALID_CPF,
    })

    expect(response.status).toEqual(201)

    createdAccountNumber = response.body.createdAccount.accountNumber
  })

  it('should be able to create a transfer', async () => {
    const response = await request(app)
      .post('/transaction/transfer')
      .send({
        event: 'TRANSFER',
        target: {
          bank: '352',
          branch: '0001',
          account: createdAccountNumber.toString(),
        },
        origin: {
          bank: '123',
          branch: '123',
          cpf: VALID_CPF,
        },
        amount: 5000,
      })

    expect(response.status).toEqual(201)
  })

  it('should be able to create an investment', async () => {
    const response = await request(app).post('/transaction/investment').send({
      event: 'INVESTMENT',
      stock: 'PETR4',
      quantity: 100,
      cpf: VALID_CPF,
    })

    expect(response.status).toEqual(201)
  })
})
