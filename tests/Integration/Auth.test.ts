import Client from '../../src/database/client'
import request from 'supertest'
import app from '../../src/app'
import { faker } from '@faker-js/faker'

const validUser = {
  username: faker.internet.userName(),
  password: 'password123A'
}
const userWithInvalidUserName = {
  username: 'in',
  password: 'password123A'
}
const userWithInvalidPassword = {
  username: faker.internet.userName(),
  password: 'password'
}

describe('Auth Test Suite', () => {
  it('Should create a user with valid credentials', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send(validUser)
      .expect(201)
    
    expect(response.body).toBeDefined()
    expect(response.body.username).toBe(validUser.username)
  })
  it('Should not create a user with invalid username', async () => {
    const response = await request(app)
    .post('/auth/register')
    .send(userWithInvalidUserName)
    .expect(400)
  
    expect(response.body).toBeDefined()
  })
  it('Should not create a user with invalid password', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send(userWithInvalidPassword)
      .expect(400)
  
    expect(response.body).toBeDefined()
  })
  it('Should log user and receive a JWT token', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send(validUser)
      .expect(200)
    expect(response.body).toBeDefined()
  })
  it('Should not log user with wrong credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({...validUser, password: 'wrongPassword'})
      .expect(400)
    expect(response.body).toBeDefined()
  })
})
