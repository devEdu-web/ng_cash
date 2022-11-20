import request from 'supertest'
import app from '../../src/app'
import { TestUtils } from '../../src/utils/TestUtils'
import { IUserPayload } from '../../src/types';
import Client from '../../src/database/client'
import { faker } from '@faker-js/faker';

let creditedAccountId: number
let creditedAccountUsername: string
let debitedAccountId: number
let debitedAccountUsername: string
let accessToken: string


describe('Transactions Test Suite', () => {
  beforeAll(async () => {
    const helpers = new TestUtils()

    try {      
      const usersInfo = await helpers.gatherAccountsInfo()
      creditedAccountId = usersInfo.creditedAccountId
      creditedAccountUsername = usersInfo.creditedAccountUsername
      debitedAccountId = usersInfo.debitedAccountId
      debitedAccountUsername = usersInfo.debitedAccountUsername
      accessToken = usersInfo.accessToken

    } catch (error) {
      throw error
    }

  })

  it('Should create a transaction', async () => {
    const response = await request(app)
      .post('/transactions/create')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ transferTo:  debitedAccountUsername, value: 50})
      .expect(201)
    expect(response.body.creditedAccountId).toBe(creditedAccountId)
    expect(response.body.debitedAccountId).toBe(debitedAccountId)
  })
  it('Should not create a transaction due to insufficient balance', async () => {
    // here the logged user already transfered 50, so his balance is now 50
    const response = await request(app)
      .post('/transactions/create')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ transferTo:  debitedAccountUsername, value: 70})
      .expect(400)
  })
  it('Should not create a transaction due to transfering for oneself', async () => {
    const response = await request(app)
      .post('/transactions/create')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ transferTo:  creditedAccountUsername, value: 50})
      .expect(400)
  })
  it('Should get all user transactions', async () => {
    const response = await request(app)
      .get('/transactions/all')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)

    expect(response.body).toBeDefined()
  })
  it('Should get cash-in transactions', async () => {
    const response = await request(app)
      .get('/transactions/filter/cash-in')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)

    // there wasn't any cash-in transactions in the previous tests, so we should expect 0
    expect(response.body.length).toBe(0)
  })
  it('Should get cash-out transactions', async () => {
    const response = await request(app)
    .get('/transactions/filter/cash-out')
    .set('Authorization', `Bearer ${accessToken}`)
    .expect(200)
    expect(response.body[0].creditedAccountId).toBe(creditedAccountId)
  })
})